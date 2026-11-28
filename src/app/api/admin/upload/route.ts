import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  validateAdminRequest,
  detectImageMagicBytes,
} from "@/lib/security";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "uploads");

export async function POST(req: NextRequest) {
  const auth = validateAdminRequest(req, true);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "File gambar tidak ditemukan pada form upload." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Ukuran foto maksimal adalah 5 MB." },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Inspect binary magic bytes (prevents disguised .php/.html/.exe/.svg scripts)
    const magicCheck = detectImageMagicBytes(buffer);
    if (!magicCheck.valid || !magicCheck.ext) {
      return NextResponse.json(
        {
          error:
            "File ditolak: Hanya format foto asli JPEG (.jpg), PNG (.png), atau WEBP (.webp) yang diizinkan.",
        },
        { status: 415 }
      );
    }

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Generate randomized safe filename to prevent Path Traversal (../) and overwrite attacks
    const safeFilename = `smpn5-${Date.now()}-${crypto
      .randomBytes(6)
      .toString("hex")}.${magicCheck.ext}`;
    const targetPath = path.join(UPLOAD_DIR, safeFilename);

    fs.writeFileSync(targetPath, buffer);

    return NextResponse.json({
      success: true,
      photoSrc: `/images/uploads/${safeFilename}`,
      sizeBytes: file.size,
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal memproses unggahan foto." },
      { status: 500 }
    );
  }
}
