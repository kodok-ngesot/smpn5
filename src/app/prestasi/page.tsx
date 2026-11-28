"use client";

import React, { useState, useEffect } from "react";
import { achievementsData, AchievementItem } from "@/data/achievements";
import { Award, Search, RotateCcw } from "lucide-react";

const categoryOptions = [
  "Semua Kategori",
  "Akademik",
  "Olahraga",
  "Seni & Budaya",
  "Kesiswaan & Sekolah",
] as const;

const levelOptions = [
  "Semua Tingkat",
  "Kabupaten",
  "Karesidenan / Provinsi",
  "Nasional",
] as const;

export default function PrestasiPage() {
  const [liveAchievements, setLiveAchievements] =
    useState<AchievementItem[]>(achievementsData);
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categoryOptions)[number]>("Semua Kategori");
  const [selectedLevel, setSelectedLevel] =
    useState<(typeof levelOptions)[number]>("Semua Tingkat");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/cms", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.achievements)) {
          setLiveAchievements(data.achievements);
        }
      })
      .catch(() => {});
  }, []);

  const filteredAchievements = liveAchievements.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua Kategori" ||
      item.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "Semua Tingkat" || item.level === selectedLevel;
    const matchesQuery =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.competitionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.winnerName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesLevel && matchesQuery;
  });

  const resetFilters = () => {
    setSelectedCategory("Semua Kategori");
    setSelectedLevel("Semua Tingkat");
    setSearchQuery("");
  };

  return (
    <div>
      {/* Page Header */}
      <section className="border-b-4 border-amber-500 bg-navy-900 py-10 text-white dark:bg-navy-950 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Apresiasi & Pencapaian
            </span>
            <span className="rounded border border-amber-400/50 bg-navy-950 px-2.5 py-0.5 text-xs font-semibold text-amber-200">
              Mode Data Sementara (Siap Diisi Source Prestasi Asli)
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Galeri Prestasi Siswa & Penghargaan Sekolah
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
            Dokumentasi capaian kejuaraan peserta didik SMP Negeri 5 Purbalingga
            pada ajang akademik (OSN, MAPSI), olahraga (O2SN, POPDA), seni
            budaya (FLS2N), dan baris-berbaris.
          </p>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <section className="border-b border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-navy-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
            {/* Search Field with Real Label (R-39) */}
            <div className="lg:col-span-4">
              <label
                htmlFor="search-prestasi"
                className="block text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                Cari Nama Lomba / Bidang Kejuaraan
              </label>
              <div className="relative mt-1.5">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" aria-hidden="true" />
                <input
                  id="search-prestasi"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik OSN, Voli, Tari, Paskibra..."
                  className="min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-navy-800 focus:bg-white dark:border-slate-700 dark:bg-navy-950 dark:text-white dark:placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-5">
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                Filter Kategori Bidang
              </span>
              <div
                className="mt-1.5 flex flex-wrap gap-1.5"
                role="group"
                aria-label="Filter kategori prestasi"
              >
                {categoryOptions.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      aria-pressed={active}
                      className={`min-h-[40px] rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-150 ${
                        active
                          ? "bg-navy-900 text-amber-300 shadow-sm dark:bg-amber-400 dark:text-navy-950"
                          : "border border-slate-300 bg-slate-50 text-slate-800 hover:border-navy-700 hover:bg-white dark:border-slate-700 dark:bg-navy-950 dark:text-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level Select */}
            <div className="lg:col-span-3">
              <label
                htmlFor="level-select"
                className="block text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                Tingkat Kejuaraan
              </label>
              <select
                id="level-select"
                value={selectedLevel}
                onChange={(e) =>
                  setSelectedLevel(
                    e.target.value as (typeof levelOptions)[number]
                  )
                }
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-navy-800 focus:bg-white dark:border-slate-700 dark:bg-navy-950 dark:text-white"
              >
                {levelOptions.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-sm">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Menampilkan{" "}
              <strong className="font-extrabold text-navy-900 dark:text-amber-300">
                {filteredAchievements.length}
              </strong>{" "}
              data prestasi
            </p>
            {(selectedCategory !== "Semua Kategori" ||
              selectedLevel !== "Semua Tingkat" ||
              searchQuery.trim() !== "") && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-navy-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-navy-900 dark:text-amber-300"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Atur Ulang Filter</span>
              </button>
            )}
          </div>

          {/* Empty State with Cause and Action (R-27) */}
          {filteredAchievements.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-navy-900">
              <Award className="mx-auto h-10 w-10 text-amber-500" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-extrabold text-navy-900 dark:text-white">
                Tidak Ada Prestasi yang Cocok dengan Filter Anda
              </h2>
              <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                Pencarian untuk kata kunci &ldquo;{searchQuery}&rdquo; pada
                kategori <strong>{selectedCategory}</strong> dan tingkat{" "}
                <strong>{selectedLevel}</strong> belum ditemukan.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-extrabold text-navy-950 hover:bg-amber-400"
              >
                Tampilkan Semua Data Prestasi
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAchievements.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-navy-700 hover:shadow-md dark:border-slate-800 dark:bg-navy-900"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
                      <img
                        src={item.photoSrc}
                        alt={item.title}
                        width={600}
                        height={375}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                        <span className="rounded bg-amber-400 px-2.5 py-1 text-xs font-extrabold text-navy-950 shadow-sm">
                          {item.rank}
                        </span>
                        <span className="rounded bg-navy-950/90 px-2.5 py-1 text-xs font-bold text-white">
                          Tingkat {item.level}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs font-bold text-teal-800 dark:text-teal-300">
                        <span>{item.category}</span>
                        <span className="tabular-nums">Tahun {item.year}</span>
                      </div>
                      <h2 className="mt-2 text-base font-extrabold leading-snug text-navy-900 dark:text-white">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                        <strong>Ajang:</strong> {item.competitionName}
                      </p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        <strong>Penyelenggara:</strong> {item.organizer}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold text-navy-900 dark:border-slate-800 dark:bg-navy-950 dark:text-amber-300">
                    Penerima: {item.winnerName}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
