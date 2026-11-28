"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SchoolPhoto } from "@/data/school-photos";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RandomImageShowcaseProps {
  photos: SchoolPhoto[];
  intervalMs?: number;
  priorityFirstImage?: boolean;
  className?: string;
}

export function RandomImageShowcase({
  photos,
  intervalMs = 5000,
  priorityFirstImage = false,
  className = "",
}: RandomImageShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const goToIndex = useCallback(
    (targetIndex: number) => {
      if (photos.length <= 1) return;
      const nextIdx = (targetIndex + photos.length) % photos.length;

      if (reducedMotion) {
        setCurrentIndex(nextIdx);
        return;
      }

      setIsTransitioning(true);
      window.setTimeout(() => {
        setCurrentIndex(nextIdx);
        setIsTransitioning(false);
      }, 180);
    },
    [photos.length, reducedMotion]
  );

  const pickRandomNext = useCallback(() => {
    if (photos.length <= 1) return;
    let next = currentIndex;
    while (next === currentIndex) {
      next = Math.floor(Math.random() * photos.length);
    }
    goToIndex(next);
  }, [currentIndex, photos.length, goToIndex]);

  useEffect(() => {
    if (isHovered || reducedMotion || photos.length <= 1) return;

    const timer = window.setInterval(() => {
      pickRandomNext();
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [isHovered, reducedMotion, photos.length, intervalMs, pickRandomNext]);

  if (!photos || photos.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-100 p-8 text-center text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        Belum ada foto sekolah yang terdaftar di galeri.
      </div>
    );
  }

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-navy-950 shadow-md ${className}`}
    >
      {/* Full-bleed Editorial Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
        <img
          src={currentPhoto.src}
          alt={`${currentPhoto.title} - ${currentPhoto.caption}`}
          width={1200}
          height={750}
          fetchPriority={priorityFirstImage ? "high" : "auto"}
          className={`h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] ${
            isTransitioning ? "opacity-50" : "opacity-100"
          }`}
        />

        {/* Deep Dark Gradient Scrim at Bottom for High-Contrast Editorial Headline & Dots */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-transparent"
          aria-hidden="true"
        />

        {/* Left & Right Mid-Edge Translucent Navigation Chevrons (MSN Editorial Style) */}
        <button
          type="button"
          onClick={() => goToIndex(currentIndex - 1)}
          aria-label="Foto sebelumnya"
          className="absolute left-0 top-1/2 z-20 flex h-12 w-9 -translate-y-1/2 items-center justify-center rounded-r-lg bg-navy-950/65 text-white backdrop-blur-sm transition-all duration-150 hover:w-10 hover:bg-navy-950/90"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => goToIndex(currentIndex + 1)}
          aria-label="Foto berikutnya"
          className="absolute right-0 top-1/2 z-20 flex h-12 w-9 -translate-y-1/2 items-center justify-center rounded-l-lg bg-navy-950/65 text-white backdrop-blur-sm transition-all duration-150 hover:w-10 hover:bg-navy-950/90"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Bottom Editorial Overlay: Source Pill + Bold Title + Caption + Centered Pagination Dots */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-4 sm:p-5">
          {/* Source / Category Line */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <img
              src="/images/logo-smpn5.jpg"
              alt=""
              width={18}
              height={18}
              className="h-4 w-4 rounded-full bg-white object-contain p-0.5"
            />
            <span className="text-amber-300">{currentPhoto.category}</span>
            <span aria-hidden="true">•</span>
            <span className="truncate text-slate-200">
              {currentPhoto.locationLabel}
            </span>
          </div>

          {/* Editorial Headline & Caption */}
          <h3 className="mt-1.5 text-base font-extrabold leading-snug text-white sm:text-lg">
            {currentPhoto.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-200">
            {currentPhoto.caption}
          </p>

          {/* Bottom Centered Capsule Dot Pagination Bar (No Like Buttons) */}
          <div className="mt-3.5 flex items-center justify-center">
            <div
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-950/85 px-3 py-1.5 backdrop-blur-sm"
              role="tablist"
              aria-label="Indikator slide foto kegiatan"
            >
              {photos.map((photo, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Tampilkan foto ${idx + 1}: ${photo.title}`}
                    onClick={() => goToIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-6 bg-white"
                        : "w-2 bg-slate-400/60 hover:bg-slate-200"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
