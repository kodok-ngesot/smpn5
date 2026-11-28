import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsapp } from "@/components/FloatingWhatsapp";

export const metadata: Metadata = {
  title: {
    default: "SMP Negeri 5 Purbalingga | Portal Profil & Informasi Resmi",
    template: "%s | SMP Negeri 5 Purbalingga",
  },
  description:
    "Website profil resmi SMP Negeri 5 Purbalingga (NPSN: 20303136, Terakreditasi A). Jl. Letjend S. Parman No. 1 A, Kel. Bancar, Kab. Purbalingga, Jawa Tengah. Informasi Profil, Akademik, Prestasi, dan PPDB / SPMB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-slate-50 font-sans text-slate-900 antialiased selection:bg-amber-400 selection:text-navy-950 dark:bg-slate-950 dark:text-slate-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-amber-400 focus:px-4 focus:py-2.5 focus:text-sm focus:font-extrabold focus:text-navy-950 focus:shadow-lg"
        >
          Lewati ke konten utama
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
