"use client";

import React, { useState } from "react";
import {
  ppdbOverview,
  ppdbTracks,
  ppdbSteps,
  ppdbRequirements,
  ppdbFaqs,
} from "@/data/ppdb-and-docs";
import { schoolIdentity } from "@/data/school-profile";
import {
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  Phone,
  MapPin,
  Download,
} from "lucide-react";

export default function PpdbPage() {
  const [selectedTrackId, setSelectedTrackId] = useState(ppdbTracks[0].id);

  return (
    <div>
      {/* Page Header */}
      <section className="border-b-4 border-amber-500 bg-navy-900 py-10 text-white dark:bg-navy-950 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-amber-400 px-2.5 py-0.5 text-xs font-extrabold text-navy-950">
              {ppdbOverview.statusLabel}
            </span>
            <span className="text-xs font-bold text-amber-300">
              {ppdbOverview.academicYear}
            </span>
          </div>
          <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Portal Informasi PPDB / SPMB SMPN 5 Purbalingga
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
            Panduan jalur seleksi, alur tahapan pendaftaran, daftar kelengkapan
            berkas, dan tanya jawab resmi bagi calon peserta didik baru SMP
            Negeri 5 Purbalingga.
          </p>
        </div>
      </section>

      {/* 1. Interactive 4 Tracks Selection (Zonasi, Afirmasi, Prestasi, Mutasi) */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-800 dark:text-amber-300">
              Jalur Seleksi Resmi
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-navy-900 dark:text-white sm:text-3xl">
              4 Jalur Pendaftaran PPDB / SPMB
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {ppdbOverview.note}
            </p>
          </div>

          {/* Interactive Track Tabs */}
          <div
            className="mt-6 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Pilih jalur pendaftaran PPDB"
          >
            {ppdbTracks.map((track) => {
              const isSelected = track.id === selectedTrackId;
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedTrackId(track.id)}
                  className={`min-h-[44px] rounded-lg px-4 py-2.5 text-xs font-extrabold transition-all duration-150 sm:text-sm ${
                    isSelected
                      ? "bg-navy-900 text-amber-300 shadow-sm dark:bg-amber-400 dark:text-navy-950"
                      : "border border-slate-300 bg-white text-slate-800 hover:border-navy-700 dark:border-slate-700 dark:bg-navy-900 dark:text-slate-200"
                  }`}
                >
                  {track.name}
                </button>
              );
            })}
          </div>

          {/* All 4 Tracks Grid with Selected Highlight */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {ppdbTracks.map((track) => {
              const isHighlighted = track.id === selectedTrackId;
              return (
                <div
                  key={track.id}
                  className={`rounded-xl border p-6 transition-all duration-200 ${
                    isHighlighted
                      ? "border-2 border-amber-500 bg-white shadow-md dark:bg-navy-900"
                      : "border-slate-200 bg-slate-50/80 hover:border-navy-700 dark:border-slate-800 dark:bg-navy-950"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-extrabold text-navy-900 dark:text-white">
                      {track.name}
                    </h3>
                    <span className="rounded bg-navy-100 px-2.5 py-1 text-xs font-bold text-navy-900 dark:bg-navy-800 dark:text-amber-300">
                      {track.quotaBadge}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                    {track.description}
                  </p>
                  <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                    <p className="text-xs font-bold text-navy-900 dark:text-amber-300">
                      Ketentuan Khusus Jalur:
                    </p>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                      {track.keyCriteria.map((crit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                          <span>{crit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. 5-Step Registration Workflow & Required Documents Checklist */}
      <section className="border-y border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-navy-900/50 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* 5 Steps Timeline (7 cols) */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                Tahapan Seleksi
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-navy-900 dark:text-white">
                5 Langkah Alur Pendaftaran PPDB
              </h2>

              <ol className="mt-6 space-y-4">
                {ppdbSteps.map((step) => (
                  <li
                    key={step.stepNumber}
                    className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all duration-150 hover:border-navy-700 dark:border-slate-800 dark:bg-navy-950"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-base font-extrabold tabular-nums text-amber-300">
                      {step.stepNumber}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-teal-800 dark:text-teal-300">
                        {step.scheduleNote}
                      </span>
                      <h3 className="text-base font-extrabold text-navy-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Required Documents Checklist & Download Guide (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border-t-4 border-amber-500 bg-navy-900 p-6 text-white shadow-sm dark:bg-navy-950 sm:p-8">
                <div className="flex items-center gap-2 text-amber-300">
                  <FileCheck2 className="h-5 w-5" aria-hidden="true" />
                  <h2 className="text-xl font-extrabold text-white">
                    Syarat & Kelengkapan Berkas
                  </h2>
                </div>
                <p className="mt-2 text-xs text-slate-200">
                  Siapkan dokumen asli beserta salinan fotokopi berikut sebelum
                  melakukan pendaftaran:
                </p>

                <ul className="mt-5 space-y-3 text-xs leading-relaxed text-slate-100 sm:text-sm">
                  {ppdbRequirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-slate-800 pt-5">
                  <a
                    href="/documents/panduan-berkas-ppdb-smpn5.txt"
                    download
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-extrabold text-navy-950 transition-all duration-150 hover:-translate-y-0.5 hover:bg-amber-400 sm:text-sm"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span>Unduh Lembar Checklist Berkas PPDB</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Specific PPDB FAQ & Committee Secretariat Contact */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Native Accessible Details/Summary Accordion for PPDB FAQ (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                <h2 className="text-2xl font-extrabold text-navy-900 dark:text-white">
                  Tanya Jawab Seputar PPDB SMPN 5 Purbalingga
                </h2>
              </div>

              <div className="mt-6 space-y-3">
                {ppdbFaqs.map((faq, idx) => (
                  <details
                    key={idx}
                    open={idx === 0}
                    className="group rounded-xl border border-slate-200 bg-white p-5 transition-colors open:border-navy-700 dark:border-slate-800 dark:bg-navy-900"
                  >
                    <summary className="flex min-h-[36px] items-center justify-between gap-3 text-sm font-extrabold text-navy-900 dark:text-white">
                      <span>{faq.question}</span>
                      <span className="shrink-0 rounded bg-navy-100 px-2 py-0.5 text-xs font-bold text-navy-900 group-open:bg-amber-400 group-open:text-navy-950 dark:bg-navy-800 dark:text-amber-300">
                        Detail
                      </span>
                    </summary>
                    <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:text-slate-200 sm:text-sm">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Committee Contact Box (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900 sm:p-8">
                <span className="inline-block rounded bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                  Posko Layanan & Helpdesk
                </span>
                <h2 className="mt-2 text-xl font-extrabold text-navy-900 dark:text-white">
                  Sekretariat Panitia PPDB
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Bagi orang tua/wali murid yang membutuhkan pendampingan
                  verifikasi berkas atau konsultasi jalur pendaftaran, silakan
                  menghubungi posko resmi kami:
                </p>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        Lokasi Posko PPDB
                      </dt>
                      <dd className="font-semibold text-navy-900 dark:text-white">
                        {schoolIdentity.address.fullAddress}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        Telepon Sekolah
                      </dt>
                      <dd className="font-bold text-navy-900 dark:text-amber-300">
                        <a href={`tel:${schoolIdentity.contact.phoneClean}`}>
                          {schoolIdentity.contact.phone}
                        </a>
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-6 flex flex-col gap-2.5">
                  <a
                    href={schoolIdentity.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-extrabold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-emerald-600 sm:text-sm"
                  >
                    Tanya Panitia PPDB via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
