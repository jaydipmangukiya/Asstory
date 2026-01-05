"use client";

import { ImageOff } from "lucide-react";

interface NoImageFallbackProps {
  title?: string;
  subtitle?: string;
  minHeight?: string;
}

const NoImageFallback = ({
  title = "Image Not Available",
  subtitle,
  minHeight = "min-h-[18rem]",
}: NoImageFallbackProps) => {
  return (
    <div
      aria-label="No image available"
      className={`relative w-full ${minHeight} rounded-xl overflow-hidden 
      bg-gradient-to-br from-slate-100 to-slate-200 
      flex items-center justify-center`}
    >
      {/* dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.15] 
        bg-[radial-gradient(circle_at_1px_1px,_#94a3b8_1px,_transparent_0)] 
        bg-[length:20px_20px]"
      />

      {/* content */}
      <div className="relative z-10 text-center px-6">
        <div
          className="mx-auto mb-4 h-16 w-16 rounded-full 
          bg-white/80 flex items-center justify-center shadow"
        >
          <ImageOff className="h-8 w-8 text-slate-500" />
        </div>

        <p className="text-sm font-semibold text-slate-600">{title}</p>

        {subtitle && (
          <p className="mt-1 text-xs text-slate-500 truncate">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default NoImageFallback;
