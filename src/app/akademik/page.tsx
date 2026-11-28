"use client";

import React, { useState } from "react";
import {
  academicCalendarData,
  extracurricularData,
} from "@/data/activities";
import { BookOpen, Calendar, Users, Clock, CheckCircle2 } from "lucide-react";

const semesterFilters = [
  "Semua Semester",
  "Semester Ganjil",
  "Semester Genap",
] as const;

const ekskulCategories = [
  "Semua Kategori",
  "Kepemimpinan & Karakter",
  "Olahraga",
  "Seni & Budaya",
  "Sains & Literasi",
] as const;

export default function AkademikPage() {
  const [selectedSemester, setSelectedSemester] =
    useState<(typeof semesterFilters)[number]>("Semua Semester");
  const [selectedEkskulCategory, setSelectedEkskulCategory] =
    useState<(typeof ekskulCategories)[number]>("Semua Kategori");

  const filteredCalendar = academicCalendarData.filter((item) =>
    selectedSemester === "Semua Semester"
      ? true
      : item.semester === selectedSemester
  );

  const filteredEkskul = extracurricularData.filter((item) =>
    selectedEkskulCategory === "Semua Kategori"
      ? true
      : item.category === selectedEkskulCategory
  );

  return (
    <div>
      {/* Page Header */}
      <section className="border-b-4 border-amber-500 bg-navy-900 py-10 text-white dark:bg-navy-950 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Kurikulum & Pembinaan Siswa
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Akademik, Kesiswaan & Kalender Pendidikan
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
            Implementasi Kurikulum Merdeka, Projek Penguatan Profil Pelajar
            Pancasila (P5), pembinaan minat bakat melalui ekstrakurikuler, serta
            agenda akademik tahunan di SMP Negeri 5 Purbalingga.
          </p>
        </div>
      </section>

      {/* 1. Kurikulum Merdeka & Jam Belajar Overview */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900 sm:p-8 lg:col-span-7">
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-6 w-6 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                <h2 className="text-2xl font-extrabold text-navy-900 dark:text-white">
                  Implementasi Kurikulum Merdeka
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                SMP Negeri 5 Purbalingga menyelenggarakan pembelajaran berbasis
                Kurikulum Merdeka yang memadukan kegiatan intrakurikuler,
                kokurikuler melalui Projek Penguatan Profil Pelajar Pancasila
                (P5), serta kegiatan ekstrakurikuler sesuai minat peserta didik.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-navy-950">
                  <h3 className="text-sm font-extrabold text-navy-900 dark:text-amber-300">
                    Pembelajaran Intrakurikuler
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    Mata pelajaran wajib jenjang SMP (Pendidikan Agama,
                    Pancasila, Bahasa Indonesia, Matematika, IPA, IPS, Bahasa
                    Inggris, PJOK, Informatika, Seni Budaya, dan Muatan Lokal
                    Bahasa Jawa).
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-navy-950">
                  <h3 className="text-sm font-extrabold text-navy-900 dark:text-amber-300">
                    Projek Profil Pelajar Pancasila (P5)
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    Pembelajaran lintas disiplin ilmu yang mengangkat tema gaya
                    hidup berkelanjutan, kearifan lokal Kabupaten Purbalingga,
                    kewirausahaan, dan suara demokrasi.
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Learning Culture & Schedule Card */}
            <div className="rounded-xl border-t-4 border-amber-500 bg-navy-900 p-6 text-white shadow-sm dark:bg-navy-950 sm:p-8 lg:col-span-5">
              <div className="flex items-center gap-2 text-amber-300">
                <Clock className="h-5 w-5" aria-hidden="true" />
                <h2 className="text-lg font-extrabold text-white">
                  Budaya & Pembiasaan Harian Siswa
                </h2>
              </div>
              <ul className="mt-5 space-y-3.5 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  <span>
                    <strong>5S & Apel Pagi (06.45 - 07.00 WIB):</strong>{" "}
                    Penyambutan siswa di gerbang utama dengan budaya Senyum,
                    Salam, Sapa, Sopan, Santun.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  <span>
                    <strong>Literasi & Doa Pagi (07.00 - 07.15 WIB):</strong>{" "}
                    Membaca buku non-pelajaran dan pembiasaan karakter sebelum
                    jam pertama.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  <span>
                    <strong>Ibadah Berjamaah:</strong> Pembiasaan salat Zuhur
                    berjamaah di Mushola sekolah dan pembinaan akhlak.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  <span>
                    <strong>Jumat Bersih / Sehat / Karakter:</strong> Senam
                    bersama, kerja bakti lingkungan sekolah, atau pembinaan
                    wali kelas setiap Jumat pagi.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Extracurricular Programs with Category Filter */}
      <section className="border-y border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-navy-900/50 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-800 dark:text-teal-300" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                  Pengembangan Bakat & Minat
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-extrabold text-navy-900 dark:text-white sm:text-3xl">
                Ekstrakurikuler Kesiswaan
              </h2>
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter kategori ekstrakurikuler"
            >
              {ekskulCategories.map((cat) => {
                const active = selectedEkskulCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedEkskulCategory(cat)}
                    aria-pressed={active}
                    className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-bold transition-all duration-150 ${
                      active
                        ? "bg-navy-900 text-amber-300 shadow-sm dark:bg-amber-400 dark:text-navy-950"
                        : "border border-slate-300 bg-slate-50 text-slate-800 hover:border-navy-700 hover:bg-white dark:border-slate-700 dark:bg-navy-900 dark:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredEkskul.length === 0 ? (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-navy-950">
              <p className="text-sm font-bold text-navy-900 dark:text-white">
                Tidak ada ekstrakurikuler pada kategori ini.
              </p>
              <button
                type="button"
                onClick={() => setSelectedEkskulCategory("Semua Kategori")}
                className="mt-3 inline-flex min-h-[40px] items-center rounded-lg bg-navy-900 px-4 py-2 text-xs font-bold text-white"
              >
                Tampilkan Semua Ekstrakurikuler
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEkskul.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-700 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-navy-950"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded px-2.5 py-0.5 text-xs font-extrabold ${
                          item.type === "Wajib"
                            ? "bg-amber-400 text-navy-950"
                            : "bg-navy-100 text-navy-900 dark:bg-navy-800 dark:text-amber-300"
                        }`}
                      >
                        Ekskul {item.type}
                      </span>
                      <span className="text-xs font-semibold text-teal-800 dark:text-teal-300">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-extrabold text-navy-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-slate-200 pt-3 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300">
                    Jadwal Latihan: {item.schedule}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Academic Calendar & Agenda with Semester Filter */}
      <section id="kalender-akademik" className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Calendar className="h-5 w-5 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-navy-800 dark:text-amber-300">
                  Agenda Pendidikan
                </span>
                <span className="rounded border border-slate-300 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Data Sementara (Siap Diperbarui)
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-extrabold text-navy-900 dark:text-white sm:text-3xl">
                Kalender Akademik & Kegiatan Tahunan
              </h2>
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter semester kalender akademik"
            >
              {semesterFilters.map((sem) => {
                const active = selectedSemester === sem;
                return (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => setSelectedSemester(sem)}
                    aria-pressed={active}
                    className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-bold transition-all duration-150 ${
                      active
                        ? "bg-navy-900 text-amber-300 shadow-sm dark:bg-amber-400 dark:text-navy-950"
                        : "border border-slate-300 bg-white text-slate-800 hover:border-navy-700 dark:border-slate-700 dark:bg-navy-900 dark:text-slate-200"
                    }`}
                  >
                    {sem}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {filteredCalendar.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-150 hover:border-navy-700 hover:shadow-sm dark:border-slate-800 dark:bg-navy-900 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-navy-900 text-center text-white dark:bg-navy-950">
                    <span className="text-[11px] font-semibold text-amber-300">
                      Bulan
                    </span>
                    <span className="text-xs font-extrabold">
                      {item.monthLabel}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded bg-navy-100 px-2 py-0.5 font-bold text-navy-900 dark:bg-navy-800 dark:text-amber-300">
                        {item.semester}
                      </span>
                      <span className="rounded bg-teal-50 px-2 py-0.5 font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-200">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-base font-extrabold text-navy-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 border-t border-slate-100 pt-2 text-xs font-bold text-slate-700 dark:border-slate-800 dark:text-amber-300 sm:border-t-0 sm:pt-0 sm:text-right">
                  Estimasi Waktu:
                  <span className="block text-sm font-extrabold text-navy-900 dark:text-white">
                    {item.dateRange}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
