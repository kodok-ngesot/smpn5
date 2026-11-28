"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ActivityNewsItem } from "@/data/activities";
import { AchievementItem } from "@/data/achievements";
import { SchoolPhoto } from "@/data/school-photos";
import { UltMessageItem } from "@/lib/cms-storage";
import {
  ShieldCheck,
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Newspaper,
  Award,
  Camera,
  Inbox,
  Upload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Check,
} from "lucide-react";

type AdminTab = "news" | "achievements" | "photos" | "ult";

export default function AdminDashboardPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  // Login Form State
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // CMS Data State
  const [activeTab, setActiveTab] = useState<AdminTab>("news");
  const [newsList, setNewsList] = useState<ActivityNewsItem[]>([]);
  const [achievementsList, setAchievementsList] = useState<AchievementItem[]>(
    []
  );
  const [photosList, setPhotosList] = useState<SchoolPhoto[]>([]);
  const [ultList, setUltList] = useState<UltMessageItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Feedback Banner
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Image Upload State
  const [uploadingImage, setUploadingImage] = useState(false);

  // News Editor Form State
  const [editingNewsId, setEditingNewsId] = useState<string>("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsCategory, setNewsCategory] =
    useState<ActivityNewsItem["category"]>("Kegiatan Sekolah");
  const [newsDate, setNewsDate] = useState("");
  const [newsAuthor, setNewsAuthor] = useState("Tim Humas SMPN 5 Purbalingga");
  const [newsExcerpt, setNewsExcerpt] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsPhotoSrc, setNewsPhotoSrc] = useState(
    "/images/school/real-p5-kewirausahaan.jpg"
  );

  // Achievement Editor Form State
  const [editingAchId, setEditingAchId] = useState<string>("");
  const [achTitle, setAchTitle] = useState("");
  const [achCompetition, setAchCompetition] = useState("");
  const [achRank, setAchRank] = useState("Juara 1");
  const [achCategory, setAchCategory] =
    useState<AchievementItem["category"]>("Olahraga");
  const [achLevel, setAchLevel] =
    useState<AchievementItem["level"]>("Kabupaten");
  const [achYear, setAchYear] = useState("2026");
  const [achWinner, setAchWinner] = useState("");
  const [achOrganizer, setAchOrganizer] = useState(
    "Dindikbud Kab. Purbalingga"
  );
  const [achPhotoSrc, setAchPhotoSrc] = useState(
    "/images/school/real-juara-futsal.jpg"
  );

  // Photo Gallery Form State
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoCategory, setPhotoCategory] = useState<SchoolPhoto["category"]>(
    "Gelar Karya P5 & Kewirausahaan"
  );
  const [photoCaption, setPhotoCaption] = useState("");
  const [photoLocation, setPhotoLocation] = useState(
    "Lapangan Utama SMPN 5 Purbalingga"
  );
  const [photoSrc, setPhotoSrc] = useState("");

  const fetchCmsData = useCallback(async () => {
    setDataLoading(true);
    try {
      const res = await fetch("/api/cms", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setNewsList(data.news || []);
        setAchievementsList(data.achievements || []);
        setPhotosList(data.photos || []);
        setUltList(data.ultMessages || []);
      }
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/admin/auth", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAuthenticated(true);
            setAdminUser(data.username);
            setCsrfToken(data.csrfToken);
            fetchCmsData();
          }
        }
      } finally {
        setAuthChecked(true);
      }
    }
    checkSession();
  }, [fetchCmsData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Gagal masuk ke dashboard admin.");
        return;
      }

      setAuthenticated(true);
      setAdminUser(data.username);
      setCsrfToken(data.csrfToken);
      setLoginPassword("");
      fetchCmsData();
    } catch {
      setLoginError("Terjadi gangguan jaringan saat menghubungi server.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setCsrfToken("");
    setAdminUser("");
  };

  const handleImageFileUpload = async (
    file: File,
    onUploaded: (src: string) => void
  ) => {
    setUploadingImage(true);
    setFeedback(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "x-csrf-token": csrfToken,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({
          type: "error",
          text: data.error || "Gagal mengunggah foto.",
        });
        return;
      }
      onUploaded(data.photoSrc);
      setFeedback({
        type: "success",
        text: "Foto berhasil diunggah dan diverifikasi (Magic-Bytes Valid).",
      });
    } catch {
      setFeedback({
        type: "error",
        text: "Terjadi kesalahan saat mengunggah file gambar.",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const resetNewsForm = () => {
    setEditingNewsId("");
    setNewsTitle("");
    setNewsCategory("Kegiatan Sekolah");
    setNewsDate("");
    setNewsAuthor("Tim Humas SMPN 5 Purbalingga");
    setNewsExcerpt("");
    setNewsContent("");
    setNewsPhotoSrc("/images/school/real-p5-kewirausahaan.jpg");
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const res = await fetch("/api/cms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      body: JSON.stringify({
        entity: "news",
        id: editingNewsId || undefined,
        title: newsTitle,
        category: newsCategory,
        date: newsDate,
        author: newsAuthor,
        excerpt: newsExcerpt,
        content: newsContent,
        photoSrc: newsPhotoSrc,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setFeedback({
        type: "error",
        text: data.error || "Gagal menyimpan berita.",
      });
      return;
    }

    setNewsList(data.news);
    setFeedback({
      type: "success",
      text: editingNewsId
        ? "Berita berhasil diperbarui dan langsung tampil di website."
        : "Berita baru berhasil diterbitkan ke halaman Beranda & Informasi.",
    });
    resetNewsForm();
  };

  const startEditNews = (item: ActivityNewsItem) => {
    setEditingNewsId(item.id);
    setNewsTitle(item.title);
    setNewsCategory(item.category);
    setNewsDate(item.date);
    setNewsAuthor(item.author);
    setNewsExcerpt(item.excerpt);
    setNewsContent(item.content);
    setNewsPhotoSrc(item.photoSrc);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetAchForm = () => {
    setEditingAchId("");
    setAchTitle("");
    setAchCompetition("");
    setAchRank("Juara 1");
    setAchCategory("Olahraga");
    setAchLevel("Kabupaten");
    setAchYear("2026");
    setAchWinner("");
    setAchOrganizer("Dindikbud Kab. Purbalingga");
    setAchPhotoSrc("/images/school/real-juara-futsal.jpg");
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const res = await fetch("/api/cms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      body: JSON.stringify({
        entity: "achievement",
        id: editingAchId || undefined,
        title: achTitle,
        competitionName: achCompetition,
        rank: achRank,
        category: achCategory,
        level: achLevel,
        year: achYear,
        winnerName: achWinner,
        organizer: achOrganizer,
        photoSrc: achPhotoSrc,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setFeedback({
        type: "error",
        text: data.error || "Gagal menyimpan data prestasi.",
      });
      return;
    }

    setAchievementsList(data.achievements);
    setFeedback({
      type: "success",
      text: editingAchId
        ? "Data prestasi berhasil diperbarui."
        : "Data prestasi baru berhasil ditambahkan ke Galeri Prestasi.",
    });
    resetAchForm();
  };

  const startEditAchievement = (item: AchievementItem) => {
    setEditingAchId(item.id);
    setAchTitle(item.title);
    setAchCompetition(item.competitionName);
    setAchRank(item.rank);
    setAchCategory(item.category);
    setAchLevel(item.level);
    setAchYear(item.year);
    setAchWinner(item.winnerName);
    setAchOrganizer(item.organizer);
    setAchPhotoSrc(item.photoSrc);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const res = await fetch("/api/cms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      body: JSON.stringify({
        entity: "photo",
        title: photoTitle,
        category: photoCategory,
        caption: photoCaption,
        locationLabel: photoLocation,
        src: photoSrc,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setFeedback({
        type: "error",
        text: data.error || "Gagal menyimpan foto galeri.",
      });
      return;
    }

    setPhotosList(data.photos);
    setPhotoTitle("");
    setPhotoCaption("");
    setPhotoSrc("");
    setFeedback({
      type: "success",
      text: "Foto kegiatan baru berhasil ditambahkan ke Galeri & Rolling Image.",
    });
  };

  const handleDeleteItem = async (
    entity: "news" | "achievement" | "photo" | "ult",
    id: string
  ) => {
    setFeedback(null);
    const res = await fetch(
      `/api/cms?entity=${encodeURIComponent(entity)}&id=${encodeURIComponent(
        id
      )}`,
      {
        method: "DELETE",
        headers: {
          "x-csrf-token": csrfToken,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      setFeedback({
        type: "error",
        text: data.error || "Gagal menghapus item.",
      });
      return;
    }

    setNewsList(data.news || []);
    setAchievementsList(data.achievements || []);
    setPhotosList(data.photos || []);
    setUltList(data.ultMessages || []);
    setFeedback({
      type: "success",
      text: "Item berhasil dihapus dari penyimpanan server.",
    });
  };

  const handleToggleUltRead = async (id: string) => {
    const res = await fetch("/api/cms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      body: JSON.stringify({
        entity: "ult_toggle_read",
        id,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setUltList(data.ultMessages || []);
    }
  };

  if (!authChecked) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-sm font-bold text-navy-900 dark:text-white">
          Memeriksa sesi keamanan Dashboard Admin SMPN 5 Purbalingga...
        </p>
      </div>
    );
  }

  // Unauthenticated View: Protected Login Screen
  if (!authenticated) {
    return (
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-navy-900">
            <div className="border-b-4 border-amber-500 bg-navy-900 p-6 text-white dark:bg-navy-950">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-navy-950">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Portal Pengelola Resmi
                  </span>
                  <h1 className="text-xl font-extrabold text-white">
                    Login Admin SMPN 5
                  </h1>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 dark:border-slate-800 dark:bg-navy-950 dark:text-slate-300">
                <p className="font-bold text-navy-900 dark:text-amber-300">
                  Akun Default Pengujian Lokal:
                </p>
                <p className="mt-1 font-mono">
                  Username: <strong>admin_smpn5</strong>
                </p>
                <p className="font-mono">
                  Password: <strong>Smpn5Pbg@2026!</strong>
                </p>
              </div>

              {loginError && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2.5 rounded-lg border-2 border-red-600 bg-red-50 p-3.5 text-xs font-bold text-red-900 dark:bg-red-950/70 dark:text-red-100"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700 dark:text-red-300" aria-hidden="true" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="admin-username"
                    className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    Username Admin
                  </label>
                  <input
                    id="admin-username"
                    type="text"
                    required
                    autoComplete="username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Masukkan username admin"
                    className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-navy-800 focus:bg-white dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    Password Admin
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Masukkan password admin"
                    className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-navy-800 focus:bg-white dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="inline-flex min-h-[46px] w-full items-center justify-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-extrabold text-navy-950 shadow-sm transition-all duration-150 hover:bg-amber-400 disabled:opacity-60"
                >
                  {loginLoading
                    ? "Memverifikasi Kredensial..."
                    : "Masuk ke Dashboard Pengelola"}
                </button>
              </form>

              <div className="mt-5 flex items-center gap-2 border-t border-slate-200 pt-4 text-[11px] text-slate-600 dark:border-slate-800 dark:text-slate-300">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                <span>
                  Dilindungi HMAC-SHA256 HttpOnly Cookie, Double-Submit CSRF, &
                  Brute-Force Lockout.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Authenticated Admin Workspace View
  const unreadUltCount = ultList.filter((m) => !m.isRead).length;

  return (
    <div className="pb-16">
      {/* Top Admin Header Bar */}
      <section className="border-b-4 border-amber-500 bg-navy-900 py-8 text-white dark:bg-navy-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold text-white">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                  Sesi Admin Terautentikasi ({adminUser})
                </span>
                <span className="rounded border border-amber-400/40 bg-navy-950 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                  CSRF Token Aktif
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Dashboard Pengelola Konten SMPN 5 Purbalingga
              </h1>
              <p className="mt-1 text-xs text-slate-200 sm:text-sm">
                Tambah, sunting, atau hapus Berita Kegiatan, Galeri Prestasi,
                Dokumentasi Foto, dan baca pesan masuk Unit Layanan Terpadu
                (ULT).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/"
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-600 bg-navy-800 px-4 py-2 text-xs font-bold text-white transition-colors hover:border-amber-400"
              >
                <span>Lihat Halaman Publik</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-red-700 px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-red-600"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span>Keluar (Logout)</span>
              </button>
            </div>
          </div>

          {/* 4 Module Switcher Tabs */}
          <div
            className="mt-6 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Modul Pengelolaan Konten"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "news"}
              onClick={() => setActiveTab("news")}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all sm:text-sm ${
                activeTab === "news"
                  ? "bg-amber-400 text-navy-950 shadow-sm"
                  : "bg-navy-950/80 text-slate-200 hover:bg-navy-800"
              }`}
            >
              <Newspaper className="h-4 w-4" aria-hidden="true" />
              <span>Kelola Berita & Pengumuman ({newsList.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "achievements"}
              onClick={() => setActiveTab("achievements")}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all sm:text-sm ${
                activeTab === "achievements"
                  ? "bg-amber-400 text-navy-950 shadow-sm"
                  : "bg-navy-950/80 text-slate-200 hover:bg-navy-800"
              }`}
            >
              <Award className="h-4 w-4" aria-hidden="true" />
              <span>Kelola Prestasi Siswa ({achievementsList.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "photos"}
              onClick={() => setActiveTab("photos")}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all sm:text-sm ${
                activeTab === "photos"
                  ? "bg-amber-400 text-navy-950 shadow-sm"
                  : "bg-navy-950/80 text-slate-200 hover:bg-navy-800"
              }`}
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              <span>Galeri Foto Kegiatan ({photosList.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "ult"}
              onClick={() => setActiveTab("ult")}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all sm:text-sm ${
                activeTab === "ult"
                  ? "bg-amber-400 text-navy-950 shadow-sm"
                  : "bg-navy-950/80 text-slate-200 hover:bg-navy-800"
              }`}
            >
              <Inbox className="h-4 w-4" aria-hidden="true" />
              <span>
                Kotak Masuk Saran / ULT ({ultList.length}
                {unreadUltCount > 0 ? ` • ${unreadUltCount} Baru` : ""})
              </span>
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Global Status Feedback Alert */}
        {feedback && (
          <div
            role="status"
            className={`mb-6 flex items-center justify-between gap-3 rounded-xl border-2 p-4 text-xs font-bold sm:text-sm ${
              feedback.type === "success"
                ? "border-emerald-700 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/70 dark:text-emerald-100"
                : "border-red-600 bg-red-50 text-red-950 dark:bg-red-950/70 dark:text-red-100"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedback.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 text-red-700 dark:text-red-400" aria-hidden="true" />
              )}
              <span>{feedback.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="rounded px-2 py-1 text-xs underline"
            >
              Tutup
            </button>
          </div>
        )}

        {dataLoading && (
          <p className="mb-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
            Memuat data terbaru dari server...
          </p>
        )}

        {/* TAB 1: KELOLA BERITA & PENGUMUMAN */}
        {activeTab === "news" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left 5 Cols: Add/Edit News Form */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
                  <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
                    {editingNewsId
                      ? "Sunting Artikel Berita"
                      : "Tambah Berita / Pengumuman Baru"}
                  </h2>
                  {editingNewsId && (
                    <button
                      type="button"
                      onClick={resetNewsForm}
                      className="text-xs font-bold text-red-700 underline dark:text-red-300"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveNews} className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="news-title"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      Judul Berita / Pengumuman *
                    </label>
                    <input
                      id="news-title"
                      type="text"
                      required
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="Masukkan judul kegiatan atau pengumuman"
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="news-cat"
                        className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                      >
                        Kategori
                      </label>
                      <select
                        id="news-cat"
                        value={newsCategory}
                        onChange={(e) =>
                          setNewsCategory(
                            e.target.value as ActivityNewsItem["category"]
                          )
                        }
                        className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                      >
                        <option value="Kegiatan Sekolah">
                          Kegiatan Sekolah
                        </option>
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Akademik">Akademik</option>
                        <option value="Kesiswaan">Kesiswaan</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="news-date"
                        className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                      >
                        Tanggal Publikasi
                      </label>
                      <input
                        id="news-date"
                        type="text"
                        value={newsDate}
                        onChange={(e) => setNewsDate(e.target.value)}
                        placeholder="Misal: 28 November 2026"
                        className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="news-author"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      Penulis / Unit Pengirim
                    </label>
                    <input
                      id="news-author"
                      type="text"
                      value={newsAuthor}
                      onChange={(e) => setNewsAuthor(e.target.value)}
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="news-excerpt"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      Ringkasan Singkat (Tampil di Kartu Berita) *
                    </label>
                    <textarea
                      id="news-excerpt"
                      rows={2}
                      required
                      value={newsExcerpt}
                      onChange={(e) => setNewsExcerpt(e.target.value)}
                      placeholder="Tuliskan ringkasan 1-2 kalimat..."
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="news-content"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      Isi Lengkap Berita
                    </label>
                    <textarea
                      id="news-content"
                      rows={4}
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      placeholder="Tuliskan rincian lengkap kegiatan atau pengumuman..."
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>

                  {/* Photo Upload or Choose Existing */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-navy-950">
                    <label
                      htmlFor="news-photo-upload"
                      className="block text-xs font-bold text-navy-900 dark:text-amber-300"
                    >
                      Foto Berita (Unggah dari Komputer atau Pilih Galeri)
                    </label>
                    <div className="mt-2 flex items-center gap-3">
                      <img
                        src={newsPhotoSrc}
                        alt="Preview foto berita"
                        width={80}
                        height={52}
                        className="h-14 w-20 rounded-lg border border-slate-300 object-cover"
                      />
                      <div className="flex-1">
                        <input
                          id="news-photo-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageFileUpload(file, (uploadedUrl) =>
                                setNewsPhotoSrc(uploadedUrl)
                              );
                            }
                          }}
                          className="block w-full text-xs text-slate-700 file:mr-2 file:rounded-lg file:border-0 file:bg-navy-900 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white dark:text-slate-200"
                        />
                        {uploadingImage && (
                          <span className="mt-1 block text-[11px] font-bold text-amber-600">
                            Mengunggah & memeriksa keamanan foto...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-extrabold text-navy-950 shadow-sm transition-all hover:bg-amber-400"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {editingNewsId
                        ? "Simpan Perubahan Berita"
                        : "Terbitkan Berita Sekarang"}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right 7 Cols: Published News Table */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
                <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
                  Daftar Berita & Pengumuman Terbit ({newsList.length})
                </h2>

                <div className="mt-4 space-y-3">
                  {newsList.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-navy-950 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-start gap-3.5">
                        <img
                          src={item.photoSrc}
                          alt={item.title}
                          width={96}
                          height={64}
                          className="h-16 w-24 shrink-0 rounded-lg object-cover"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="rounded bg-navy-900 px-2 py-0.5 font-bold text-amber-300">
                              {item.category}
                            </span>
                            <span className="text-slate-600 dark:text-slate-300">
                              {item.date}
                            </span>
                          </div>
                          <h3 className="mt-1 text-sm font-extrabold text-navy-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 line-clamp-1 text-xs text-slate-600 dark:text-slate-300">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEditNews(item)}
                          className="inline-flex min-h-[38px] items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-navy-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-navy-900 dark:text-amber-300"
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem("news", item.id)}
                          className="inline-flex min-h-[38px] items-center gap-1 rounded-lg bg-red-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA PRESTASI SISWA */}
        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left 5 Cols: Add/Edit Achievement Form */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
                  <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
                    {editingAchId
                      ? "Sunting Data Prestasi"
                      : "Tambah Prestasi / Penghargaan Baru"}
                  </h2>
                  {editingAchId && (
                    <button
                      type="button"
                      onClick={resetAchForm}
                      className="text-xs font-bold text-red-700 underline dark:text-red-300"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveAchievement} className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="ach-title"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      Judul Capaian Prestasi *
                    </label>
                    <input
                      id="ach-title"
                      type="text"
                      required
                      value={achTitle}
                      onChange={(e) => setAchTitle(e.target.value)}
                      placeholder="Misal: Juara 1 Olimpiade Sains Nasional (OSN) IPA"
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="ach-rank"
                        className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                      >
                        Peringkat / Medali
                      </label>
                      <input
                        id="ach-rank"
                        type="text"
                        value={achRank}
                        onChange={(e) => setAchRank(e.target.value)}
                        placeholder="Juara 1 / Emas"
                        className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="ach-year"
                        className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                      >
                        Tahun
                      </label>
                      <input
                        id="ach-year"
                        type="text"
                        value={achYear}
                        onChange={(e) => setAchYear(e.target.value)}
                        className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="ach-cat"
                        className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                      >
                        Kategori Bidang
                      </label>
                      <select
                        id="ach-cat"
                        value={achCategory}
                        onChange={(e) =>
                          setAchCategory(
                            e.target.value as AchievementItem["category"]
                          )
                        }
                        className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                      >
                        <option value="Akademik">Akademik</option>
                        <option value="Olahraga">Olahraga</option>
                        <option value="Seni & Budaya">Seni & Budaya</option>
                        <option value="Kesiswaan & Sekolah">
                          Kesiswaan & Sekolah
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="ach-level"
                        className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                      >
                        Tingkat Kejuaraan
                      </label>
                      <select
                        id="ach-level"
                        value={achLevel}
                        onChange={(e) =>
                          setAchLevel(
                            e.target.value as AchievementItem["level"]
                          )
                        }
                        className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                      >
                        <option value="Kabupaten">Kabupaten</option>
                        <option value="Karesidenan / Provinsi">
                          Karesidenan / Provinsi
                        </option>
                        <option value="Nasional">Nasional</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="ach-winner"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      Nama Siswa / Tim Peraih Prestasi *
                    </label>
                    <input
                      id="ach-winner"
                      type="text"
                      required
                      value={achWinner}
                      onChange={(e) => setAchWinner(e.target.value)}
                      placeholder="Masukkan nama siswa atau regu pemenang"
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ach-comp"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      Nama Ajang / Kompetisi
                    </label>
                    <input
                      id="ach-comp"
                      type="text"
                      value={achCompetition}
                      onChange={(e) => setAchCompetition(e.target.value)}
                      placeholder="Misal: POPDA Jenjang SMP Kabupaten Purbalingga"
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ach-org"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      Penyelenggara
                    </label>
                    <input
                      id="ach-org"
                      type="text"
                      value={achOrganizer}
                      onChange={(e) => setAchOrganizer(e.target.value)}
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>

                  {/* Achievement Photo Upload */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-navy-950">
                    <label
                      htmlFor="ach-photo-upload"
                      className="block text-xs font-bold text-navy-900 dark:text-amber-300"
                    >
                      Foto Dokumentasi Prestasi / Piala
                    </label>
                    <div className="mt-2 flex items-center gap-3">
                      <img
                        src={achPhotoSrc}
                        alt="Preview foto prestasi"
                        width={80}
                        height={52}
                        className="h-14 w-20 rounded-lg border border-slate-300 object-cover"
                      />
                      <input
                        id="ach-photo-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageFileUpload(file, (uploadedUrl) =>
                              setAchPhotoSrc(uploadedUrl)
                            );
                          }
                        }}
                        className="block w-full text-xs text-slate-700 file:mr-2 file:rounded-lg file:border-0 file:bg-navy-900 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white dark:text-slate-200"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-extrabold text-navy-950 shadow-sm transition-all hover:bg-amber-400"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {editingAchId
                        ? "Simpan Perubahan Prestasi"
                        : "Tambahkan ke Galeri Prestasi"}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right 7 Cols: Achievements List */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
                <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
                  Daftar Prestasi Terdaftar ({achievementsList.length})
                </h2>

                <div className="mt-4 space-y-3">
                  {achievementsList.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-navy-950 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-start gap-3.5">
                        <img
                          src={item.photoSrc}
                          alt={item.title}
                          width={96}
                          height={64}
                          className="h-16 w-24 shrink-0 rounded-lg object-cover"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 text-xs">
                            <span className="rounded bg-amber-400 px-2 py-0.5 font-extrabold text-navy-950">
                              {item.rank}
                            </span>
                            <span className="rounded bg-navy-900 px-2 py-0.5 font-bold text-white">
                              {item.category} • {item.level}
                            </span>
                            <span className="font-bold text-slate-600 dark:text-slate-300">
                              ({item.year})
                            </span>
                          </div>
                          <h3 className="mt-1 text-sm font-extrabold text-navy-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 text-xs font-semibold text-teal-800 dark:text-teal-300">
                            Penerima: {item.winnerName}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEditAchievement(item)}
                          className="inline-flex min-h-[38px] items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-navy-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-navy-900 dark:text-amber-300"
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteItem("achievement", item.id)
                          }
                          className="inline-flex min-h-[38px] items-center gap-1 rounded-lg bg-red-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KELOLA GALERI FOTO KEGIATAN */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
                <h2 className="border-b border-slate-200 pb-3 text-lg font-extrabold text-navy-900 dark:border-slate-800 dark:text-white">
                  Unggah Foto Kegiatan Baru ke Galeri
                </h2>

                <form onSubmit={handleSavePhoto} className="mt-4 space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-navy-950">
                    <label
                      htmlFor="gallery-file-upload"
                      className="block text-xs font-bold text-navy-900 dark:text-amber-300"
                    >
                      1. Pilih File Foto dari Komputer (JPG / PNG / WEBP) *
                    </label>
                    <input
                      id="gallery-file-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageFileUpload(file, (uploadedUrl) =>
                            setPhotoSrc(uploadedUrl)
                          );
                        }
                      }}
                      className="mt-2 block w-full text-xs text-slate-700 file:mr-2 file:rounded-lg file:border-0 file:bg-navy-900 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white dark:text-slate-200"
                    />
                    {photoSrc && (
                      <div className="mt-3">
                        <img
                          src={photoSrc}
                          alt="Preview unggahan galeri"
                          width={240}
                          height={150}
                          className="h-32 w-full rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="photo-title"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      2. Judul Foto Kegiatan *
                    </label>
                    <input
                      id="photo-title"
                      type="text"
                      required
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      placeholder="Misal: Kegiatan Bakti Sosial OSIS SMPN 5"
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="photo-category"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      3. Kategori Dokumentasi
                    </label>
                    <select
                      id="photo-category"
                      value={photoCategory}
                      onChange={(e) =>
                        setPhotoCategory(
                          e.target.value as SchoolPhoto["category"]
                        )
                      }
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    >
                      <option value="Gelar Karya P5 & Kewirausahaan">
                        Gelar Karya P5 & Kewirausahaan
                      </option>
                      <option value="Upacara & Kepemimpinan OSIS">
                        Upacara & Kepemimpinan OSIS
                      </option>
                      <option value="Ramadhan Festive & Sosial">
                        Ramadhan Festive & Sosial
                      </option>
                      <option value="Seni Budaya & Literasi">
                        Seni Budaya & Literasi
                      </option>
                      <option value="Olahraga & Kesiswaan">
                        Olahraga & Kesiswaan
                      </option>
                      <option value="Kegiatan Guru & DWP">
                        Kegiatan Guru & DWP
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="photo-location"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      4. Lokasi Kegiatan
                    </label>
                    <input
                      id="photo-location"
                      type="text"
                      value={photoLocation}
                      onChange={(e) => setPhotoLocation(e.target.value)}
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="photo-caption"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      5. Caption / Keterangan Lengkap Foto *
                    </label>
                    <textarea
                      id="photo-caption"
                      rows={3}
                      required
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      placeholder="Jelaskan kegiatan yang tampak pada foto..."
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!photoSrc || uploadingImage}
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-extrabold text-navy-950 shadow-sm transition-all hover:bg-amber-400 disabled:opacity-50"
                  >
                    <Upload className="h-4 w-4" aria-hidden="true" />
                    <span>Simpan Foto ke Galeri Sekolah</span>
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
                <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
                  Koleksi Foto Galeri & Rolling Image ({photosList.length} Foto)
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {photosList.map((photo) => (
                    <div
                      key={photo.id}
                      className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-navy-950"
                    >
                      <div>
                        <img
                          src={photo.src}
                          alt={photo.title}
                          width={320}
                          height={200}
                          className="h-36 w-full object-cover"
                        />
                        <div className="p-3.5">
                          <span className="inline-block rounded bg-navy-900 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                            {photo.category}
                          </span>
                          <h3 className="mt-1.5 text-xs font-extrabold text-navy-900 dark:text-white">
                            {photo.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-[11px] text-slate-600 dark:text-slate-300">
                            {photo.caption}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-200 px-3.5 py-2 dark:border-slate-800">
                        <span className="truncate text-[11px] font-medium text-slate-500">
                          {photo.locationLabel}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem("photo", photo.id)}
                          className="inline-flex min-h-[32px] items-center gap-1 rounded bg-red-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3" aria-hidden="true" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KOTAK MASUK SARAN & UNIT LAYANAN TERPADU (ULT) */}
        {activeTab === "ult" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
            <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
              Kotak Masuk Aspirasi, Pertanyaan PPDB & Pengaduan Masyarakat (ULT)
            </h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              Setiap pesan yang dikirim oleh orang tua/masyarakat melalui
              formulir di halaman Kontak (`/kontak`) otomatis masuk ke daftar di
              bawah ini.
            </p>

            {ultList.length === 0 ? (
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-navy-950">
                <p className="text-sm font-bold text-navy-900 dark:text-white">
                  Belum ada pesan ULT yang masuk.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {ultList.map((msg) => (
                  <div
                    key={msg.id}
                    className={`rounded-xl border p-5 ${
                      msg.isRead
                        ? "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-navy-950"
                        : "border-2 border-amber-500 bg-amber-50/30 dark:bg-navy-950"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {!msg.isRead && (
                          <span className="rounded bg-amber-400 px-2 py-0.5 text-xs font-extrabold text-navy-950">
                            Pesan Baru
                          </span>
                        )}
                        <span className="rounded bg-navy-900 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                          {msg.topicCategory}
                        </span>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                          Dikirim: {msg.createdAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleUltRead(msg.id)}
                          className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-navy-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-navy-900 dark:text-amber-300"
                        >
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>
                            {msg.isRead
                              ? "Tandai Belum Dibaca"
                              : "Tandai Sudah Dibaca"}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem("ult", msg.id)}
                          className="inline-flex min-h-[36px] items-center gap-1 rounded-lg bg-red-700 px-3 py-1 text-xs font-bold text-white hover:bg-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>

                    <h3 className="mt-2.5 text-base font-extrabold text-navy-900 dark:text-white">
                      {msg.fullName}{" "}
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        ({msg.senderRole} • Telp/WA: {msg.contactNumber})
                      </span>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                      {msg.messageText}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
