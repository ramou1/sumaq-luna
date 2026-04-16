"use client";

import { useState, type FormEvent } from "react";

export function LoginModal({
  onClose,
  onSubmit,
  loginSubmitting,
  loginError,
}: {
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loginSubmitting: boolean;
  loginError?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
          onClick={onClose}
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
          Acceso para embajadores y socios.
        </p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            name="login-email"
            type="email"
            required
            placeholder="Correo electrónico"
            className="input-sumaq"
            autoComplete="email"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Contraseña"
              className="input-sumaq pr-10"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-sumaq-gold-dark hover:text-sumaq-gold-light"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
          {loginError ? (
            <p className="text-sm text-[#ff8b8b]" role="alert">
              {loginError}
            </p>
          ) : null}
          <button
            type="submit"
            className="font-serif w-full border border-sumaq-gold-dark/80 bg-transparent py-3 text-xs font-semibold uppercase tracking-[0.18em] text-sumaq-gold-light transition hover:border-sumaq-gold-light hover:bg-sumaq-gold-dark/15"
            disabled={loginSubmitting}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

