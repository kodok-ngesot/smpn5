"use client";

import React, { useState, useEffect } from "react";
import { activitiesNewsData, ActivityNewsItem } from "@/data/activities";
import { publicDocumentsData } from "@/data/ppdb-and-docs";
import { schoolPhotos, SchoolPhoto } from "@/data/school-photos";
import { RandomImageShowcase } from "@/components/RandomImageShowcase";
import { FileText, Download, Newspaper, Camera, MapPin } from "lucide-react";

const newsCategories = [
  "Semua Kategori",
  "Kegiatan Sekolah",
  "Pengumuman",
  "Akademik",
  "Kesiswaan",
] as const;

const photoCategories = [
  "Semua Dokumentasi",
  "Gelar Karya P5 & Kewirausahaan",
  "Upacara & Kepemimpinan OSIS",
  "Ramadhan Festive & Sosial",
  "Seni Budaya & Literasi",
  "Olahraga & Kesiswaan",
  "Kegiatan Guru & DWP",
] as const;

export default function InformasiPage() {
  const [liveNews, setLiveNews] =
    useState<ActivityNewsItem[]>(activitiesNewsData);
  const [livePhotos, setLivePhotos] = useState<SchoolPhoto[]>(schoolPhotos);
  const [selectedNewsCat, setSelectedNewsCat] =
    useState<(typeof newsCategories)[number]>("Semua Kategori");
  const [selectedPhotoCat, setSelectedPhotoCat] =
    useState<(typeof photoCategories)[number]>("Semua Dokumentasi");
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>(
    activitiesNewsData[0].id
  );

  useEffect(() => {
    fetch("/api/cms", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (Array.isArray(data.news)) setLiveNews(data.news);
          if (Array.isArray(data.photos)) setLivePhotos(data.photos);
        }
      })
      .catch(() => {});
  }, []);

  const filteredNews = liveNews.filter((item) =>
    selectedNewsCat === "Semua Kategori"
      ? true
      : item.category === selectedNewsCat
  );

  const filteredPhotos = livePhotos.filter((photo) =>
    selectedPhotoCat === "Semua Dokumentasi"
      ? true
      : photo.category === selectedPhotoCat
  );

  return (
    <div>
      {/* Page Header */}
      <section className="border-b-4 border-amber-500 bg-navy-900 py-10 text-white dark:bg-navy-950 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Publikasi & Arsip Publik
            </span>
            <span className="rounded border border-amber-400/50 bg-navy-950 px-2.5 py-0.5 text-xs font-semibold text-amber-200">
              Berita Kegiatan Sementara (Siap Diisi Source Kegiatan Asli)
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Berita Kegiatan, Pengumuman & Unduhan Dokumen
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
            Pusat informasi kegiatan warga sekolah, pengumuman akademik, serta
            unduhan berkas publik resmi SMP Negeri 5 Purbalingga.
          </p>
        </div>
      </section>

      {/* 1. News & School Activities Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-navy-800 dark:text-amber-300">
                  Jurnal Sekolah
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-extrabold text-navy-900 dark:text-white sm:text-3xl">
                Warta Kegiatan & Pengumuman
              </h2>
            </div>

            <div
              className="flex flex-wrap gap-1.5"
              role="group"
              aria-label="Filter kategori berita"
            >
              {newsCategories.map((cat) => {
                const active = selectedNewsCat === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedNewsCat(cat)}
                    aria-pressed={active}
                    className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-bold transition-all duration-150 ${
                      active
                        ? "bg-navy-900 text-amber-300 shadow-sm dark:bg-amber-400 dark:text-navy-950"
                        : "border border-slate-300 bg-white text-slate-800 hover:border-navy-700 dark:border-slate-700 dark:bg-navy-900 dark:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredNews.length === 0 ? (
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-navy-900">
              <p className="text-sm font-bold text-navy-900 dark:text-white">
                Belum ada berita pada kategori {selectedNewsCat}.
              </p>
              <button
                type="button"
                onClick={() => setSelectedNewsCat("Semua Kategori")}
                className="mt-3 inline-flex min-h-[40px] items-center rounded-lg bg-navy-900 px-4 py-2 text-xs font-bold text-white"
              >
                Tampilkan Semua Berita
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredNews.map((news) => {
                const isExpanded = expandedNewsId === news.id;
                return (
                  <article
                    key={news.id}
                    id={news.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-700 hover:shadow-md dark:border-slate-800 dark:bg-navy-900"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
                        <img
                          src={news.photoSrc}
                          alt={news.title}
                          width={640}
                          height={400}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                        <span className="absolute left-3 top-3 rounded bg-amber-400 px-2.5 py-1 text-xs font-extrabold text-navy-950">
                          {news.category}
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <span>{news.date}</span>
                          <span>Oleh: {news.author}</span>
                        </div>
                        <h3 className="mt-2 text-lg font-extrabold leading-snug text-navy-900 dark:text-white">
                          {news.title}
                        </h3>
                        <p className="mt-2.5 text-xs leading-relaxed text-slate-700 dark:text-slate-200 sm:text-sm">
                          {news.excerpt}
                        </p>

                        {isExpanded && (
                          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-navy-950 dark:text-slate-200 sm:text-sm">
                            {news.content}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 dark:border-slate-800 dark:bg-navy-950">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedNewsId(isExpanded ? null : news.id)
                        }
                        aria-expanded={isExpanded}
                        className="inline-flex min-h-[36px] items-center text-xs font-extrabold text-navy-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-amber-700 dark:text-amber-300"
                      >
                        {isExpanded
                          ? "Tutup Rincian Berita"
                          : "Baca Selengkapnya"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 2. Complete Photo Gallery of All 25 Real School Activities */}
      <section
        id="galeri-foto"
        className="border-t border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-navy-950 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-navy-800 dark:text-amber-300">
                  Dokumentasi Kegiatan Asli ({schoolPhotos.length} Foto)
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-extrabold text-navy-900 dark:text-white sm:text-3xl">
                Galeri Foto Kegiatan SMPN 5 Purbalingga
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                Dokumentasi kegiatan P5 Kewirausahaan, Upacara & LDK OSIS,
                Ramadhan Festive UPZ, Seni Budaya, Olahraga, dan Dharma Wanita.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-1.5"
              role="group"
              aria-label="Filter kategori dokumentasi foto"
            >
              {photoCategories.map((cat) => {
                const active = selectedPhotoCat === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedPhotoCat(cat)}
                    aria-pressed={active}
                    className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-150 ${
                      active
                        ? "bg-navy-900 text-amber-300 shadow-sm dark:bg-amber-400 dark:text-navy-950"
                        : "border border-slate-300 bg-white text-slate-800 hover:border-navy-700 dark:border-slate-700 dark:bg-navy-900 dark:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Natural Editorial Rolling Image Carousel (MSN Style without Like buttons) */}
          <div className="mt-8">
            <RandomImageShowcase
              photos={filteredPhotos}
              intervalMs={5000}
              priorityFirstImage={false}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPhotos.map((photo, index) => (
              <figure
                key={photo.id}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-navy-700 hover:shadow-md dark:border-slate-800 dark:bg-navy-900"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
                    <img
                      src={photo.src}
                      alt={`${photo.title} - ${photo.caption}`}
                      width={600}
                      height={375}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded bg-navy-950/90 px-2.5 py-1 text-[11px] font-bold text-amber-300">
                      {photo.category}
                    </span>
                    <span className="absolute right-3 top-3 rounded bg-amber-400 px-2 py-0.5 text-[11px] font-extrabold tabular-nums text-navy-950">
                      #{index + 1}
                    </span>
                  </div>
                  <figcaption className="p-5">
                    <h3 className="text-base font-extrabold leading-snug text-navy-900 dark:text-white">
                      {photo.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {photo.caption}
                    </p>
                  </figcaption>
                </div>
                <div className="flex items-center gap-1.5 border-t border-slate-100 bg-slate-50 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-navy-950 dark:text-slate-300">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
                  <span>{photo.locationLabel}</span>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Public Documents Download Table */}
      <section
        id="unduhan"
        className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-navy-900/50 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-teal-800 dark:text-teal-300" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
              Dokumen Publik
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-extrabold text-navy-900 dark:text-white sm:text-3xl">
            Pusat Unduhan Berkas Resmi
          </h2>
          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
            Unduh berkas informasi profil sekolah, daftar periksa PPDB, pedoman
            tata tertib siswa, dan rangkuman kalender akademik.
          </p>

          <div className="mt-8 space-y-4">
            {publicDocumentsData.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all duration-150 hover:border-navy-700 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-navy-950 sm:flex-row sm:items-center"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded bg-navy-900 px-2.5 py-0.5 font-bold text-amber-300">
                      {doc.category}
                    </span>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      Diperbarui: {doc.updatedAt} • Ukuran: {doc.fileSize}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-navy-900 dark:text-white">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {doc.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <a
                    href={doc.downloadHref}
                    download
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 text-xs font-extrabold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-navy-800 dark:bg-amber-500 dark:text-navy-950 dark:hover:bg-amber-400"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span>Unduh Dokumen</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
