"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { schoolIdentity } from "@/data/school-profile";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Sun,
  Moon,
  FileCheck2,
  Award,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil Sekolah" },
  { href: "/akademik", label: "Akademik & Kesiswaan" },
  { href: "/prestasi", label: "Prestasi" },
  { href: "/informasi", label: "Berita & Unduhan" },
  { href: "/kontak", label: "Kontak & Layanan" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("smpn5-theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("smpn5-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("smpn5-theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-navy-950/95">
      {/* 1. Top Institutional Bar: Symmetrical 3-Part Grid (Left Identity | Center Address | Right Contact) */}
      <div className="border-b border-amber-500/30 bg-navy-900 text-xs text-slate-100 dark:bg-navy-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-2 px-4 py-2 sm:px-6 md:grid-cols-12 lg:px-8">
          {/* Left: Official Credentials Pill Group */}
          <div className="flex items-center justify-center gap-2.5 md:col-span-4 md:justify-start">
            <span className="inline-flex h-6 items-center gap-1.5 rounded-md border border-amber-400/30 bg-navy-950/80 px-2.5 font-bold tabular-nums text-amber-300">
              <FileCheck2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>NPSN {schoolIdentity.npsn}</span>
            </span>
            <span className="inline-flex h-6 items-center gap-1 rounded-md bg-emerald-800 px-2.5 font-bold text-white">
              <Award className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden="true" />
              <span>Terakreditasi {schoolIdentity.akreditasi}</span>
            </span>
          </div>

          {/* Center: Balanced Location Tag */}
          <div className="hidden items-center justify-center text-center text-slate-200 lg:col-span-4 lg:flex">
            <span className="inline-flex items-center gap-1.5 truncate font-medium">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
              <span>
                {schoolIdentity.address.street}, {schoolIdentity.address.kelurahan}, Purbalingga
              </span>
            </span>
          </div>

          {/* Right: Direct Official Contact Links with Unified Divider */}
          <div className="hidden items-center justify-end gap-3 md:col-span-8 md:flex lg:col-span-4">
            <a
              href={`tel:${schoolIdentity.contact.phoneClean}`}
              className="inline-flex h-6 items-center gap-1.5 rounded-md px-2 font-semibold tabular-nums text-slate-100 transition-colors hover:bg-navy-800 hover:text-amber-300"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
              <span>{schoolIdentity.contact.phone}</span>
            </a>
            <span className="h-3.5 w-px bg-slate-700" aria-hidden="true" />
            <a
              href={`mailto:${schoolIdentity.contact.email}`}
              className="inline-flex h-6 items-center gap-1.5 rounded-md px-2 font-medium text-slate-100 transition-colors hover:bg-navy-800 hover:text-amber-300"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
              <span>{schoolIdentity.contact.email}</span>
            </a>
            <span className="h-3.5 w-px bg-slate-700" aria-hidden="true" />
            <Link
              href="/admin"
              className="inline-flex h-6 items-center gap-1 rounded-md border border-slate-700 bg-navy-950/80 px-2.5 font-bold text-amber-300 transition-colors hover:border-amber-400 hover:bg-navy-800"
            >
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Portal Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Taskbar: Symmetrical 3-Zone Layout (Left Brand | Center Framed Nav | Right Action Group) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[74px] items-center justify-between gap-4">
          {/* Left Zone: Official School Logo & Title */}
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-xl py-1 pr-2 focus:outline-none"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-navy-900/15 bg-white p-1 shadow-sm transition-transform duration-200 group-hover:scale-105 dark:border-amber-400/60">
                <img
                  src="/images/logo-smpn5.jpg"
                  alt="Logo Resmi SMP Negeri 5 Purbalingga"
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-base font-extrabold leading-none tracking-tight text-navy-900 dark:text-white sm:text-[17px]">
                  SMPN 5 PURBALINGGA
                </span>
                <span className="mt-1 text-[11px] font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  KABUPATEN PURBALINGGA
                </span>
              </div>
            </Link>
          </div>

          {/* Center Zone: Harmonious Framed Navigation Bar */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden items-center justify-center xl:flex"
          >
            <div className="flex items-center gap-1 rounded-xl border border-slate-200/90 bg-slate-100/80 p-1.5 shadow-inner dark:border-slate-800 dark:bg-navy-900/90">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg px-3.5 text-[13px] font-bold transition-all duration-150 ${
                      isActive
                        ? "bg-navy-900 text-amber-300 shadow-sm dark:bg-amber-400 dark:text-navy-950"
                        : "text-slate-700 hover:bg-white hover:text-navy-900 dark:text-slate-200 dark:hover:bg-navy-800 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Zone: Unified Action Control Dock (Same 42px height, radius, and border rhythm) */}
          <div className="flex shrink-0 items-center justify-end gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDark ? "Aktifkan tampilan terang" : "Aktifkan tampilan gelap"
              }
              aria-pressed={isDark}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-slate-50 text-slate-800 transition-all duration-150 hover:-translate-y-0.5 hover:border-navy-700 hover:bg-white dark:border-slate-700 dark:bg-navy-900 dark:text-slate-100 dark:hover:border-amber-400"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5 text-navy-900" aria-hidden="true" />
              )}
            </button>

            <Link
              href="/ppdb"
              className={`hidden h-11 items-center justify-center whitespace-nowrap rounded-xl px-4 text-[13px] font-extrabold transition-all duration-150 sm:inline-flex ${
                pathname === "/ppdb"
                  ? "bg-navy-900 text-amber-300 ring-2 ring-amber-400"
                  : "bg-amber-500 text-navy-950 shadow-sm hover:-translate-y-0.5 hover:bg-amber-400 active:translate-y-0"
              }`}
            >
              Portal PPDB / SPMB
            </Link>

            {/* Mobile & Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-panel"
              aria-label={
                mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
              }
              className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-xs font-extrabold text-navy-900 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-navy-900 dark:text-white xl:hidden"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="h-5 w-5" aria-hidden="true" />
                  <span>Tutup</span>
                </>
              ) : (
                <>
                  <Menu className="h-5 w-5" aria-hidden="true" />
                  <span>Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-panel"
          aria-label="Navigasi Mobile"
          className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg dark:border-slate-800 dark:bg-navy-950 xl:hidden"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-1.5 sm:grid-cols-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-navy-900 text-amber-300"
                      : "border border-slate-200/70 bg-slate-50/70 text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-navy-900/60 dark:text-slate-100 dark:hover:bg-navy-900"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="rounded bg-amber-400 px-2 py-0.5 text-xs font-extrabold text-navy-950">
                      Aktif
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/ppdb"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 flex min-h-[48px] items-center justify-center rounded-xl bg-amber-500 px-4 py-3 text-center text-sm font-extrabold text-navy-950 shadow-sm hover:bg-amber-400 sm:col-span-2"
            >
              Buka Portal PPDB / SPMB
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-center text-xs font-extrabold text-navy-900 hover:bg-slate-200 dark:border-slate-800 dark:bg-navy-900 dark:text-amber-300 sm:col-span-2"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>Dashboard Admin Pengelola</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
