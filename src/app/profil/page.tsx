import React from "react";
import type { Metadata } from "next";
import {
  schoolIdentity,
  schoolLeaders,
  schoolFacilities,
} from "@/data/school-profile";
import { readCmsDb } from "@/lib/cms-storage";
import { RandomImageShowcase } from "@/components/RandomImageShowcase";
import {
  CheckCircle2,
  Building2,
  Users,
  FileCheck2,
  Target,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Profil Sekolah, Visi Misi & Sarana Prasarana",
  description:
    "Identitas resmi SMP Negeri 5 Purbalingga (NPSN 20303136, Akreditasi A), Visi Misi, Jajaran Pimpinan & Struktural, serta Fasilitas Sarana Prasarana Sekolah.",
};

export const dynamic = "force-dynamic";

export default function ProfilPage() {
  const cmsDb = readCmsDb();
  const schoolPhotos = cmsDb.photos;
  return (
    <div>
      {/* Page Header with Identity Motif */}
      <section className="border-b-4 border-amber-500 bg-navy-900 py-10 text-white dark:bg-navy-950 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Tentang Institusi Pendidikan
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Profil Resmi SMP Negeri 5 Purbalingga
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
            Informasi resmi satuan pendidikan berdasarkan basis data Kementerian
            Pendidikan Dasar dan Menengah (NPSN: {schoolIdentity.npsn}), rumusan
            Visi & Misi, jajaran pimpinan struktural, serta kelengkapan sarana
            dan prasarana belajar.
          </p>
        </div>
      </section>

      {/* 1. Official Identity Table & Dynamic Photo Gallery */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* Verified Identity Attributes Table (7 cols) */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900 sm:p-8 lg:col-span-7">
              <div className="flex items-center gap-2.5 border-b border-slate-200 pb-4 dark:border-slate-800">
                <FileCheck2 className="h-6 w-6 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                <h2 className="text-xl font-extrabold text-navy-900 dark:text-white sm:text-2xl">
                  Identitas Resmi Satuan Pendidikan
                </h2>
              </div>

              <dl className="mt-4 divide-y divide-slate-200 text-sm dark:divide-slate-800">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-semibold text-slate-600 dark:text-slate-300">
                    Nama Sekolah
                  </dt>
                  <dd className="font-bold text-navy-900 dark:text-white sm:col-span-2">
                    {schoolIdentity.name}
                  </dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-semibold text-slate-600 dark:text-slate-300">
                    NPSN
                  </dt>
                  <dd className="font-extrabold tabular-nums text-navy-900 dark:text-amber-300 sm:col-span-2">
                    {schoolIdentity.npsn}
                  </dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-semibold text-slate-600 dark:text-slate-300">
                    Jenjang & Status
                  </dt>
                  <dd className="font-semibold text-slate-900 dark:text-slate-100 sm:col-span-2">
                    {schoolIdentity.jenjang} • {schoolIdentity.status}
                  </dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-semibold text-slate-600 dark:text-slate-300">
                    Status Akreditasi
                  </dt>
                  <dd className="sm:col-span-2">
                    <span className="inline-flex items-center rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold text-white">
                      Terakreditasi {schoolIdentity.akreditasi}
                    </span>
                    <span className="ml-2 text-xs text-slate-600 dark:text-slate-300">
                      (SK BAN-S/M No. {schoolIdentity.skAkreditasi})
                    </span>
                  </dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-semibold text-slate-600 dark:text-slate-300">
                    Kepala Sekolah
                  </dt>
                  <dd className="font-bold text-navy-900 dark:text-white sm:col-span-2">
                    {schoolIdentity.kepalaSekolah}
                  </dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-semibold text-slate-600 dark:text-slate-300">
                    Alamat Kampus
                  </dt>
                  <dd className="text-slate-800 dark:text-slate-200 sm:col-span-2">
                    {schoolIdentity.address.fullAddress}
                  </dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-semibold text-slate-600 dark:text-slate-300">
                    Telepon & Email Resmi
                  </dt>
                  <dd className="text-slate-800 dark:text-slate-200 sm:col-span-2">
                    {schoolIdentity.contact.phone} •{" "}
                    {schoolIdentity.contact.email}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Secondary Random Image Switcher for School Profile Photos (5 cols) */}
            <div className="lg:col-span-5">
              <div className="mb-3">
                <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
                  Sorotan Kegiatan & Lingkungan Sekolah
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Dokumentasi kegiatan warga sekolah yang bergulir secara
                  otomatis. Gunakan panah samping atau indikator titik untuk
                  berpindah foto.
                </p>
              </div>
              <RandomImageShowcase
                photos={schoolPhotos}
                intervalMs={5000}
                priorityFirstImage={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision, Mission, and Strategic Goals */}
      <section className="border-y border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-navy-900/50 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Vision & Goals Box (5 cols) */}
            <div className="rounded-xl border-t-4 border-amber-500 bg-navy-900 p-6 text-white shadow-sm dark:bg-navy-950 sm:p-8 lg:col-span-5">
              <div className="flex items-center gap-2 text-amber-300">
                <Compass className="h-5 w-5" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Arah Pendidikan
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-extrabold text-white">
                Visi Sekolah
              </h2>
              <blockquote className="mt-4 rounded-lg border border-slate-700 bg-navy-950 p-5 text-base font-semibold leading-relaxed text-amber-200">
                &ldquo;{schoolIdentity.vision}&rdquo;
              </blockquote>

              <div className="mt-8 border-t border-slate-800 pt-6">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Target className="h-5 w-5" aria-hidden="true" />
                  <h3 className="text-base font-extrabold text-white">
                    Tujuan Satuan Pendidikan
                  </h3>
                </div>
                <ul className="mt-3 space-y-2.5 text-sm text-slate-200">
                  {schoolIdentity.goals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Numbered Missions List (7 cols) */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-navy-900 sm:p-8 lg:col-span-7">
              <h2 className="text-2xl font-extrabold text-navy-900 dark:text-white">
                Misi SMP Negeri 5 Purbalingga
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Langkah strategis dalam mewujudkan visi pendidikan dan karakter
                peserta didik:
              </p>

              <ol className="mt-6 space-y-4">
                {schoolIdentity.missions.map((mission, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-150 hover:border-navy-700 dark:border-slate-800 dark:bg-navy-950"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-sm font-extrabold tabular-nums text-amber-300">
                      0{index + 1}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                      {mission}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Leadership & Structural Directory (Kepala Sekolah, Wakil, Ka. TU) */}
      <section id="pimpinan" className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-navy-800 dark:text-amber-300">
                  Tata Kelola & Organisasi
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-extrabold text-navy-900 dark:text-white sm:text-3xl">
                Jajaran Pimpinan & Struktural Sekolah
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Menampilkan Kepala Sekolah terverifikasi beserta struktur Wakil
              Kepala Sekolah & Ka. TU.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {schoolLeaders.map((leader) => (
              <div
                key={leader.id}
                className={`flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
                  leader.isVerified
                    ? "border-amber-500 bg-navy-900 text-white dark:bg-navy-950"
                    : "border-slate-200 bg-white text-slate-900 hover:border-navy-700 dark:border-slate-800 dark:bg-navy-900 dark:text-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded px-2.5 py-0.5 text-xs font-bold ${
                        leader.isVerified
                          ? "bg-amber-400 text-navy-950"
                          : "bg-navy-100 text-navy-900 dark:bg-navy-800 dark:text-amber-300"
                      }`}
                    >
                      {leader.role}
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        leader.isVerified
                          ? "text-emerald-300"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {leader.nipStatus}
                    </span>
                  </div>

                  <h3
                    className={`mt-3 text-lg font-extrabold ${
                      leader.isVerified
                        ? "text-white"
                        : "text-navy-900 dark:text-white"
                    }`}
                  >
                    {leader.name}
                  </h3>
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${
                      leader.isVerified
                        ? "text-slate-200"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {leader.field}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Complete School Facilities & Infrastructure */}
      <section
        id="fasilitas"
        className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-navy-900/50 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-teal-800 dark:text-teal-300" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
              Lingkungan Belajar
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-extrabold text-navy-900 dark:text-white sm:text-3xl">
            Sarana & Prasarana SMPN 5 Purbalingga
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {schoolFacilities.map((fac) => (
              <div
                key={fac.id}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all duration-200 hover:-translate-y-1 hover:border-navy-700 hover:shadow-md dark:border-slate-800 dark:bg-navy-950"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900">
                    <img
                      src={fac.photoSrc}
                      alt={fac.name}
                      width={600}
                      height={375}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-3 top-3 rounded bg-navy-950/90 px-2.5 py-1 text-xs font-bold text-amber-300">
                      {fac.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-navy-900 dark:text-white">
                      {fac.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {fac.description}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-200 bg-white px-5 py-3 text-xs font-bold text-emerald-800 dark:border-slate-800 dark:bg-navy-900 dark:text-emerald-300">
                  Kondisi: {fac.condition}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
