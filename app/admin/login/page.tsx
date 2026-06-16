"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Login failed.");
      return;
    }

    // Server sets secure HTTP-only cookie on successful login. Redirect to admin.
    window.location.href = "/admin";
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center px-6 py-16">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Admin Login</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Secure Access</h1>
          <p className="text-sm leading-7 text-slate-600">Only the store owner can manage products, categories, gallery, and website content.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950">Sign In</button>
        </form>
      </div>
    </main>
  );
}
