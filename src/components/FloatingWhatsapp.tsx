import React from "react";
import { schoolIdentity } from "@/data/school-profile";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsapp() {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href={schoolIdentity.contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi Hotline Humas dan Informasi PPDB SMPN 5 Purbalingga via WhatsApp"
        className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full border-2 border-white bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-800 active:translate-y-0 dark:border-slate-800"
      >
        <MessageCircle className="h-5 w-5 shrink-0 text-amber-300 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
        <span className="hidden sm:inline">Chat Humas / PPDB</span>
      </a>
    </div>
  );
}
