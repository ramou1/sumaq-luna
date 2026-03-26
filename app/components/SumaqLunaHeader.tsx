"use client";

import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/app/components/navLinks";

export function SumaqLunaHeader({
  scrolled,
  mobileOpen,
  onToggleMobile,
  onCloseMobile,
  onOpenLogin,
  onOpenRegister,
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onCloseMobile: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-sumaq-gold-dark/40 bg-sumaq-black/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex min-w-0 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:gap-4 md:flex-nowrap md:justify-normal md:px-6 md:py-4">
        <Link
          href="#inicio"
          className="order-1 flex min-w-0 shrink-0 items-center"
          onClick={onCloseMobile}
        >
          <Image
            src="/images/logo-sumaq.png"
            alt="Sumaq Luna"
            width={320}
            height={128}
            className="h-14 w-auto max-w-[min(100%,220px)] object-contain sm:max-w-none sm:h-[4.5rem] md:h-24 lg:h-28 xl:h-32"
            priority
            sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 260px, 300px"
          />
        </Link>

        <nav
          className="font-serif text-sumaq-gold-dark order-3 hidden min-w-0 basis-full md:order-2 md:block md:basis-0 md:flex-1"
          aria-label="Principal"
        >
          <div className="w-full min-w-0">
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3 lg:gap-x-4">
              {navLinks.map(({ href, label }) => (
                <li key={href} className="shrink-0">
                  <a
                    href={href}
                    className="hover:text-sumaq-gold-light inline-block border-b border-transparent pb-0.5 text-[9px] font-medium uppercase tracking-[0.12em] transition-colors hover:border-sumaq-gold-light/50 lg:text-[10px] lg:tracking-[0.16em] xl:text-[11px] xl:tracking-[0.18em]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="order-2 flex min-w-0 shrink-0 items-center justify-end gap-2 sm:gap-2 md:order-3 md:gap-3">
          <button
            type="button"
            onClick={onOpenLogin}
            className="font-serif hidden whitespace-nowrap text-left text-[10px] uppercase tracking-[0.14em] text-sumaq-gold-light/95 underline-offset-4 transition-colors hover:text-sumaq-cream hover:underline md:inline-block lg:text-[11px] lg:tracking-[0.16em]"
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={onOpenRegister}
            className="font-serif whitespace-nowrap rounded-sm border border-sumaq-gold-dark/80 bg-sumaq-wine/95 px-2.5 py-2 text-[9px] font-semibold uppercase leading-tight tracking-[0.1em] text-sumaq-cream shadow-[0_0_20px_rgba(139,0,3,0.25)] transition hover:bg-sumaq-wine hover:shadow-[0_0_28px_rgba(194,167,78,0.15)] sm:px-3 sm:text-[10px] sm:tracking-[0.12em] lg:px-4 lg:text-[11px]"
          >
            Quiero ser embajador
          </button>
          <button
            type="button"
            className="font-serif border border-sumaq-gold-dark/50 px-2 py-2 text-[10px] uppercase tracking-wider text-sumaq-gold-dark md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={onToggleMobile}
          >
            Menú
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="font-serif border-t border-sumaq-gold-dark/30 bg-sumaq-black/98 px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3 text-center text-xs uppercase tracking-[0.2em] text-sumaq-gold-dark">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="py-1 hover:text-sumaq-gold-light"
                onClick={onCloseMobile}
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              className="py-2 text-sumaq-gold-light/90"
              onClick={onOpenLogin}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

