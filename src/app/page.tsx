import React from "react";
import Link from "next/link";
import { schoolIdentity, schoolFacilities } from "@/data/school-profile";
import { academicCalendarData } from "@/data/activities";
import { readCmsDb } from "@/lib/cms-storage";
import {
  MapPin,
  Award,
  Calendar,
  FileText,
  Building2,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const cmsDb = readCmsDb();
  const featuredAchievements = cmsDb.achievements.slice(0, 3);
  const recentNews = cmsDb.news.slice(0, 3);
  const upcomingEvents = academicCalendarData.slice(0, 4);
  const highlightedFacilities = schoolFacilities.slice(0, 4);

  return (
    <div>
      {/* 1. Asymmetric Hero Section with Random Image Switching Showcase */}
      <section className="relative border-b-4 border-amber-500 bg-navy-900 py-10 text-white dark:bg-navy-950 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Column: Verified Institutional Identity & Primary Actions */}
            <div className="lg:col-span-6">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                SMP Negeri 5 Purbalingga
              </h1>
              <p className="mt-3 text-base font-semibold text-amber-300 sm:text-lg">
                Berkarakter, Berprestasi, dan Berbudaya Lingkungan di Jantung
                Kabupaten Purbalingga
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
                Satuan pendidikan negeri terakreditasi{" "}
                <strong className="font-bold text-white">
                  {schoolIdentity.akreditasi} (SK No. {schoolIdentity.skAkreditasi})
                </strong>{" "}
                yang berlokasi di {schoolIdentity.address.street}, Kelurahan{" "}
                {schoolIdentity.address.kelurahan}. Melaksanakan{" "}
                {schoolIdentity.kurikulum} untuk membentuk peserta didik yang
                unggul dalam akademik, olahraga, seni, dan budi pekerti.
              </p>

              {/* Verified Fact Strip (No fabricated numbers, only verified Kemendikdasmen attributes) */}
              <dl className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-slate-700/80 bg-navy-950/90 p-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-medium text-slate-300">
                    NPSN Resmi
                  </dt>
                  <dd className="mt-0.5 text-base font-extrabold tabular-nums text-amber-300">
                    {schoolIdentity.npsn}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-slate-300">
                    Peringkat Akreditasi
                  </dt>
                  <dd className="mt-0.5 text-base font-extrabold text-emerald-300">
                    Terakreditasi {schoolIdentity.akreditasi}
                  </dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dt className="text-xs font-medium text-slate-300">
                    Kurikulum Aktif
                  </dt>
                  <dd className="mt-0.5 text-base font-extrabold text-white">
                    {schoolIdentity.kurikulum}
                  </dd>
                </div>
              </dl>

              {/* Specific CTAs (R-15) */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/ppdb"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-amber-500 px-6 py-3 text-sm font-extrabold text-navy-950 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-amber-400 active:translate-y-0"
                >
                  Lihat Panduan & Jalur PPDB
                </Link>
                <Link
                  href="/profil"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg border-2 border-slate-500 bg-navy-950/70 px-5 py-3 text-sm font-bold text-white transition-all duration-150 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-navy-800 active:translate-y-0"
                >
                  Baca Profil & Visi Misi
                </Link>
              </div>
            </div>

            {/* Right Column: Official School Main Gate Photo (Static, No Rolling Image on Home) */}
            <div className="lg:col-span-6">
              <figure className="group relative overflow-hidden rounded-2xl border border-slate-700/80 bg-navy-950 shadow-lg">
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-navy-950">
                  <img
                    src="/images/school/gerbang-utama-smpn5.jpg"
                    alt="Gerbang Utama SMP Negeri 5 Purbalingga di Jl. Letjend S. Parman No. 1 A, Kelurahan Bancar"
                    width={1080}
                    height={742}
                    fetchPriority="high"
                    className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-transparent"
                    aria-hidden="true"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{schoolIdentity.address.street}, Kel. {schoolIdentity.address.kelurahan}, Purbalingga</span>
                  </div>
                  <p className="mt-1 text-base font-extrabold text-white sm:text-lg">
                    Gerbang Utama Kampus SMP Negeri 5 Purbalingga
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Principal's Welcome & Vision Summary (Editorial 2-Column Asymmetric Layout) */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Principal Welcome Card (7 cols) */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-navy-700/40 dark:border-slate-800 dark:bg-navy-900 sm:p-8 lg:col-span-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-amber-500 bg-white p-1.5 shadow-sm">
                  <img
                    src="/images/logo-smpn5.jpg"
                    alt="Logo Resmi SMP Negeri 5 Purbalingga"
                    width={72}
                    height={72}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <span className="inline-block rounded bg-navy-100 px-2.5 py-1 text-xs font-bold text-navy-900 dark:bg-navy-800 dark:text-amber-300">
                    Sambutan Kepala Sekolah
                  </span>
                  <h2 className="mt-1.5 text-2xl font-extrabold text-navy-900 dark:text-white">
                    {schoolIdentity.principalWelcome.name}
                  </h2>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {schoolIdentity.principalWelcome.title}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm font-semibold text-navy-800 dark:text-amber-300">
                {schoolIdentity.principalWelcome.greeting}
              </p>

              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {schoolIdentity.principalWelcome.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                <Link
                  href="/profil"
                  className="inline-flex min-h-[44px] items-center text-sm font-bold text-navy-800 underline decoration-amber-500 decoration-2 underline-offset-4 transition-colors hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-200"
                >
                  Lihat Struktur Pimpinan & Sejarah Sekolah
                </Link>
              </div>
            </div>

            {/* Official Vision & Quick Identity Card (5 cols) */}
            <div className="flex flex-col justify-between rounded-xl border-t-4 border-amber-500 bg-navy-900 p-6 text-white shadow-sm dark:bg-navy-950 sm:p-8 lg:col-span-5">
              <div>
                <h2 className="text-xl font-extrabold text-white">
                  Visi & Identitas Satuan Pendidikan
                </h2>
                <blockquote className="mt-4 rounded-lg border border-slate-700 bg-navy-950/80 p-4 text-sm font-medium italic leading-relaxed text-amber-200">
                  &ldquo;{schoolIdentity.vision}&rdquo;
                </blockquote>

                <h3 className="mt-6 text-xs font-bold uppercase tracking-wider text-amber-300">
                  Fokus Pembinaan Utama
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    <span>
                      Penguatan karakter beriman, bertakwa, dan berakhlak mulia.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    <span>
                      Pembelajaran Kurikulum Merdeka & Projek Profil Pelajar
                      Pancasila (P5).
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    <span>
                      Pembinaan prestasi OSN, O2SN, FLS2N, MAPSI, dan POPDA.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-slate-800 pt-4">
                <Link
                  href="/akademik"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  Pelajari Program Akademik & Ekstrakurikuler
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Achievements Showcase (With Transparent Dummy Badge) */}
      <section className="border-y border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-navy-900/60 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                  <Award className="h-3.5 w-3.5" aria-hidden="true" />
                  Rekam Jejak Kejuaraan
                </span>
                <span className="rounded border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Data Sementara (Siap Diisi Prestasi Asli)
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-navy-900 dark:text-white sm:text-3xl">
                Sorotan Prestasi Siswa & Sekolah
              </h2>
            </div>

            <Link
              href="/prestasi"
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg border border-navy-800 bg-navy-900 px-4 py-2.5 text-sm font-bold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-navy-800 dark:border-amber-400 dark:bg-navy-800"
            >
              Buka Galeri Prestasi Lengkap
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredAchievements.map((item, idx) => (
              <article
                key={item.id}
                className={`group flex flex-col justify-between overflow-hidden rounded-xl border bg-slate-50 transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:bg-navy-950 ${
                  idx === 0
                    ? "border-amber-500/80 ring-1 ring-amber-500/30"
                    : "border-slate-200 hover:border-navy-700 dark:border-slate-800"
                }`}
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900">
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
                      <span className="rounded bg-navy-950/90 px-2.5 py-1 text-xs font-semibold text-white">
                        Tingkat {item.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs font-semibold text-teal-800 dark:text-teal-300">
                      <span>Kategori {item.category}</span>
                      <span className="tabular-nums">Tahun {item.year}</span>
                    </div>
                    <h3 className="mt-2 text-base font-bold leading-snug text-navy-900 group-hover:text-navy-700 dark:text-white dark:group-hover:text-amber-300">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                      {item.competitionName} • {item.organizer}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-navy-900 dark:text-slate-200">
                  Penerima: {item.winnerName}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. News/Activities & Academic Calendar Split Section (7:5 Functional Layout) */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left 7 Cols: Recent School Activities & Announcements */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-navy-900 pb-3 dark:border-amber-400">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                  <h2 className="text-xl font-extrabold text-navy-900 dark:text-white sm:text-2xl">
                    Berita & Kegiatan Sekolah
                  </h2>
                </div>
                <Link
                  href="/informasi"
                  className="inline-flex min-h-[36px] items-center text-sm font-bold text-navy-800 underline decoration-amber-500 underline-offset-4 hover:text-amber-700 dark:text-amber-300"
                >
                  Lihat Semua Berita & Unduhan
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {recentNews.map((news) => (
                  <article
                    key={news.id}
                    className="group flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-700 hover:shadow-sm dark:border-slate-800 dark:bg-navy-900 sm:flex-row"
                  >
                    <div className="aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg bg-navy-950 sm:w-48">
                      <img
                        src={news.photoSrc}
                        alt={news.title}
                        width={320}
                        height={200}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="rounded bg-navy-100 px-2 py-0.5 font-bold text-navy-900 dark:bg-navy-800 dark:text-amber-300">
                            {news.category}
                          </span>
                          <span className="font-medium text-slate-600 dark:text-slate-300">
                            {news.date}
                          </span>
                        </div>
                        <h3 className="mt-1.5 text-base font-bold text-navy-900 group-hover:text-navy-700 dark:text-white dark:group-hover:text-amber-300">
                          <Link href={`/informasi#${news.id}`}>
                            {news.title}
                          </Link>
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                          {news.excerpt}
                        </p>
                      </div>
                      <div className="mt-3">
                        <Link
                          href={`/informasi#${news.id}`}
                          className="inline-flex items-center text-xs font-bold text-teal-800 underline underline-offset-4 hover:text-navy-900 dark:text-teal-300"
                        >
                          Baca rincian kegiatan
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Academic Calendar & Public Documents Quick Access */}
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-teal-800 pb-3 dark:border-teal-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-teal-800 dark:text-teal-300" aria-hidden="true" />
                  <h2 className="text-xl font-extrabold text-navy-900 dark:text-white sm:text-2xl">
                    Agenda & Kalender Akademik
                  </h2>
                </div>
                <Link
                  href="/akademik#kalender-akademik"
                  className="inline-flex min-h-[36px] items-center text-sm font-bold text-teal-800 underline underline-offset-4 hover:text-navy-900 dark:text-teal-300"
                >
                  Kalender Penuh
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {upcomingEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-150 hover:border-teal-700 dark:border-slate-800 dark:bg-navy-900"
                  >
                    <div className="flex h-14 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-navy-900 px-2 text-center text-white dark:bg-navy-950">
                      <span className="text-[11px] font-semibold uppercase text-amber-300">
                        Bulan
                      </span>
                      <span className="text-xs font-extrabold">
                        {ev.monthLabel}
                      </span>
                    </div>
                    <div>
                      <span className="inline-block rounded bg-teal-50 px-2 py-0.5 text-[11px] font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-200">
                        {ev.category} • {ev.dateRange}
                      </span>
                      <h3 className="mt-1 text-sm font-bold text-navy-900 dark:text-white">
                        {ev.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {ev.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Facilities Snapshot & Campus Location Preview */}
      <section className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-navy-900/50 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                Sarana & Lingkungan Belajar
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-navy-900 dark:text-white sm:text-3xl">
                Fasilitas Pendukung & Lokasi Kampus
              </h2>
            </div>
            <Link
              href="/profil#fasilitas"
              className="inline-flex min-h-[44px] items-center text-sm font-bold text-navy-800 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-amber-700 dark:text-amber-300"
            >
              Lihat Seluruh Sarana & Prasarana (7 Fasilitas)
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlightedFacilities.map((fac) => (
              <div
                key={fac.id}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-700 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-navy-950"
              >
                <div>
                  <span className="inline-block rounded bg-navy-100 px-2.5 py-0.5 text-xs font-bold text-navy-900 dark:bg-navy-800 dark:text-amber-300">
                    {fac.category}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-navy-900 dark:text-white">
                    {fac.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {fac.description}
                  </p>
                </div>
                <div className="mt-4 border-t border-slate-200 pt-3 text-xs font-semibold text-emerald-800 dark:border-slate-800 dark:text-emerald-300">
                  Status: {fac.condition}
                </div>
              </div>
            ))}
          </div>

          {/* Direct Map & Contact Callout Bar */}
          <div className="mt-10 rounded-xl border-2 border-navy-900 bg-navy-900 p-6 text-white shadow-sm dark:border-amber-500/60 dark:bg-navy-950 sm:p-8">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="inline-block rounded bg-amber-400 px-2.5 py-1 text-xs font-extrabold text-navy-950">
                  Kunjungan & Layanan Informasi
                </span>
                <h3 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
                  Kunjungi Kampus SMP Negeri 5 Purbalingga
                </h3>
                <p className="mt-2 text-sm text-slate-200">
                  {schoolIdentity.address.fullAddress} • Telepon:{" "}
                  <strong className="text-amber-300">
                    {schoolIdentity.contact.phone}
                  </strong>
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                <Link
                  href="/kontak"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-extrabold text-navy-950 transition-all duration-150 hover:-translate-y-0.5 hover:bg-amber-400"
                >
                  Buka Peta & Kotak Saran
                </Link>
                <a
                  href={schoolIdentity.address.googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-slate-600 bg-navy-800 px-4 py-2.5 text-sm font-bold text-white transition-all duration-150 hover:-translate-y-0.5 hover:border-amber-400"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
