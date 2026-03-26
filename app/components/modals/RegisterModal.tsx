"use client";

import type { FormEvent } from "react";

export function RegisterModal({
  onClose,
  onSubmit,
  formSubmitting,
}: {
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formSubmitting: boolean;
}) {
  return (
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
          onClick={onClose}
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
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
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
            disabled={formSubmitting}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

