"use client";
import React from "react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <button onClick={handleLogout} className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">Logout</button>
  );
}
