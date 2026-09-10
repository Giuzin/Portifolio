import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { ContentOverrides } from "./getContent";

export const OVERRIDES_PATH = path.join(process.cwd(), "src/data/content-overrides.json");
export const UPLOADS_DIR = path.join(process.cwd(), "public/uploads");

function getExtensionFromDataUrl(dataUrl: string): string {
  const match = dataUrl.match(/^data:image\/(\w+);/);
  if (!match) return "png";

  const ext = match[1].toLowerCase();
  return ext === "jpeg" ? "jpg" : ext;
}

function sanitizeFileName(key: string): string {
  return key.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "image";
}

export async function readContentOverrides(): Promise<ContentOverrides> {
  try {
    const raw = await fs.readFile(OVERRIDES_PATH, "utf-8");
    return JSON.parse(raw) as ContentOverrides;
  } catch {
    return {};
  }
}

export async function writeContentOverrides(
  overrides: ContentOverrides,
): Promise<ContentOverrides> {
  const processed: ContentOverrides = { ...overrides };

  for (const [key, value] of Object.entries(processed)) {
    if (!key.startsWith("image.") || !value.startsWith("data:")) continue;

    const imageKey = key.slice("image.".length);
    const ext = getExtensionFromDataUrl(value);
    const filename = `${sanitizeFileName(imageKey)}.${ext}`;

    await fs.mkdir(UPLOADS_DIR, { recursive: true });

    const base64 = value.split(",")[1];
    if (!base64) continue;

    const outputPath = path.join(UPLOADS_DIR, filename);
    const input = Buffer.from(base64, "base64");
    const image = sharp(input);
    const metadata = await image.metadata();
    const resizeOptions = {
      width: metadata.width ? metadata.width * 4 : undefined,
      height: metadata.height ? metadata.height * 4 : undefined,
      fit: "fill" as const,
      kernel: sharp.kernel.lanczos3,
    };

    if (ext === "jpg") {
      await image.resize(resizeOptions).sharpen({ sigma: 0.8 }).jpeg({ quality: 95, mozjpeg: true }).toFile(outputPath);
    } else if (ext === "webp") {
      await image.resize(resizeOptions).sharpen({ sigma: 0.8 }).webp({ quality: 95 }).toFile(outputPath);
    } else {
      await image.resize(resizeOptions).sharpen({ sigma: 0.8 }).png({ compressionLevel: 6 }).toFile(outputPath);
    }
    processed[key] = `/uploads/${filename}`;
  }

  await fs.mkdir(path.dirname(OVERRIDES_PATH), { recursive: true });
  await fs.writeFile(OVERRIDES_PATH, `${JSON.stringify(processed, null, 2)}\n`);

  return processed;
}

export async function clearContentOverrides(): Promise<void> {
  await fs.writeFile(OVERRIDES_PATH, "{}\n");

  try {
    const files = await fs.readdir(UPLOADS_DIR);
    await Promise.all(
      files
        .filter((file) => file !== ".gitkeep")
        .map((file) => fs.unlink(path.join(UPLOADS_DIR, file))),
    );
  } catch {
    // uploads dir may not exist yet
  }
}
