"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  whatsappNumber: string | undefined | null;
  productName: string;
  /** Render a compact version (icon + short text) for product cards */
  compact?: boolean;
}

export default function WhatsAppButton({
  whatsappNumber,
  productName,
  compact = false,
}: WhatsAppButtonProps) {
  if (!whatsappNumber) return null;

  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hello, I want to ask about product: ${productName}. Is it available in stock?`
  );
  const href = `https://wa.me/${cleanNumber}?text=${message}`;

  if (compact) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        id={`whatsapp-btn-${productName.replace(/\s+/g, "-").toLowerCase()}`}
        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md active:scale-[0.97]"
      >
        <MessageCircle className="h-4 w-4" />
        Ask on WhatsApp
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      id={`whatsapp-btn-detail-${productName.replace(/\s+/g, "-").toLowerCase()}`}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-lg active:scale-[0.97]"
    >
      <MessageCircle className="h-5 w-5" />
      Ask on WhatsApp
    </a>
  );
}
