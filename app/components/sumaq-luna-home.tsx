"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#vision", label: "Visión" },
  { href: "#cultura", label: "Cultura" },
  { href: "#esencia", label: "Esencia" },
  { href: "#regiones", label: "Regiones" },
  { href: "#legado", label: "Legado" },
  { href: "#enoturismo", label: "Enoturismo" },
  { href: "#registro", label: "Registro" },
] as const;

function Diamond() {
  return (
    <span className="text-sumaq-gold-dark inline-block scale-75" aria-hidden>
      ◆
    </span>
  );
}

function IconUtensils({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden
    >
      <path d="M8 3v9a4 4 0 008 0V3M8 3H6a2 2 0 000 4h2M16 3h2a2 2 0 010 4h-2M12 21v-6" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 000 18M12 3a15 15 0 010 18" />
    </svg>
  );
}

function IconGlass({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden
    >
      <path d="M8 21h8M9 3h6l-1 14H10L9 3z" />
    </svg>
  );
}

export function SumaqLunaHome() {
  const [scrolled, setScrolled] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <div className="relative min-h-screen bg-sumaq-black text-sumaq-cream">
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
            onClick={closeMobile}
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
              onClick={() => {
                setLoginOpen(true);
                setMobileOpen(false);
              }}
              className="font-serif hidden whitespace-nowrap text-left text-[10px] uppercase tracking-[0.14em] text-sumaq-gold-light/95 underline-offset-4 transition-colors hover:text-sumaq-cream hover:underline md:inline-block lg:text-[11px] lg:tracking-[0.16em]"
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setRegisterOpen(true);
                setMobileOpen(false);
              }}
              className="font-serif whitespace-nowrap rounded-sm border border-sumaq-gold-dark/80 bg-sumaq-wine/95 px-2.5 py-2 text-[9px] font-semibold uppercase leading-tight tracking-[0.1em] text-sumaq-cream shadow-[0_0_20px_rgba(139,0,3,0.25)] transition hover:bg-sumaq-wine hover:shadow-[0_0_28px_rgba(194,167,78,0.15)] sm:px-3 sm:text-[10px] sm:tracking-[0.12em] lg:px-4 lg:text-[11px]"
            >
              Quiero ser embajador
            </button>
            <button
              type="button"
              className="font-serif border border-sumaq-gold-dark/50 px-2 py-2 text-[10px] uppercase tracking-wider text-sumaq-gold-dark md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
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
                  onClick={closeMobile}
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                className="py-2 text-sumaq-gold-light/90"
                onClick={() => {
                  setLoginOpen(true);
                  setMobileOpen(false);
                }}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        {/* Hero */}
        <section
          id="inicio"
          className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24 md:pt-28 lg:pt-32"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2000&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover object-center opacity-55"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-sumaq-black via-sumaq-black/80 to-sumaq-black" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <div className="mx-auto mb-8 max-w-lg rounded-[50%] border-2 border-sumaq-gold-dark/90 px-8 py-10 shadow-[0_0_60px_rgba(159,120,25,0.12)] sm:px-12 sm:py-14">
              <p
                className="mb-3 text-2xl text-sumaq-cream/95 sm:text-3xl md:text-4xl"
                style={{ fontFamily: "var(--font-great-vibes), cursive" }}
              >
                Alma andina, espíritu global
              </p>
              <h1 className="font-serif text-3xl font-semibold uppercase tracking-[0.28em] text-sumaq-cream sm:text-4xl md:text-5xl">
                Sumaq Luna
              </h1>
              <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-sumaq-gold-light to-transparent" />
              <p className="mt-6 text-lg leading-relaxed text-sumaq-cream/85 md:text-xl">
                Proyecto de marca premium de pisco: terroir, herencia inca y
                excelencia artesanal.
              </p>
            </div>
            <a
              href="#registro"
              className="font-serif inline-block border border-sumaq-gold-dark bg-sumaq-wine/90 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-sumaq-cream transition hover:border-sumaq-gold-light hover:bg-sumaq-wine"
            >
              Únete al legado
            </a>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-2 md:px-8">
          <div className="frame-double rounded-sm p-4 md:p-8">
            {/* Visión */}
            <section
              id="vision"
              className="scroll-mt-36 lg:scroll-mt-44 border-b border-sumaq-gold-dark/25 py-16 md:py-24"
            >
              <div className="mb-2 flex items-center justify-center gap-3 text-sumaq-gold-dark">
                <span className="text-lg opacity-80" aria-hidden>
                  ❋
                </span>
              </div>
              <h2 className="font-serif text-center text-xl font-semibold uppercase tracking-[0.25em] text-sumaq-gold-dark md:text-2xl">
                Visión del proyecto
              </h2>
              <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-sumaq-cream/90">
                <strong className="text-sumaq-gold-light">Sumaq Luna</strong>{" "}
                nace como una marca que conecta tres fuerzas:
              </p>
              <ul className="mx-auto mt-8 max-w-xl space-y-3 text-lg text-sumaq-cream/90">
                <li className="flex gap-3">
                  <Diamond />
                  <span>Historia milenaria del Perú</span>
                </li>
                <li className="flex gap-3">
                  <Diamond />
                  <span>Cultura gastronómica latinoamericana</span>
                </li>
                <li className="flex gap-3">
                  <Diamond />
                  <span>Crecimiento global de bebidas premium artesanales</span>
                </li>
              </ul>
              <p className="mx-auto mt-10 max-w-2xl text-center text-lg leading-relaxed text-sumaq-cream/88">
                El proyecto busca posicionar al pisco como símbolo cultural
                global, tal como sucedió con el tequila mexicano, el whisky
                escocés o el sake japonés.
              </p>
              <div className="mt-10 glass-panel mx-auto max-w-2xl border-l-4 border-sumaq-wine px-6 py-5">
                <p className="font-serif text-sm uppercase tracking-[0.2em] text-sumaq-gold-dark">
                  Pilares de desarrollo
                </p>
                <ul className="mt-4 space-y-2 text-sumaq-cream/90">
                  <li className="flex gap-2">
                    <Diamond /> Herencia inca
                  </li>
                  <li className="flex gap-2">
                    <Diamond /> Producción artesanal premium
                  </li>
                  <li className="flex gap-2">
                    <Diamond /> Expansión cultural y gastronómica internacional
                  </li>
                </ul>
              </div>
              <p className="mt-10 text-center font-serif text-sm uppercase tracking-[0.18em] text-sumaq-gold-light">
                Objetivo: crear una marca latinoamericana icónica de spirits
                premium.
              </p>
            </section>

            {/* Cultura — tres tarjetas */}
            <section
              id="cultura"
              className="scroll-mt-36 lg:scroll-mt-44 border-b border-sumaq-gold-dark/25 py-16 md:py-24"
            >
              <h2 className="font-serif text-center text-xl font-semibold uppercase tracking-[0.22em] text-sumaq-gold-dark md:text-2xl">
                Perú como potencia cultural y gastronómica
              </h2>
              <div className="mx-auto mt-4 h-px max-w-xs bg-gradient-to-r from-transparent via-sumaq-gold-dark/60 to-transparent" />
              <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-sumaq-cream/88">
                Perú es hoy uno de los centros gastronómicos más influyentes
                del mundo, y el pisco es parte central de esta identidad
                cultural.
              </p>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "Capital culinaria",
                    body: "Lima es considerada la capital gastronómica de América Latina, con restaurantes peruanos posicionados entre los mejores del mundo.",
                    Icon: IconUtensils,
                  },
                  {
                    title: "Identidad y exportación",
                    body: "La bebida representa tradición agrícola, profunda identidad nacional y una poderosa herramienta de exportación cultural.",
                    Icon: IconGlobe,
                  },
                  {
                    title: "Consumo y cultura",
                    body: "Más de 14 millones de Pisco Sour se consumen cada año solo en Perú, demostrando el poder cultural del producto.",
                    Icon: IconGlass,
                  },
                ].map(({ title, body, Icon }) => (
                  <article
                    key={title}
                    className="glass-panel flex flex-col border border-sumaq-gold-dark/45 p-6"
                  >
                    <Icon className="text-sumaq-gold-light" />
                    <h3 className="font-serif mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-sumaq-gold-dark">
                      {title}
                    </h3>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-sumaq-cream/85">
                      {body}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Esencia Pacha */}
            <section
              id="esencia"
              className="scroll-mt-36 lg:scroll-mt-44 border-b border-sumaq-gold-dark/25 py-16 md:py-24"
            >
              <h2 className="font-serif text-center text-xl font-semibold uppercase tracking-[0.2em] text-sumaq-gold-dark md:text-2xl">
                Los incas y el legado del terroir
              </h2>
              <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-sumaq-cream/88">
                El concepto <strong className="text-sumaq-gold-light">PACHA</strong>{" "}
                representa la cosmovisión andina:
              </p>
              <ul className="mx-auto mt-6 max-w-lg space-y-2 text-lg text-sumaq-cream/90">
                <li className="flex gap-3">
                  <Diamond />
                  <span>
                    <strong className="text-sumaq-gold-dark">Pachamama</strong>{" "}
                    (Madre Tierra)
                  </span>
                </li>
                <li className="flex gap-3">
                  <Diamond />
                  <span>Agricultura ancestral</span>
                </li>
                <li className="flex gap-3">
                  <Diamond />
                  <span>Conexión espiritual con el territorio</span>
                </li>
              </ul>
              <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-sumaq-cream/85">
                <strong className="text-sumaq-gold-light">Sumaq Luna</strong>{" "}
                transforma este legado ancestral en una marca global.
              </p>
            </section>

            {/* Regiones D.O. */}
            <section
              id="regiones"
              className="scroll-mt-36 lg:scroll-mt-44 border-b border-sumaq-gold-dark/25 py-16 md:py-24"
            >
              <h2 className="font-serif text-center text-xl font-semibold uppercase tracking-[0.2em] text-sumaq-gold-dark md:text-2xl">
                Regiones históricas (D.O.)
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-center text-sumaq-cream/85">
                Producido en regiones que garantizan autenticidad:
              </p>
              <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 text-lg text-sumaq-cream/90">
                {["Ica", "Lima", "Arequipa", "Moquegua", "Tacna"].map((r) => (
                  <li key={r} className="flex items-center gap-2">
                    <Diamond />
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            {/* Legado */}
            <section
              id="legado"
              className="scroll-mt-36 lg:scroll-mt-44 border-b border-sumaq-gold-dark/25 py-16 md:py-24"
            >
              <h2 className="font-serif text-center text-xl font-semibold uppercase tracking-[0.22em] text-sumaq-gold-dark md:text-2xl">
                El poder de un legado
              </h2>
              <p className="mx-auto mt-10 max-w-2xl text-center text-lg leading-relaxed text-sumaq-cream/88">
                <strong className="text-sumaq-gold-light">Sumaq Luna</strong> no
                es solo una bebida. Es una historia que comienza en los Andes,
                con siglos de cultura, y continúa llevando el espíritu del Perú
                al mundo. Cada botella representa: el terroir andino, la sangre
                latina, el orgullo cultural de un pueblo.
              </p>
              <p className="font-serif mx-auto mt-10 max-w-3xl text-center text-sm font-semibold uppercase leading-relaxed tracking-[0.12em] text-sumaq-gold-dark md:text-base">
                Una marca que no vende alcohol. Vende historia, identidad y
                legado.
              </p>
              <blockquote className="glass-panel relative mx-auto mt-12 max-w-2xl rounded-md border border-sumaq-gold-dark/50 px-8 py-10">
                <span
                  className="absolute left-4 top-2 font-serif text-5xl leading-none text-sumaq-wine/90"
                  aria-hidden
                >
                  “
                </span>
                <p className="font-serif relative z-[1] text-center text-sm font-semibold uppercase leading-relaxed tracking-[0.14em] text-sumaq-gold-light md:text-base">
                  Una botella que honra el pasado, celebra el presente y
                  construye el futuro.
                </p>
                <span
                  className="absolute bottom-2 right-4 font-serif text-5xl leading-none text-sumaq-wine/90"
                  aria-hidden
                >
                  ”
                </span>
                <footer
                  className="mt-6 text-center text-lg text-sumaq-cream/80"
                  style={{ fontFamily: "var(--font-great-vibes), cursive" }}
                >
                  — Sumaq Luna
                </footer>
              </blockquote>
            </section>

            {/* Enoturismo */}
            <section
              id="enoturismo"
              className="scroll-mt-36 lg:scroll-mt-44 border-b border-sumaq-gold-dark/25 py-16 md:py-24"
            >
              <div className="grid items-center gap-12 md:grid-cols-2">
                <div>
                  <h2 className="font-serif text-xl font-semibold uppercase tracking-[0.2em] text-sumaq-gold-dark md:text-2xl">
                    Región productora y enoturismo
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-sumaq-cream/88">
                    Las regiones productoras poseen un enorme potencial
                    turístico, especialmente el Valle de Ica y la región
                    interior de Lima.
                  </p>
                  <p className="font-serif mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-sumaq-gold-light">
                    El proyecto promoverá:
                  </p>
                  <ul className="mt-4 space-y-2 text-sumaq-cream/90">
                    {[
                      "Rutas de pisco exclusivas",
                      "Turismo gastronómico inmersivo",
                      "Festivales culturales andinos",
                      "Promoción del arte local",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <Diamond />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="font-serif mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-sumaq-gold-dark">
                    Impacto esperado
                  </p>
                  <p className="mt-3 text-lg leading-relaxed text-sumaq-cream/85">
                    Crecimiento del comercio regional, profunda valorización
                    cultural y la creación de experiencias de marca
                    inolvidables.
                  </p>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-sumaq-gold-dark/50">
                  <Image
                    src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop"
                    alt="Brindis con cócteles"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sumaq-black/70 to-transparent" />
                </div>
              </div>
            </section>

            {/* Registro */}
            <section id="registro" className="scroll-mt-36 lg:scroll-mt-44 py-16 md:py-24">
              <h2 className="font-serif text-center text-xl font-semibold uppercase tracking-[0.22em] text-sumaq-gold-dark md:text-2xl">
                Hermandad Sumaq Luna
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-sumaq-cream/80">
                Regístrate como embajador o mecenas y sé parte de la expansión
                de una marca icónica.
              </p>
              <form
                className="glass-panel mx-auto mt-10 max-w-md space-y-4 border border-sumaq-gold-dark/40 p-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Gracias. Nos pondremos en contacto pronto.");
                }}
              >
                <div>
                  <label htmlFor="nombre" className="sr-only">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    required
                    placeholder="Nombre completo"
                    className="input-sumaq"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="sr-only">
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    required
                    placeholder="Teléfono"
                    className="input-sumaq"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Correo electrónico"
                    className="input-sumaq"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="pais" className="sr-only">
                    País
                  </label>
                  <input
                    id="pais"
                    name="pais"
                    required
                    placeholder="País"
                    className="input-sumaq"
                    autoComplete="country-name"
                  />
                </div>
                <button
                  type="submit"
                  className="font-serif w-full border border-sumaq-gold-dark bg-sumaq-wine py-3 text-xs font-semibold uppercase tracking-[0.2em] text-sumaq-cream transition hover:bg-[#a00004] hover:shadow-[0_0_24px_rgba(194,167,78,0.12)]"
                >
                  Enviar solicitud
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-sumaq-gold-dark/30 py-10 text-center text-sm text-sumaq-cream/55">
        <p className="font-serif uppercase tracking-[0.2em] text-sumaq-gold-dark/80">
          Sumaq Luna
        </p>
        <p className="mt-2">© {new Date().getFullYear()} Todos los derechos reservados.</p>
      </footer>

      {/* Modal registro */}
      {registerOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-sumaq-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="register-title"
        >
          <div className="frame-double relative max-h-[90vh] w-full max-w-md overflow-y-auto border border-sumaq-gold-dark/30 bg-sumaq-black/95 p-6 shadow-2xl md:p-8">
            <button
              type="button"
              className="absolute right-4 top-4 text-sumaq-gold-dark hover:text-sumaq-cream"
              onClick={() => setRegisterOpen(false)}
              aria-label="Cerrar"
            >
              ✕
            </button>
            <h2
              id="register-title"
              className="font-serif pr-8 text-lg font-semibold uppercase tracking-[0.18em] text-sumaq-gold-dark"
            >
              Quiero ser embajador
            </h2>
            <p className="mt-2 text-sumaq-cream/75">
              Completa tus datos para unirte a la hermandad Sumaq Luna.
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setRegisterOpen(false);
                alert("Gracias por tu interés. Te contactaremos pronto.");
              }}
            >
              <input
                name="nombre"
                required
                placeholder="Nombre completo"
                className="input-sumaq"
                autoComplete="name"
              />
              <input
                name="telefono"
                type="tel"
                required
                placeholder="Teléfono"
                className="input-sumaq"
                autoComplete="tel"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Correo electrónico"
                className="input-sumaq"
                autoComplete="email"
              />
              <input
                name="pais"
                required
                placeholder="País"
                className="input-sumaq"
                autoComplete="country-name"
              />
              <button
                type="submit"
                className="font-serif w-full border border-sumaq-gold-dark bg-sumaq-wine py-3 text-xs font-semibold uppercase tracking-[0.18em] text-sumaq-cream transition hover:bg-[#a00004]"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {/* Modal login (front-end only) */}
      {loginOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-sumaq-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
        >
          <div className="frame-double relative w-full max-w-md border border-sumaq-gold-dark/30 bg-sumaq-black/95 p-6 shadow-2xl md:p-8">
            <button
              type="button"
              className="absolute right-4 top-4 text-sumaq-gold-dark hover:text-sumaq-cream"
              onClick={() => setLoginOpen(false)}
              aria-label="Cerrar"
            >
              ✕
            </button>
            <h2
              id="login-title"
              className="font-serif pr-8 text-lg font-semibold uppercase tracking-[0.18em] text-sumaq-gold-dark"
            >
              Iniciar sesión
            </h2>
            <p className="mt-2 text-sm text-sumaq-cream/70">
              Acceso para embajadores y socios. La autenticación se conectará
              próximamente.
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setLoginOpen(false);
                alert("Función de acceso en desarrollo.");
              }}
            >
              <input
                name="login-email"
                type="email"
                required
                placeholder="Correo electrónico"
                className="input-sumaq"
                autoComplete="email"
              />
              <input
                name="password"
                type="password"
                required
                placeholder="Contraseña"
                className="input-sumaq"
                autoComplete="current-password"
              />
              <button
                type="submit"
                className="font-serif w-full border border-sumaq-gold-dark/80 bg-transparent py-3 text-xs font-semibold uppercase tracking-[0.18em] text-sumaq-gold-light transition hover:border-sumaq-gold-light hover:bg-sumaq-gold-dark/15"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
