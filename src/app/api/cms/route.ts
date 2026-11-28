import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { readCmsDb, writeCmsDb } from "@/lib/cms-storage";
import { validateAdminRequest, sanitizeText } from "@/lib/security";
import { ActivityNewsItem } from "@/data/activities";
import { AchievementItem } from "@/data/achievements";
import { SchoolPhoto } from "@/data/school-photos";

const VALID_NEWS_CATEGORIES: ActivityNewsItem["category"][] = [
  "Kegiatan Sekolah",
  "Pengumuman",
  "Akademik",
  "Kesiswaan",
];

const VALID_ACHIEVEMENT_CATEGORIES: AchievementItem["category"][] = [
  "Akademik",
  "Olahraga",
  "Seni & Budaya",
  "Kesiswaan & Sekolah",
];

const VALID_ACHIEVEMENT_LEVELS: AchievementItem["level"][] = [
  "Kabupaten",
  "Karesidenan / Provinsi",
  "Nasional",
];

const VALID_PHOTO_CATEGORIES: SchoolPhoto["category"][] = [
  "Gelar Karya P5 & Kewirausahaan",
  "Upacara & Kepemimpinan OSIS",
  "Ramadhan Festive & Sosial",
  "Seni Budaya & Literasi",
  "Olahraga & Kesiswaan",
  "Kegiatan Guru & DWP",
];

// Public GET: returns live CMS data (ultMessages are only included if admin session is valid)
export async function GET(req: NextRequest) {
  const db = readCmsDb();
  const auth = validateAdminRequest(req, false);

  return NextResponse.json({
    news: db.news,
    achievements: db.achievements,
    photos: db.photos,
    ultMessages: auth.valid ? db.ultMessages : undefined,
    updatedAt: db.updatedAt,
  });
}

