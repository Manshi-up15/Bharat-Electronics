import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-gray-200"></div>
    </div>
  );
}
