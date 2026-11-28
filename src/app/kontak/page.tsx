"use client";

import React, { useState } from "react";
import { schoolIdentity } from "@/data/school-profile";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function KontakPage() {
  const [fullName, setFullName] = useState("");
  const [senderRole, setSenderRole] = useState("Orang Tua / Wali Murid");
  const [contactNumber, setContactNumber] = useState("");
  const [topicCategory, setTopicCategory] = useState(
    "Informasi PPDB / Pendaftaran"
  );
  const [messageText, setMessageText] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      fullName.trim().length < 3 ||
      contactNumber.trim().length < 8 ||
      messageText.trim().length < 10
    ) {
      setStatus("error");
      setErrorMessage(
        "Mohon lengkapi Nama Lengkap (minimal 3 karakter), Nomor Telepon/WhatsApp aktif, dan Isi Pesan/Saran (minimal 10 karakter) sebelum mengirim."
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity: "ult_public",
          fullName,
          senderRole,
          contactNumber,
          topicCategory,
          messageText,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setStatus("error");
        setErrorMessage(
          data.error || "Gagal mengirim pesan ke server layanan."
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Terjadi kendala jaringan saat mengirim pesan ULT.");
    }
  };

  const resetForm = () => {
    setFullName("");
    setContactNumber("");
    setMessageText("");
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div>
      {/* Page Header */}
      <section className="border-b-4 border-amber-500 bg-navy-900 py-10 text-white dark:bg-navy-950 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Hubungi Kami & Unit Layanan Terpadu
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Kontak, Titik Lokasi Maps & Kotak Saran (ULT)
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
            Saluran komunikasi resmi, peta lokasi kampus di Jl. Letjend S.
            Parman No. 1 A, Kelurahan Bancar, serta formulir layanan informasi
            dan pengaduan masyarakat SMP Negeri 5 Purbalingga.
          </p>
        </div>
      </section>

      {/* Main Content: Contact Details, Map & ULT Form */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left 5 Cols: Official Contact Attributes & Google Maps Embed */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
                <h2 className="text-xl font-extrabold text-navy-900 dark:text-white">
                  Alamat & Saluran Resmi
                </h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        Alamat Kampus
                      </dt>
                      <dd className="mt-0.5 font-semibold text-navy-900 dark:text-white">
                        {schoolIdentity.address.fullAddress}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        Telepon Kantor TU
                      </dt>
                      <dd className="mt-0.5 font-bold text-navy-900 dark:text-amber-300">
                        <a
                          href={`tel:${schoolIdentity.contact.phoneClean}`}
                          className="underline decoration-amber-500 underline-offset-4"
                        >
                          {schoolIdentity.contact.phone}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        Surat Elektronik (Email)
                      </dt>
                      <dd className="mt-0.5 font-semibold text-navy-900 dark:text-white">
                        <a
                          href={`mailto:${schoolIdentity.contact.email}`}
                          className="underline decoration-amber-500 underline-offset-4"
                        >
                          {schoolIdentity.contact.email}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-navy-900 dark:text-amber-400" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        Jam Pelayanan Tata Usaha
                      </dt>
                      <dd className="mt-0.5 font-semibold text-navy-900 dark:text-white">
                        {schoolIdentity.contact.serviceHours}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              {/* Google Maps Frame with Explicit Width, Height & Aspect Ratio (R-40) */}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-navy-900">
                <div className="border-b border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-extrabold text-navy-900 dark:text-white">
                      Titik Peta Lokasi Sekolah
                    </h2>
                    <a
                      href={schoolIdentity.address.googleMapsDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[36px] items-center gap-1 text-xs font-extrabold text-navy-900 underline decoration-amber-500 underline-offset-4 dark:text-amber-300"
                    >
                      <span>Buka Petunjuk Arah</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className="aspect-[16/11] w-full bg-slate-200 dark:bg-navy-950">
                  <iframe
                    title="Peta Lokasi SMP Negeri 5 Purbalingga di Jl. Letjend S. Parman No. 1 A Bancar"
                    src={schoolIdentity.address.googleMapsEmbedUrl}
                    width="600"
                    height="412"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Interactive Kotak Saran & Unit Layanan Terpadu (ULT) Form */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900 sm:p-8">
                <span className="inline-block rounded bg-navy-100 px-2.5 py-1 text-xs font-bold text-navy-900 dark:bg-navy-800 dark:text-amber-300">
                  Unit Layanan Terpadu (ULT) & Aspirasi Publik
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-navy-900 dark:text-white">
                  Formulir Kotak Saran & Permohonan Informasi
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                  Sampaikan pertanyaan, permohonan informasi PPDB, saran
                  kemajuan sekolah, atau pengaduan layanan melalui formulir di
                  bawah ini.
                </p>

                {/* Error State Alert with Icon & Text (Not Color Alone - R-27, R-39) */}
                {status === "error" && (
                  <div
                    role="alert"
                    className="mt-5 flex items-start gap-3 rounded-lg border-2 border-red-600 bg-red-50 p-4 text-xs font-semibold text-red-900 dark:bg-red-950/70 dark:text-red-100 sm:text-sm"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-700 dark:text-red-300" aria-hidden="true" />
                    <div>
                      <p className="font-extrabold">
                        Formulir Belum Dapat Dikirim
                      </p>
                      <p className="mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Success State Feedback (R-26, R-27) */}
                {status === "success" ? (
                  <div
                    role="status"
                    className="mt-6 rounded-xl border-2 border-emerald-700 bg-emerald-50 p-6 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-6 w-6 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                      <h3 className="text-lg font-extrabold">
                        Pesan & Aspirasi Anda Telah Tercatat
                      </h3>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed sm:text-sm">
                      Terima kasih, <strong>{fullName}</strong> ({senderRole}).
                      Pesan Anda pada kategori{" "}
                      <strong>{topicCategory}</strong> telah diterima oleh
                      sistem layanan informasi SMPN 5 Purbalingga. Untuk
                      tanggapan cepat via WhatsApp, Anda juga dapat meneruskan
                      pesan ini langsung ke petugas Humas kami.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={`https://wa.me/6281227005136?text=${encodeURIComponent(
                          `Halo Humas SMPN 5 Purbalingga, saya ${fullName} (${senderRole}) ingin menyampaikan ${topicCategory}: ${messageText}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-emerald-800"
                      >
                        Teruskan ke WhatsApp Humas
                      </a>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-emerald-800 bg-white px-4 py-2.5 text-xs font-bold text-emerald-950 hover:bg-emerald-100 dark:bg-navy-900 dark:text-white"
                      >
                        Kirim Pesan Lainnya
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="ult-fullname"
                          className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                        >
                          Nama Lengkap Pengirim <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="ult-fullname"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ketik nama lengkap Anda"
                          className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-navy-800 focus:bg-white dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="ult-role"
                          className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                        >
                          Status / Peran Pengirim
                        </label>
                        <select
                          id="ult-role"
                          value={senderRole}
                          onChange={(e) => setSenderRole(e.target.value)}
                          className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-navy-800 focus:bg-white dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                        >
                          <option value="Orang Tua / Wali Murid">
                            Orang Tua / Wali Murid
                          </option>
                          <option value="Calon Peserta Didik Baru">
                            Calon Peserta Didik Baru
                          </option>
                          <option value="Siswa / Alumni">Siswa / Alumni</option>
                          <option value="Masyarakat Umum / Instansi">
                            Masyarakat Umum / Instansi
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="ult-phone"
                          className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                        >
                          Nomor Telepon / WhatsApp Aktif{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="ult-phone"
                          type="tel"
                          required
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          placeholder="Masukkan nomor WhatsApp aktif"
                          className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-navy-800 focus:bg-white dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="ult-category"
                          className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                        >
                          Kategori Layanan
                        </label>
                        <select
                          id="ult-category"
                          value={topicCategory}
                          onChange={(e) => setTopicCategory(e.target.value)}
                          className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-navy-800 focus:bg-white dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                        >
                          <option value="Informasi PPDB / Pendaftaran">
                            Informasi PPDB / Pendaftaran
                          </option>
                          <option value="Layanan Administrasi & Legalisir TU">
                            Layanan Administrasi & Legalisir TU
                          </option>
                          <option value="Saran & Masukan Fasilitas Sekolah">
                            Saran & Masukan Fasilitas Sekolah
                          </option>
                          <option value="Pengaduan Masyarakat / Layanan">
                            Pengaduan Masyarakat / Layanan
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="ult-message"
                        className="block text-xs font-bold text-slate-800 dark:text-slate-200"
                      >
                        Uraian Pertanyaan, Saran, atau Pengaduan{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="ult-message"
                        rows={4}
                        required
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Tuliskan pertanyaan, saran, atau keperluan Anda secara jelas di sini..."
                        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 p-3.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-navy-800 focus:bg-white dark:border-slate-700 dark:bg-navy-950 dark:text-white"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Kolom bertanda <span className="text-red-600">*</span>{" "}
                        wajib diisi.
                      </p>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-extrabold text-navy-950 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-amber-400 disabled:opacity-60"
                      >
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>
                          {status === "submitting"
                            ? "Mengirim Pesan..."
                            : "Kirim Pesan Layanan"}
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
