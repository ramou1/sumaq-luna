"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getIdTokenResult, signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuthDb } from "@/app/lib/firebase/client";

import { AdminModal } from "@/app/components/modals/AdminModal";
import { LoginModal } from "@/app/components/modals/LoginModal";
import { RegisterModal } from "@/app/components/modals/RegisterModal";
import { UserStatusModal } from "@/app/components/modals/UserStatusModal";
import { SumaqLunaHeader } from "@/app/components/SumaqLunaHeader";
import { EmbassadorInfoSlider } from "@/app/components/EmbassadorInfoSlider";

type SupporterStage = "Em Validação" | "Pagamento" | "Proceso Aprobado";

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
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [adminListOpen, setAdminListOpen] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminSupporters, setAdminSupporters] = useState<
    Array<{
      id: string;
      nombre: string;
      telefono: string;
      email: string;
      pais: string;
      investimento?: "1000" | "2000" | "5000";
      stage: SupporterStage;
      createdAt?: { toDate: () => Date };
    }>
  >([]);
  const [loginError, setLoginError] = useState("");
  const [userStatusOpen, setUserStatusOpen] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserStage, setCurrentUserStage] =
    useState<SupporterStage>("Em Validação");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!adminListOpen) return;

    (async () => {
      setAdminLoading(true);
      try {
          const { db } = getFirebaseAuthDb();
        const q = query(
          collection(db, "supporters"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const items = snap.docs.map((d) => {
          const data = d.data() as Partial<{
            nombre: string;
            telefono: string;
            email: string;
            pais: string;
            investimento: "1000" | "2000" | "5000";
            stage: SupporterStage;
            createdAt: { toDate: () => Date };
          }>;
          return {
            id: d.id,
            nombre: String(data.nombre ?? ""),
            telefono: String(data.telefono ?? ""),
            email: String(data.email ?? ""),
            pais: String(data.pais ?? ""),
            investimento:
              data.investimento === "1000" ||
              data.investimento === "2000" ||
              data.investimento === "5000"
                ? data.investimento
                : undefined,
            stage:
              data.stage === "Em Validação" ||
              data.stage === "Pagamento" ||
              data.stage === "Proceso Aprobado"
                ? data.stage
                : "Em Validação",
            createdAt: data.createdAt,
          };
        });
        setAdminSupporters(items);
      } catch {
        setLoginError(
          "No se pudo cargar el panel de administración. Verifica tus permisos."
        );
      } finally {
        setAdminLoading(false);
      }
    })();
  }, [adminListOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const submitSupporter = async (
    e: FormEvent<HTMLFormElement>,
    opts?: { closeAfterSuccess?: boolean }
  ) => {
    e.preventDefault();
    if (formSubmitting) return;

    const fd = new FormData(e.currentTarget);
    const nombre = String(fd.get("nombre") ?? "").trim();
    const telefono = String(fd.get("telefono") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const pais = String(fd.get("pais") ?? "").trim();
    const senha = String(fd.get("senha") ?? "");
    const investimento = String(fd.get("investimento") ?? "").trim();
    const investimentoValido = ["1000", "2000", "5000"].includes(investimento);

    if (!nombre || !telefono || !email || !pais || !senha || !investimentoValido) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setFormSubmitting(true);
    try {
      const { db } = getFirebaseAuthDb();
      await addDoc(collection(db, "supporters"), {
        nombre,
        telefono,
        email,
        pais,
        senha,
        investimento,
        stage: "Em Validação",
        createdAt: new Date(),
      });

      if (opts?.closeAfterSuccess) setRegisterOpen(false);
      alert("Gracias. Tu solicitud fue enviada correctamente.");
    } catch {
      alert(
        "No se pudo enviar la solicitud. Verifica tu conexión o inténtalo de nuevo."
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginSubmitting) return;
    setLoginError("");

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("login-email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    if (!email || !password) {
      setLoginError("Ingresa tu correo y contraseña.");
      return;
    }

    setLoginSubmitting(true);
    try {
      const { auth } = getFirebaseAuthDb();
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No se pudo obtener la sesión actual.");
      }
      const tokenResult = await getIdTokenResult(user);
      const claims = tokenResult.claims as Record<string, unknown>;
      const isAdmin = claims.admin === true;

      setLoginOpen(false);
      if (isAdmin) {
        setAdminListOpen(true);
      } else {
        const { db } = getFirebaseAuthDb();
        const supporterQuery = query(
          collection(db, "supporters"),
          where("email", "==", email),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const supporterSnap = await getDocs(supporterQuery);
        const supporterData = supporterSnap.docs[0]?.data() as
          | {
              nombre?: string;
              stage?: SupporterStage;
            }
          | undefined;

        setCurrentUserName(String(supporterData?.nombre ?? ""));
        const stage = supporterData?.stage;
        setCurrentUserStage(
          stage === "Em Validação" ||
            stage === "Pagamento" ||
            stage === "Proceso Aprobado"
            ? stage
            : "Em Validação"
        );
        setUserStatusOpen(true);
      }
    } catch {
      setLoginError("No se pudo iniciar sesión. Revisa tus credenciales.");
    } finally {
      setLoginSubmitting(false);
    }
  };

  const formatCreatedAt = (value?: { toDate: () => Date }) => {
    if (!value) return "";
    try {
      return value.toDate().toLocaleString("es-ES");
    } catch {
      return "";
    }
  };

  return (
    <div className="relative min-h-screen bg-sumaq-black text-sumaq-cream">
      <SumaqLunaHeader
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((v) => !v)}
        onCloseMobile={closeMobile}
        onOpenLogin={() => {
          setLoginError("");
          setLoginOpen(true);
          setMobileOpen(false);
        }}
        onOpenRegister={() => {
          setRegisterOpen(true);
          setMobileOpen(false);
        }}
      />

      <main>
        {/* Hero */}
        <section
          id="inicio"
          className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24 md:pt-28 lg:pt-32"
        >
          <div className="absolute inset-0">
            <video
              className="h-full w-full object-cover object-center opacity-60"
              src="/videos/video-sumaq.mp4"
              autoPlay
              muted
              loop
              playsInline
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
              <div className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-2 md:items-start">
                <EmbassadorInfoSlider />
                <form
                  className="glass-panel space-y-4 border border-sumaq-gold-dark/40 p-8"
                  onSubmit={(e) => submitSupporter(e)}
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
                  <div>
                    <label htmlFor="investimento" className="sr-only">
                      Valor de inversión
                    </label>
                    <select
                      id="investimento"
                      name="investimento"
                      required
                      className="input-sumaq"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selecciona valor de inversión
                      </option>
                      <option value="1000">1000</option>
                      <option value="2000">2000</option>
                      <option value="5000">5000</option>
                    </select>
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
                    <label htmlFor="senha" className="sr-only">
                      Senha
                    </label>
                    <input
                      id="senha"
                      name="senha"
                      type="password"
                      required
                      placeholder="Senha"
                      className="input-sumaq"
                      autoComplete="new-password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="font-serif w-full border border-sumaq-gold-dark bg-sumaq-wine py-3 text-xs font-semibold uppercase tracking-[0.2em] text-sumaq-cream transition hover:bg-[#a00004] hover:shadow-[0_0_24px_rgba(194,167,78,0.12)]"
                    disabled={formSubmitting}
                  >
                    Enviar solicitud
                  </button>
                </form>
              </div>
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

      {registerOpen ? (
        <RegisterModal
          onClose={() => setRegisterOpen(false)}
          onSubmit={(e) => submitSupporter(e, { closeAfterSuccess: true })}
          formSubmitting={formSubmitting}
        />
      ) : null}

      {loginOpen ? (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onSubmit={(e) => submitLogin(e)}
          loginSubmitting={loginSubmitting}
          loginError={loginError}
        />
      ) : null}

      {userStatusOpen ? (
        <UserStatusModal
          onClose={() => setUserStatusOpen(false)}
          userName={currentUserName}
          stage={currentUserStage}
        />
      ) : null}

      {adminListOpen ? (
        <AdminModal
          onClose={() => setAdminListOpen(false)}
          adminLoading={adminLoading}
          adminSupporters={adminSupporters}
          formatCreatedAt={formatCreatedAt}
        />
      ) : null}
    </div>
  );
}
