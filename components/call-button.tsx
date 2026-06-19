"use client";

import { Phone } from "lucide-react";

interface CallButtonProps {
  phone: string | undefined | null;
  /** Render a compact version for inline use */
  compact?: boolean;
  /** Light variant for dark backgrounds (e.g. the dark contact section) */
  variant?: "default" | "light";
}

export default function CallButton({
  phone,
  compact = false,
  variant = "default",
}: CallButtonProps) {
  if (!phone) return null;

  const cleanPhone = phone.replace(/\D/g, "");
  const href = `tel:${cleanPhone}`;

  if (compact) {
    return (
      <a
        href={href}
        id={`call-btn-compact`}
        className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 hover:shadow-md active:scale-[0.97]"
      >
        <Phone className="h-4 w-4" />
        Call Now
      </a>
    );
  }

  const lightStyles =
    "border-2 border-amber-400/40 bg-amber-400/10 text-white hover:bg-amber-400/20";
  const defaultStyles =
    "bg-sky-500 text-white hover:bg-sky-600 hover:shadow-lg";

  return (
    <a
      href={href}
      id={`call-btn-full`}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold shadow-sm transition active:scale-[0.97] ${
        variant === "light" ? lightStyles : defaultStyles
      }`}
    >
      <Phone className="h-5 w-5" />
      Call Now
    </a>
  );
}
