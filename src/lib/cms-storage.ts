import fs from "fs";
import path from "path";
import { achievementsData, AchievementItem } from "@/data/achievements";
import { activitiesNewsData, ActivityNewsItem } from "@/data/activities";
import { schoolPhotos, SchoolPhoto } from "@/data/school-photos";

export interface UltMessageItem {
  id: string;
  fullName: string;
  senderRole: string;
  contactNumber: string;
  topicCategory: string;
  messageText: string;
  createdAt: string;
  isRead: boolean;
}

export interface CmsDatabaseSchema {
  news: ActivityNewsItem[];
  achievements: AchievementItem[];
  photos: SchoolPhoto[];
  ultMessages: UltMessageItem[];
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE_PATH = path.join(DATA_DIR, "cms-db.json");

function createInitialDb(): CmsDatabaseSchema {
  return {
    news: activitiesNewsData,
    achievements: achievementsData,
    photos: schoolPhotos,
    ultMessages: [
      {
        id: "ult-sample-1",
        fullName: "Wahyu Hidayat (Contoh Pesan ULT)",
        senderRole: "Orang Tua / Wali Murid",
        contactNumber: "081227001234",
        topicCategory: "Informasi PPDB / Pendaftaran",
        messageText:
          "Selamat pagi Admin SMPN 5 Purbalingga, mohon informasi apakah persyaratan Kartu Keluarga untuk jalur zonasi harus minimal satu tahun sebelum tanggal pendaftaran?",
        createdAt: "23 November 2026, 09:15 WIB",
        isRead: false,
      },
    ],
    updatedAt: new Date().toISOString(),
  };
}

export function readCmsDb(): CmsDatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE_PATH)) {
      const initial = createInitialDb();
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }

    const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<CmsDatabaseSchema>;

    return {
      news: Array.isArray(parsed.news) ? parsed.news : activitiesNewsData,
      achievements: Array.isArray(parsed.achievements)
        ? parsed.achievements
        : achievementsData,
      photos: Array.isArray(parsed.photos) ? parsed.photos : schoolPhotos,
      ultMessages: Array.isArray(parsed.ultMessages) ? parsed.ultMessages : [],
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return createInitialDb();
  }
}

export function writeCmsDb(data: CmsDatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  data.updatedAt = new Date().toISOString();
  const tempPath = `${DB_FILE_PATH}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempPath, DB_FILE_PATH);
}
