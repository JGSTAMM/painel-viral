import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { readJsonStore, writeJsonStore } from "@/lib/json-store";

export const dynamic = "force-dynamic";

const STORE_FILE = "users-store.json";
const SESSION_COOKIE = "gta6_session";

interface StoredUser {
  id: string;
  username: string;
  email: string;
  name: string;
  handle: string;
  plan: string;
  salt: string;
  passwordHash: string;
  createdAt: string;
}

interface AuthSessionToken {
  userId: string;
  username: string;
  issuedAt: number;
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  const computed = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(computed, "hex"), Buffer.from(storedHash, "hex"));
}

function sanitizeUser(u: StoredUser) {
  return {
    id: u.id,
    username: u.username,
    email: u.email,
    name: u.name,
    handle: u.handle,
    plan: u.plan,
    createdAt: u.createdAt,
  };
}

export async function GET(req: NextRequest) {
  const rawToken = req.cookies.get(SESSION_COOKIE)?.value;
  if (!rawToken) {
    return NextResponse.json({ authenticated: false, user: null });
  }
  try {
    const parsed = JSON.parse(Buffer.from(rawToken, "base64url").toString("utf-8")) as AuthSessionToken;
    const users = readJsonStore<StoredUser[]>(STORE_FILE, []);
    const user = users.find((u) => u.id === parsed.userId);
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }
    return NextResponse.json({ authenticated: true, user: sanitizeUser(user) });
  } catch {
    return NextResponse.json({ authenticated: false, user: null });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const action = typeof body.action === "string" ? body.action : "login";

    if (action === "logout") {
      const res = NextResponse.json({ success: true });
      res.cookies.delete(SESSION_COOKIE);
      return res;
    }

    if (action === "reset_password") {
      const identifier = typeof body.identifier === "string" ? body.identifier.trim().toLowerCase() : "";
      if (!identifier) {
        return NextResponse.json(
          { success: false, error: "Informe seu usuário ou e-mail para redefinir a senha." },
          { status: 400 }
        );
      }
      const users = readJsonStore<StoredUser[]>(STORE_FILE, []);
      const found = users.find(
        (u) => u.username.toLowerCase() === identifier || u.email.toLowerCase() === identifier
      );
      return NextResponse.json({
        success: true,
        accountFound: Boolean(found),
        message: found
          ? `Instruções de recuperação registradas para ${found.email}.`
          : "Se o cadastro existir em nossa base, você receberá um e-mail com o link.",
      });
    }

    const rawIdentifier = typeof body.identifier === "string" ? body.identifier.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const remember = Boolean(body.remember ?? true);

    if (!rawIdentifier || password.length < 4) {
      return NextResponse.json(
        { success: false, error: "Informe usuário/e-mail e uma senha com pelo menos 4 caracteres." },
        { status: 400 }
      );
    }

    const users = readJsonStore<StoredUser[]>(STORE_FILE, []);
    const normalizedId = rawIdentifier.toLowerCase().replace(/^@+/, "");

    if (action === "register") {
      const email =
        typeof body.email === "string" && body.email.includes("@")
          ? body.email.trim().toLowerCase()
          : rawIdentifier.includes("@")
            ? rawIdentifier.toLowerCase()
            : `${normalizedId}@criador.gta6gerador.com`;

      const displayName =
        typeof body.name === "string" && body.name.trim()
          ? body.name.trim()
          : rawIdentifier.split("@")[0];

      const exists = users.find(
        (u) => u.username.toLowerCase() === normalizedId || u.email.toLowerCase() === email
      );
      if (exists) {
        return NextResponse.json(
          { success: false, error: "Este usuário ou e-mail já está cadastrado. Use a aba Entrar." },
          { status: 409 }
        );
      }

      const salt = crypto.randomBytes(16).toString("hex");
      const newUser: StoredUser = {
        id: `usr-${Date.now()}`,
        username: normalizedId.replace(/[^a-z0-9_.-]/g, "") || `criador_${Date.now()}`,
        email,
        name: displayName,
        handle: `@${normalizedId.replace(/[^a-z0-9_]/g, "") || "criador"}`,
        plan: "Plano Criador Ativo",
        salt,
        passwordHash: hashPassword(password, salt),
        createdAt: new Date().toISOString(),
      };

      writeJsonStore(STORE_FILE, [...users, newUser]);

      const tokenPayload: AuthSessionToken = {
        userId: newUser.id,
        username: newUser.username,
        issuedAt: Date.now(),
      };
      const encoded = Buffer.from(JSON.stringify(tokenPayload), "utf-8").toString("base64url");

      const res = NextResponse.json({ success: true, user: sanitizeUser(newUser), isNew: true });
      res.cookies.set(SESSION_COOKIE, encoded, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 12,
      });
      return res;
    }

    // Default: login
    const existing = users.find(
      (u) => u.username.toLowerCase() === normalizedId || u.email.toLowerCase() === rawIdentifier.toLowerCase()
    );

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Conta não encontrada. Clique em 'Criar conta' para registrar seu acesso agora.",
        },
        { status: 401 }
      );
    }

    if (!verifyPassword(password, existing.salt, existing.passwordHash)) {
      return NextResponse.json(
        { success: false, error: "Senha incorreta. Tente novamente ou use 'Esqueci a senha'." },
        { status: 401 }
      );
    }

    const tokenPayload: AuthSessionToken = {
      userId: existing.id,
      username: existing.username,
      issuedAt: Date.now(),
    };
    const encoded = Buffer.from(JSON.stringify(tokenPayload), "utf-8").toString("base64url");

    const res = NextResponse.json({ success: true, user: sanitizeUser(existing), isNew: false });
    res.cookies.set(SESSION_COOKIE, encoded, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 12,
    });
    return res;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao autenticar.",
      },
      { status: 500 }
    );
  }
}
