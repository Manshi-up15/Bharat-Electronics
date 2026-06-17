"use client";

import { useEffect, useState } from "react";
import { updateSettings, fetchSettings } from "../../../../lib/api";
import type { Settings } from "../../../../lib/types";

function getCsrf() {
  const match = document.cookie.match(/(^|;)\s*csrfToken=([^;]+)/);
  return match ? decodeURIComponent(match[2]) : null;
}

const initialSettings: Settings = {
  businessName: "",
  ownerName: "",
  phone: "",
  email: "",
  instagram: "",
  aboutContent: "",
  heroTitle: "",
  heroSubtitle: "",
  whatsappNumber: "",
  address: "",
  googleMapsUrl: ""
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings()
      .then((data) => {
        if (data) {
          setSettings({ ...initialSettings, ...data });
        }
      })
      .catch(() => {
        setMessage("Unable to load current settings.");
      });
  }, []);

  const handleChange = (field: keyof Settings) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const saved = await saveSettings(settings, getCsrf() || undefined);
      setSettings({ ...initialSettings, ...saved });
      setMessage("Settings saved successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Website Content</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Update business information</h1>
          <p className="text-sm leading-7 text-slate-600">Manage shop name, contact details, hero copy, and about section from one place.</p>
          {message ? <p className="text-sm text-slate-700">{message}</p> : null}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Shop Name
              <input
                value={settings.businessName}
                onChange={handleChange("businessName")}
                type="text"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
              />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Owner Name
              <input
                value={settings.ownerName}
                onChange={handleChange("ownerName")}
                type="text"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Phone Number
              <input
                value={settings.phone}
                onChange={handleChange("phone")}
                type="tel"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
              />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              WhatsApp Number
              <input
                value={settings.whatsappNumber}
                onChange={handleChange("whatsappNumber")}
                type="tel"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Email Address
              <input
                value={settings.email}
                onChange={handleChange("email")}
                type="email"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
              />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Instagram Handle
              <input
                value={settings.instagram}
                onChange={handleChange("instagram")}
                type="text"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Address
            <input
              value={settings.address}
              onChange={handleChange("address")}
              type="text"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Google Maps URL
            <input
              value={settings.googleMapsUrl}
              onChange={handleChange("googleMapsUrl")}
              type="url"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Hero Title
            <input
              value={settings.heroTitle}
              onChange={handleChange("heroTitle")}
              type="text"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Hero Subtitle
            <textarea
              value={settings.heroSubtitle}
              onChange={handleChange("heroSubtitle")}
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            About Section
            <textarea
              value={settings.aboutContent}
              onChange={handleChange("aboutContent")}
              rows={4}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </form>
      </div>
    </main>
  );
}
