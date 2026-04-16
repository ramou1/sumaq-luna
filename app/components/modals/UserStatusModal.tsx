"use client";

type SupporterStage = "Em Validação" | "Pagamento" | "Proceso Aprobado";

const stageOrder: SupporterStage[] = ["Em Validação", "Pagamento", "Proceso Aprobado"];

export function UserStatusModal({
  onClose,
  userName,
  stage,
}: {
  onClose: () => void;
  userName: string;
  stage: SupporterStage;
}) {
  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-sumaq-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="status-title"
    >
      <div className="frame-double relative w-full max-w-xl border border-sumaq-gold-dark/30 bg-sumaq-black/95 p-6 shadow-2xl md:p-8">
        <button
          type="button"
          className="absolute right-4 top-4 text-sumaq-gold-dark hover:text-sumaq-cream"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>
        <h2
          id="status-title"
          className="font-serif pr-10 text-lg font-semibold uppercase tracking-[0.18em] text-sumaq-gold-dark"
        >
          Estado de tu registro
        </h2>
        <p className="mt-2 text-sm text-sumaq-cream/75">
          {userName ? `Hola, ${userName}.` : "Hola."} Aquí puedes ver tu avance.
        </p>

        <div className="mt-6 space-y-3">
          {stageOrder.map((item, index) => {
            const isCurrent = item === stage;
            const isDone = stageOrder.indexOf(stage) > index;
            return (
              <div
                key={item}
                className={`flex items-center justify-between rounded border px-4 py-3 ${
                  isCurrent
                    ? "border-sumaq-gold-dark bg-sumaq-gold-dark/10"
                    : "border-sumaq-gold-dark/25"
                }`}
              >
                <p className="text-sm text-sumaq-cream/90">{item}</p>
                <span className="text-xs text-sumaq-gold-light">
                  {isCurrent ? "Actual" : isDone ? "Completado" : "Pendiente"}
                </span>
              </div>
            );
          })}
        </div>

        {stage === "Proceso Aprobado" ? (
          <button
            type="button"
            className="mt-6 flex items-center gap-2 rounded border border-sumaq-gold-dark/80 px-4 py-2 text-sm text-sumaq-gold-light opacity-80"
            disabled
            title="Download será habilitado futuramente"
          >
            <span aria-hidden>⬇</span>
            Descargar documento (próximamente)
          </button>
        ) : null}
      </div>
    </div>
  );
}