// POST: Create or Update News, Achievement, Photo, or Public ULT Message
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entity = body?.entity as string;

    // Public ULT submission from /kontak does not require admin login, but applies strict input sanitization
    if (entity === "ult_public") {
      const fullName = sanitizeText(body?.fullName, 100);
      const senderRole = sanitizeText(body?.senderRole, 80);
      const contactNumber = sanitizeText(body?.contactNumber, 40);
      const topicCategory = sanitizeText(body?.topicCategory, 80);
      const messageText = sanitizeText(body?.messageText, 1500);

      if (
        fullName.length < 3 ||
        contactNumber.length < 8 ||
        messageText.length < 10
      ) {
        return NextResponse.json(
          { error: "Data formulir ULT belum lengkap atau terlalu pendek." },
          { status: 400 }
        );
      }

      const db = readCmsDb();
      const newMessage = {
        id: `ult-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
        fullName,
        senderRole: senderRole || "Masyarakat Umum",
        contactNumber,
        topicCategory: topicCategory || "Informasi Umum",
        messageText,
        createdAt: new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        isRead: false,
      };

      db.ultMessages.unshift(newMessage);
      writeCmsDb(db);

      return NextResponse.json({ success: true, item: newMessage });
    }

    // All other mutations require verified Admin Session + Double-Submit CSRF Token
    const auth = validateAdminRequest(req, true);
    if (!auth.valid) {
      return NextResponse.json({ error: auth.error }, { status: 403 });
    }

    const db = readCmsDb();

    if (entity === "news") {
      const id = sanitizeText(body?.id, 80);
      const title = sanitizeText(body?.title, 180);
      const rawCat = sanitizeText(body?.category, 60) as ActivityNewsItem["category"];
      const category = VALID_NEWS_CATEGORIES.includes(rawCat)
        ? rawCat
        : "Kegiatan Sekolah";
      const date =
        sanitizeText(body?.date, 50) ||
        new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      const author =
        sanitizeText(body?.author, 80) || "Tim Humas SMPN 5 Purbalingga";
      const excerpt = sanitizeText(body?.excerpt, 350);
      const content = sanitizeText(body?.content, 4000);
      const photoSrc =
        sanitizeText(body?.photoSrc, 250) ||
        "/images/school/real-p5-kewirausahaan.jpg";

      if (title.length < 5 || excerpt.length < 10) {
        return NextResponse.json(
          { error: "Judul berita dan ringkasan berita wajib diisi." },
          { status: 400 }
        );
      }

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const existingIdx = id ? db.news.findIndex((n) => n.id === id) : -1;
      const newsItem: ActivityNewsItem = {
        id:
          existingIdx >= 0
            ? id
            : `kegiatan-${Date.now()}-${crypto.randomBytes(2).toString("hex")}`,
        slug,
        title,
        category,
        date,
        author,
        excerpt,
        content: content || excerpt,
        photoSrc,
        isDummy: false,
      };

      if (existingIdx >= 0) {
        db.news[existingIdx] = newsItem;
      } else {
        db.news.unshift(newsItem);
      }

      writeCmsDb(db);
      return NextResponse.json({ success: true, item: newsItem, news: db.news });
    }

    if (entity === "achievement") {
      const id = sanitizeText(body?.id, 80);
      const title = sanitizeText(body?.title, 180);
      const competitionName = sanitizeText(body?.competitionName, 180);
      const rank = sanitizeText(body?.rank, 50) || "Juara 1";
      const rawCat = sanitizeText(
        body?.category,
        60
      ) as AchievementItem["category"];
      const category = VALID_ACHIEVEMENT_CATEGORIES.includes(rawCat)
        ? rawCat
        : "Akademik";
      const rawLevel = sanitizeText(
        body?.level,
        60
      ) as AchievementItem["level"];
      const level = VALID_ACHIEVEMENT_LEVELS.includes(rawLevel)
        ? rawLevel
        : "Kabupaten";
      const year = sanitizeText(body?.year, 10) || "2026";
      const winnerName = sanitizeText(body?.winnerName, 120);
      const organizer = sanitizeText(body?.organizer, 140);
      const photoSrc =
        sanitizeText(body?.photoSrc, 250) ||
        "/images/school/real-juara-futsal.jpg";

      if (title.length < 5 || winnerName.length < 2) {
        return NextResponse.json(
          { error: "Judul prestasi dan nama peraih wajib diisi." },
          { status: 400 }
        );
      }

      const existingIdx = id
        ? db.achievements.findIndex((a) => a.id === id)
        : -1;
      const achItem: AchievementItem = {
        id:
          existingIdx >= 0
            ? id
            : `prestasi-${Date.now()}-${crypto.randomBytes(2).toString("hex")}`,
        title,
        competitionName: competitionName || title,
        rank,
        category,
        level,
        year,
        winnerName,
        organizer: organizer || "Dindikbud Kab. Purbalingga",
        photoSrc,
        isDummy: false,
      };

      if (existingIdx >= 0) {
        db.achievements[existingIdx] = achItem;
      } else {
        db.achievements.unshift(achItem);
      }

      writeCmsDb(db);
      return NextResponse.json({
        success: true,
        item: achItem,
        achievements: db.achievements,
      });
    }

    if (entity === "photo") {
      const title = sanitizeText(body?.title, 150);
      const rawCat = sanitizeText(
        body?.category,
        80
      ) as SchoolPhoto["category"];
      const category = VALID_PHOTO_CATEGORIES.includes(rawCat)
        ? rawCat
        : "Gelar Karya P5 & Kewirausahaan";
      const caption = sanitizeText(body?.caption, 400);
      const locationLabel =
        sanitizeText(body?.locationLabel, 100) || "Kampus SMPN 5 Purbalingga";
      const src = sanitizeText(body?.src, 250);

      if (!src || title.length < 3 || caption.length < 5) {
        return NextResponse.json(
          { error: "Foto, judul foto, dan caption kegiatan wajib diisi." },
          { status: 400 }
        );
      }

      const newPhoto: SchoolPhoto = {
        id: `foto-${Date.now()}-${crypto.randomBytes(2).toString("hex")}`,
        src,
        title,
        category,
        caption,
        locationLabel,
        isPlaceholder: false,
      };

      db.photos.unshift(newPhoto);
      writeCmsDb(db);
      return NextResponse.json({
        success: true,
        item: newPhoto,
        photos: db.photos,
      });
    }

    if (entity === "ult_toggle_read") {
      const id = sanitizeText(body?.id, 80);
      const msg = db.ultMessages.find((m) => m.id === id);
      if (msg) {
        msg.isRead = !msg.isRead;
        writeCmsDb(db);
      }
      return NextResponse.json({
        success: true,
        ultMessages: db.ultMessages,
      });
    }

    return NextResponse.json(
      { error: "Tipe entitas tidak dikenali." },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "Gagal memproses data CMS." },
      { status: 500 }
    );
  }
}

// DELETE: Remove a News item, Achievement, Photo, or ULT message (Requires Admin + CSRF)
export async function DELETE(req: NextRequest) {
  const auth = validateAdminRequest(req, true);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const entity = sanitizeText(searchParams.get("entity"), 40);
  const id = sanitizeText(searchParams.get("id"), 80);

  if (!entity || !id) {
    return NextResponse.json(
      { error: "Parameter entity dan id wajib disertakan." },
      { status: 400 }
    );
  }

  const db = readCmsDb();

  if (entity === "news") {
    db.news = db.news.filter((n) => n.id !== id);
  } else if (entity === "achievement") {
    db.achievements = db.achievements.filter((a) => a.id !== id);
  } else if (entity === "photo") {
    db.photos = db.photos.filter((p) => p.id !== id);
  } else if (entity === "ult") {
    db.ultMessages = db.ultMessages.filter((m) => m.id !== id);
  } else {
    return NextResponse.json(
      { error: "Entitas tidak valid." },
      { status: 400 }
    );
  }

  writeCmsDb(db);
  return NextResponse.json({
    success: true,
    news: db.news,
    achievements: db.achievements,
    photos: db.photos,
    ultMessages: db.ultMessages,
  });
}
