"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/img-kit01.jpeg",
    alt: "Kit de informacoes para cadastro de embaixador 1",
  },
  {
    src: "/images/img-kit02.jpeg",
    alt: "Kit de informacoes para cadastro de embaixador 2",
  },
];

export function EmbassadorInfoSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel border border-sumaq-gold-dark/40 p-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-sumaq-gold-dark/30 bg-sumaq-black/50">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={activeIndex !== index}
          >
            <button
              type="button"
              className="h-full w-full cursor-zoom-in"
              onClick={() => setFullscreenIndex(index)}
              aria-label={`Abrir ${slide.alt} em tela cheia`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={`${slide.src}-bullet`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full border border-sumaq-gold-dark transition ${
              activeIndex === index ? "bg-sumaq-gold-dark" : "bg-transparent"
            }`}
            aria-label={`Mostrar slide ${index + 1}`}
          />
        ))}
      </div>
      {fullscreenIndex !== null ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-sumaq-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Visualizacao ampliada"
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-[1] rounded border border-sumaq-gold-dark px-3 py-1 text-xs uppercase tracking-[0.12em] text-sumaq-gold-light"
            onClick={() => setFullscreenIndex(null)}
          >
            Cerrar
          </button>
          <div className="relative h-full w-full max-w-5xl">
            <Image
              src={slides[fullscreenIndex].src}
              alt={slides[fullscreenIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
