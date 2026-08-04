"use client";

import { useState } from "react";

interface WhatsAppWidgetProps {
  phoneNumber?: string; // Standard format without leading + or 0, e.g., '628123456789' or fallback to SPE official line
  locale?: string;
}

export function WhatsAppWidget({ phoneNumber = "6285133997018", locale = "id" }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const message =
    locale === "en"
      ? "Hello Admin PT Sarana Piranti Energi, I would like to ask about:\n\nName:\nCompany:\nNeeds (BBM B35/B40/Others):\nMessage:"
      : "Halo Admin PT Sarana Piranti Energi, saya ingin bertanya mengenai:\n\nNama:\nPerusahaan:\nKebutuhan (BBM B35/B40/Lainnya):\nPesan:";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="w-72 rounded-2xl bg-white p-4 shadow-xl border border-neutral-200/80 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="text-xs font-semibold text-neutral-800">
                {locale === "en" ? "SPE Customer Support" : "Layanan Pelanggan SPE"}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-600 rounded-full p-1"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="py-3 text-xs text-neutral-600 leading-relaxed">
            {locale === "en"
              ? "Need quick information on Solar B35/B40 supply or logistics? Chat directly with our team on WhatsApp!"
              : "Butuh info cepat pasokan Solar B35/B40 atau logistik? Hubungi tim kami langsung via WhatsApp!"}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 transition-all shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.16 4.226 4.403-1.154z" />
            </svg>
            {locale === "en" ? "Start WhatsApp Chat" : "Mulai Chat WhatsApp"}
          </a>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 hover:shadow-xl active:scale-95 transition-all duration-200 focus:outline-hidden"
        aria-label="WhatsApp Contact"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400"></span>
        </span>
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.506 1.037 3.518l-.68 2.485 2.548-.668c.974.553 2.102.865 3.303.865 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.364 8.163c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.576-.187-1.002-.37-1.802-.774-2.97-2.6-3.06-2.72-.09-.12-.733-.976-.733-1.86 0-.884.464-1.32.629-1.492.165-.172.36-.215.48-.215.12 0 .24.001.345.006.111.005.259-.042.405.309.15.36.51 1.245.555 1.335.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.188-.079.368.105.18.468.772 1.005 1.25.688.613 1.27.803 1.45.893.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.099.84z" />
        </svg>
      </button>
    </div>
  );
}
