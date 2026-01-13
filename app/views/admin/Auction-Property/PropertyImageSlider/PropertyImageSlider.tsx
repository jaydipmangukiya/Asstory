/* eslint-disable @next/next/no-img-element */
"use client";

import NoImageFallback from "@/components/common/NoImageFallback";
import Image from "next/image";
import { useState } from "react";

export default function PropertyImageSlider({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return <NoImageFallback />;
  }

  return (
    <div className="w-full max-w-xl">
      <div className="relative w-full rounded-xl overflow-hidden shadow-sm border">
        {/* FIXED ASPECT RATIO → NO STRETCH */}
        <div className="relative aspect-[5/2] w-full overflow-hidden rounded-xl">
          {/* SLIDE IMAGES */}
          <div
            className="whitespace-nowrap transition-transform duration-500 h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img: any, idx) => (
              <div
                key={img.public_id || idx}
                className="inline-block relative w-full h-full"
              >
                <Image
                  src={img.url}
                  alt={`Property ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 640px"
                  priority={idx === currentIndex}
                />
              </div>
            ))}
          </div>

          {/* LEFT BUTTON */}
          {images.length > 1 && (
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 px-2.5 py-1.5 rounded-full shadow-sm backdrop-blur"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
            >
              ‹
            </button>
          )}

          {/* RIGHT BUTTON */}
          {images.length > 1 && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 px-2.5 py-1.5 rounded-full shadow-sm backdrop-blur"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
            >
              ›
            </button>
          )}

          {/* IMAGE COUNTER */}
          <span className="absolute bottom-3 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-lg">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}
