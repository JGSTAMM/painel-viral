import { NextRequest, NextResponse } from "next/server";
import { readJsonStore, writeJsonStore } from "@/lib/json-store";

export const dynamic = "force-dynamic";

const COMMISSION_PER_SALE = 48.5;
const STORE_FILE = "referrals-store.json";

export interface ReferralTransaction {
  id: string;
  type: "click" | "conversion" | "withdraw";
  amount: number;
  description: string;
  pixKey?: string;
  protocol?: string;
  createdAt: string;
}

export interface ReferralAccountRecord {
  ref: string;
  clicks: number;
  conversions: number;
  commissionPerSale: number;
  availableBalance: number;
  totalWithdrawn: number;
  pixKey: string;
  history: ReferralTransaction[];
}

type ReferralsStore = Record<string, ReferralAccountRecord>;

function normalizeRef(raw: unknown): string {
  const s = typeof raw === "string" ? raw : "criador";
  const cleaned = s.replace(/^@+/, "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return cleaned || "criador";
}

function getOrInitRecord(store: ReferralsStore, ref: string): ReferralAccountRecord {
  if (!store[ref]) {
    store[ref] = {
      ref,
      clicks: 0,
      conversions: 0,
      commissionPerSale: COMMISSION_PER_SALE,
      availableBalance: 0,
      totalWithdrawn: 0,
      pixKey: "",
      history: [],
    };
  }
  return store[ref];
}

export async function GET(req: NextRequest) {
  const refParam = req.nextUrl.searchParams.get("ref") ?? "criador";
  const ref = normalizeRef(refParam);
  const store = readJsonStore<ReferralsStore>(STORE_FILE, {});
  const record = getOrInitRecord(store, ref);
  return NextResponse.json({ success: true, account: record });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const ref = normalizeRef(body.ref);
    const action = typeof body.action === "string" ? body.action : "";

    const store = readJsonStore<ReferralsStore>(STORE_FILE, {});
    const record = getOrInitRecord(store, ref);
    const now = new Date().toISOString();

    if (action === "click") {
      record.clicks += 1;
      const entry: ReferralTransaction = {
        id: `clk-${Date.now()}`,
        type: "click",
        amount: 0,
        description: "Visita rastreada pelo link de indicação",
        createdAt: now,
      };
      record.history = [entry, ...record.history].slice(0, 50);
      writeJsonStore(STORE_FILE, store);
      return NextResponse.json({ success: true, account: record });
    }

    if (action === "convert") {
      record.conversions += 1;
      record.availableBalance = Number((record.availableBalance + COMMISSION_PER_SALE).toFixed(2));
      const buyer = typeof body.buyer === "string" && body.buyer.trim() ? body.buyer.trim() : "Novo criador";
      const entry: ReferralTransaction = {
        id: `cnv-${Date.now()}`,
        type: "conversion",
        amount: COMMISSION_PER_SALE,
        description: `Assinatura confirmada (${buyer}) — Comissão 50%`,
        createdAt: now,
      };
      record.history = [entry, ...record.history].slice(0, 50);
      writeJsonStore(STORE_FILE, store);
      return NextResponse.json({ success: true, account: record });
    }

    if (action === "save_pix") {
      const pixKey = typeof body.pixKey === "string" ? body.pixKey.trim() : "";
      record.pixKey = pixKey;
      writeJsonStore(STORE_FILE, store);
      return NextResponse.json({ success: true, account: record });
    }

    if (action === "withdraw") {
      const pixKey = typeof body.pixKey === "string" ? body.pixKey.trim() : record.pixKey;
      if (!pixKey || pixKey.length < 5) {
        return NextResponse.json(
          { success: false, error: "Informe uma chave PIX válida (CPF, e-mail, celular ou aleatória)." },
          { status: 400 }
        );
      }
      if (record.availableBalance <= 0) {
        return NextResponse.json(
          { success: false, error: "Seu saldo disponível para saque PIX é R$ 0,00." },
          { status: 400 }
        );
      }

      const amount = record.availableBalance;
      const protocol = `PIX-${Date.now().toString(36).toUpperCase()}`;
      record.pixKey = pixKey;
      record.availableBalance = 0;
      record.totalWithdrawn = Number((record.totalWithdrawn + amount).toFixed(2));
      const entry: ReferralTransaction = {
        id: `wd-${Date.now()}`,
        type: "withdraw",
        amount,
        description: `Saque PIX solicitado para ${pixKey}`,
        pixKey,
        protocol,
        createdAt: now,
      };
      record.history = [entry, ...record.history].slice(0, 50);
      writeJsonStore(STORE_FILE, store);
      return NextResponse.json({ success: true, protocol, withdrawnAmount: amount, account: record });
    }

    return NextResponse.json({ success: false, error: "Ação inválida." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao processar solicitação de afiliado.",
      },
      { status: 500 }
    );
  }
}
