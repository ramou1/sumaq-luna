"use client";

type SupporterRow = {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  pais: string;
  createdAt?: { toDate: () => Date };
};

export function AdminModal({
  onClose,
  adminLoading,
  adminSupporters,
  formatCreatedAt,
}: {
  onClose: () => void;
  adminLoading: boolean;
  adminSupporters: SupporterRow[];
  formatCreatedAt: (value?: { toDate: () => Date }) => string;
}) {
  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-sumaq-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-title"
    >
      <div className="frame-double relative w-full max-w-3xl overflow-hidden border border-sumaq-gold-dark/30 bg-sumaq-black/95 shadow-2xl">
        <div className="p-6 md:p-8">
          <button
            type="button"
            className="absolute right-4 top-4 text-sumaq-gold-dark hover:text-sumaq-cream"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>

          <h2
            id="admin-title"
            className="font-serif pr-10 text-lg font-semibold uppercase tracking-[0.18em] text-sumaq-gold-dark"
          >
            Panel de administración
          </h2>
          <p className="mt-2 text-sm text-sumaq-cream/70">
            Cadastros de embajadores y patrocinadores.
          </p>

          {adminLoading ? (
            <div className="mt-8 text-center text-sumaq-cream/80">
              Cargando...
            </div>
          ) : adminSupporters.length === 0 ? (
            <div className="mt-8 text-center text-sumaq-cream/80">
              Todavía no hay registros.
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-[0.14em] text-sumaq-gold-dark">
                    <th className="border-b border-sumaq-gold-dark/25 py-3 pr-3">
                      Nombre
                    </th>
                    <th className="border-b border-sumaq-gold-dark/25 py-3 pr-3">
                      Teléfono
                    </th>
                    <th className="border-b border-sumaq-gold-dark/25 py-3 pr-3">
                      Email
                    </th>
                    <th className="border-b border-sumaq-gold-dark/25 py-3 pr-3">
                      País
                    </th>
                    <th className="border-b border-sumaq-gold-dark/25 py-3">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adminSupporters.map((item) => (
                    <tr
                      key={item.id}
                      className="text-sumaq-cream/90 even:bg-white/[0.03]"
                    >
                      <td className="border-b border-sumaq-gold-dark/15 py-3 pr-3">
                        {item.nombre}
                      </td>
                      <td className="border-b border-sumaq-gold-dark/15 py-3 pr-3">
                        {item.telefono}
                      </td>
                      <td className="border-b border-sumaq-gold-dark/15 py-3 pr-3">
                        {item.email}
                      </td>
                      <td className="border-b border-sumaq-gold-dark/15 py-3 pr-3">
                        {item.pais}
                      </td>
                      <td className="border-b border-sumaq-gold-dark/15 py-3">
                        {formatCreatedAt(item.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

