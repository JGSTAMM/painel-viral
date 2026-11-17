import fs from "node:fs";
import path from "node:path";

/**
 * Resolve writable storage path in workspace `data/` or fallback to `/tmp` on read-only serverless runtimes.
 */
function resolveStoreFile(filename: string): string {
  const localDir = path.join(process.cwd(), "data");
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const probe = path.join(localDir, ".write-check");
    fs.writeFileSync(probe, "ok", "utf-8");
    fs.unlinkSync(probe);
    return path.join(localDir, filename);
  } catch {
    const tmpDir = path.join("/tmp", "painel-viral-data");
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return path.join(tmpDir, filename);
  }
}

export function readJsonStore<T>(filename: string, fallback: T): T {
  try {
    const filePath = resolveStoreFile(filename);
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJsonStore<T>(filename: string, data: T): void {
  const filePath = resolveStoreFile(filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
