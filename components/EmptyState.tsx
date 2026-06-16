import React from "react";

export default function EmptyState({ message = "No items found." }: { message?: string }) {
  return (
    <div className="rounded-lg border border-dashed p-6 text-center text-sm text-slate-600">
      {message}
    </div>
  );
}
