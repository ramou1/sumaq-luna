"use client";

import { useState, type FormEvent } from "react";
import { EmbassadorInfoSlider } from "@/app/components/EmbassadorInfoSlider";

export function RegisterModal({
  onClose,
  onSubmit,
  formSubmitting,
  formMessage,
}: {
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formSubmitting: boolean;
  formMessage?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [investimentoSelecionado, setInvestimentoSelecionado] = useState("");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-sumaq-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-title"
    >
      <div className="frame-double relative max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-sumaq-gold-dark/30 bg-sumaq-black/95 p-6 shadow-2xl md:p-8">
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
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              name="nombre"
              required
              maxLength={40}
              placeholder="Nombre completo"
              className="input-sumaq"
              autoComplete="name"
            />
            <input
              name="telefono"
              type="tel"
              required
              maxLength={15}
              placeholder="Teléfono"
              className="input-sumaq"
              autoComplete="tel"
            />
            <input
              name="pais"
              required
              maxLength={30}
              placeholder="País"
              className="input-sumaq"
              autoComplete="country-name"
            />
            <select
              name="investimento"
              required
              className="input-sumaq"
              value={investimentoSelecionado}
              onChange={(e) => setInvestimentoSelecionado(e.target.value)}
            >
              <option value="" disabled>
                Selecciona valor de inversión
              </option>
              <option value="1000">USD 1000</option>
              <option value="3000">USD 3000</option>
              <option value="5000">USD 5000</option>
              <option value="custom">Definir un valor (USD)</option>
            </select>
            {investimentoSelecionado === "custom" ? (
              <input
                name="investimentoCustom"
                type="number"
                min="1"
                step="1"
                required
                placeholder="Valor de inversión en USD"
                className="input-sumaq"
              />
            ) : null}
            <input
              name="email"
              type="email"
              required
              maxLength={40}
              placeholder="Correo electrónico"
              className="input-sumaq"
              autoComplete="email"
            />
            <div className="relative">
              <input
                name="senha"
                type={showPassword ? "text" : "password"}
                required
                maxLength={20}
                placeholder="Senha"
                className="input-sumaq pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-sumaq-gold-dark hover:text-sumaq-gold-light"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
            <button
              type="submit"
              className="font-serif w-full border border-sumaq-gold-dark bg-sumaq-wine py-3 text-xs font-semibold uppercase tracking-[0.18em] text-sumaq-cream transition hover:bg-[#a00004]"
              disabled={formSubmitting}
            >
              Enviar
            </button>
            {formMessage ? (
              <p className="text-sm text-sumaq-gold-light" role="status">
                {formMessage}
              </p>
            ) : null}
          </form>
          <EmbassadorInfoSlider />
        </div>
      </div>
    </div>
  );
}

