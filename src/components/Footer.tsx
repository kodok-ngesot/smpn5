import React from "react";
import Link from "next/link";
import { schoolIdentity } from "@/data/school-profile";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-4 border-amber-500 bg-navy-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: School Official Identity (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-amber-400 bg-white p-1">
                <img
                  src="/images/logo-smpn5.jpg"
                  alt="Logo Resmi SMP Negeri 5 Purbalingga"
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-extrabold tracking-tight text-white">
                  {schoolIdentity.name}
                </h2>
                <p className="text-xs font-semibold text-amber-300">
                  NPSN: {schoolIdentity.npsn} • Terakreditasi {schoolIdentity.akreditasi}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Satuan pendidikan jenjang Sekolah Menengah Pertama Negeri di bawah
              naungan Dinas Pendidikan dan Kebudayaan Kabupaten Purbalingga,
              Provinsi Jawa Tengah.
            </p>

            <dl className="mt-5 space-y-2.5 text-sm text-slate-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Alamat Resmi</dt>
                  <dd>{schoolIdentity.address.fullAddress}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Nomor Telepon</dt>
                  <dd>
                    <a
                      href={`tel:${schoolIdentity.contact.phoneClean}`}
                      className="underline decoration-slate-600 underline-offset-4 transition-colors hover:text-amber-300"
                    >
                      {schoolIdentity.contact.phone}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Alamat Email</dt>
                  <dd>
                    <a
                      href={`mailto:${schoolIdentity.contact.email}`}
                      className="underline decoration-slate-600 underline-offset-4 transition-colors hover:text-amber-300"
                    >
                      {schoolIdentity.contact.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Jam Pelayanan</dt>
                  <dd>Pelayanan TU: {schoolIdentity.contact.serviceHours}</dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Column 2: Direct Internal Links (4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Menu Informasi Utama
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1">
              <li>
                <Link
                  href="/profil"
                  className="inline-flex min-h-[36px] items-center text-slate-200 transition-colors hover:text-amber-300"
                >
                  Profil, Visi Misi & Fasilitas
                </Link>
              </li>
              <li>
                <Link
                  href="/akademik"
                  className="inline-flex min-h-[36px] items-center text-slate-200 transition-colors hover:text-amber-300"
                >
                  Kurikulum Merdeka & Ekstrakurikuler
                </Link>
              </li>
              <li>
                <Link
                  href="/prestasi"
                  className="inline-flex min-h-[36px] items-center text-slate-200 transition-colors hover:text-amber-300"
                >
                  Galeri Prestasi & Penghargaan
                </Link>
              </li>
              <li>
                <Link
                  href="/ppdb"
                  className="inline-flex min-h-[36px] items-center font-semibold text-amber-300 transition-colors hover:text-amber-200"
                >
                  Informasi PPDB / SPMB
                </Link>
              </li>
              <li>
                <Link
                  href="/informasi"
                  className="inline-flex min-h-[36px] items-center text-slate-200 transition-colors hover:text-amber-300"
                >
                  Berita & Pusat Unduhan Dokumen
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className="inline-flex min-h-[36px] items-center text-slate-200 transition-colors hover:text-amber-300"
                >
                  Titik Lokasi Maps & Kotak Saran (ULT)
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex min-h-[36px] items-center font-semibold text-emerald-300 transition-colors hover:text-amber-300"
                >
                  Dashboard Admin / Pengelola Sekolah
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Education Portal References (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Pranala Pendidikan Resmi
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://referensi.data.kemdikbud.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-slate-200 transition-colors hover:text-amber-300"
                >
                  <span>Referensi Data Kemendikdasmen</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://dapo.kemdikbud.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-slate-200 transition-colors hover:text-amber-300"
                >
                  <span>Portal Dapodik Nasional</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={schoolIdentity.address.googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-slate-200 transition-colors hover:text-amber-300"
                >
                  <span>Peta Lokasi Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-300 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {schoolIdentity.name} (NPSN{" "}
            {schoolIdentity.npsn}). Hak cipta dilindungi.
          </p>
          <p>
            Kelurahan Bancar, Kecamatan Purbalingga, Kabupaten Purbalingga, Jawa
            Tengah 53316.
          </p>
        </div>
      </div>
    </footer>
  );
}
