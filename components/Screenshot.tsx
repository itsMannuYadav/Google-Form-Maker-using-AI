import React from "react";
import { SCREENSHOTS, ScreenshotName } from "@/lib/screenshots";

interface ScreenshotProps {
  name: ScreenshotName;
  alt: string;
  caption?: React.ReactNode;
  // browser: desktop window chrome · phone: device frame · card: plain bordered image
  frame?: "browser" | "phone" | "card";
  // Fits the image inside a fixed-ratio panel (e.g. "aspect-[4/3]") so cards line up
  fitAspect?: string;
  priority?: boolean;
  className?: string;
}

export default function Screenshot({
  name,
  alt,
  caption,
  frame = "card",
  fitAspect,
  priority = false,
  className = "",
}: ScreenshotProps) {
  const shot = SCREENSHOTS[name];
  const src = `/screenshots/${name}.webp`;

  const img = (
    <img
      src={src}
      alt={alt}
      width={shot.w}
      height={shot.h}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={
        fitAspect
          ? "h-full w-full object-contain rounded-lg shadow-sm border border-slate-200 bg-white"
          : "block w-full h-auto"
      }
    />
  );

  let framed: React.ReactNode;
  if (fitAspect) {
    framed = (
      <div className={`${fitAspect} w-full rounded-xl bg-slate-100 border border-slate-200 p-3 sm:p-4`}>{img}</div>
    );
  } else if (frame === "browser") {
    framed = (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-3 py-2">
          <div className="flex gap-1.5 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="min-w-0 flex-1 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-slate-500 border border-slate-200">
            gform.mannuyadav.me{shot.path}
          </div>
        </div>
        {img}
      </div>
    );
  } else if (frame === "phone") {
    framed = (
      <div className="mx-auto w-full max-w-[240px] overflow-hidden rounded-[2rem] border-[6px] border-slate-900 bg-slate-900 shadow-xl shadow-slate-900/20">
        <div className="overflow-hidden rounded-[1.5rem] bg-white">{img}</div>
      </div>
    );
  } else {
    framed = (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md shadow-slate-900/5">{img}</div>
    );
  }

  return (
    <figure className={`space-y-2.5 ${className}`}>
      <a href={src} target="_blank" rel="noopener noreferrer" title="Open full-size screenshot" className="block">
        {framed}
      </a>
      {caption && <figcaption className="text-xs text-slate-500 leading-relaxed text-center">{caption}</figcaption>}
    </figure>
  );
}
