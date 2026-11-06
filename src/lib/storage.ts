import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { ContactInquiry } from "@/types/contact";

function getDataDir(): string {
  return process.env.CONTACT_DATA_DIR || path.join(process.cwd(), "data");
}

function isMissingFile(error: unknown): boolean {
  return (error as NodeJS.ErrnoException).code === "ENOENT";
}

export async function getInquiries(): Promise<ContactInquiry[]> {
  const dataDir = getDataDir();
  let legacy: ContactInquiry[] = [];
  try {
    const parsed: unknown = JSON.parse(await fs.readFile(path.join(dataDir, "inquiries.json"), "utf8"));
    if (!Array.isArray(parsed)) throw new Error("The inquiry archive is not an array");
    legacy = parsed as ContactInquiry[];
  } catch (error) {
    if (!isMissingFile(error)) throw error;
  }

  const directory = path.join(dataDir, "inquiries");
  let filenames: string[] = [];
  try {
    filenames = await fs.readdir(directory);
  } catch (error) {
    if (!isMissingFile(error)) throw error;
  }
  const records = await Promise.all(filenames.filter((name) => /^inq_[a-f0-9-]+\.json$/.test(name)).map(async (name) => {
    return JSON.parse(await fs.readFile(path.join(directory, name), "utf8")) as ContactInquiry;
  }));
  return [...legacy, ...records].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveInquiry(inquiry: Omit<ContactInquiry, "id" | "createdAt" | "status">): Promise<ContactInquiry> {
  const directory = path.join(getDataDir(), "inquiries");
  await fs.mkdir(directory, { recursive: true });
  const record: ContactInquiry = {
    ...inquiry,
    id: `inq_${randomUUID()}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  const filePath = path.join(directory, `${record.id}.json`);
  const tempPath = `${filePath}.tmp`;
  try {
    await fs.writeFile(tempPath, JSON.stringify(record, null, 2), { encoding: "utf8", flag: "wx", mode: 0o600 });
    await fs.rename(tempPath, filePath);
  } catch (error) {
    await fs.unlink(tempPath).catch(() => undefined);
    throw error;
  }
  return record;
}
