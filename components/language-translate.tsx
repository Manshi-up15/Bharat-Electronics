"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

export function LanguageTranslate() {
  const [isHindi, setIsHindi] = useState(false);

  useEffect(() => {
    // Check if google translate cookie exists and is set to hindi
    const cookies = document.cookie.split("; ");
    const googtrans = cookies.find(row => row.startsWith("googtrans="));
    if (googtrans && (googtrans.split("=")[1] === "/en/hi" || googtrans.split("=")[1] === "/auto/hi")) {
      setIsHindi(true);
    }
  }, []);

  const toggleLanguage = () => {
    if (isHindi) {
      // Revert to English by setting cookie to english
      document.cookie = "googtrans=/en/en; path=/";
      document.cookie = "googtrans=/en/en; domain=" + window.location.hostname + "; path=/";
      setIsHindi(false);
    } else {
      // Translate to Hindi
      document.cookie = "googtrans=/en/hi; path=/";
      document.cookie = "googtrans=/en/hi; domain=" + window.location.hostname + "; path=/";
      setIsHindi(true);
    }
    window.location.reload();
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-900"
      title={isHindi ? "Translate to English" : "Translate to Hindi"}
    >
      <Languages className="h-4 w-4" />
      <span className="sr-only">Toggle Language</span>
      <span className="hidden sm:inline font-semibold">{isHindi ? "EN" : "HI"}</span>
    </button>
  );
}
