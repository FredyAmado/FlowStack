"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("FlowStack Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <AlertTriangle className="h-10 w-10" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-black tracking-tight">
          Algo salió mal
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed">
          Hubo un error inesperado. No te preocupes, nuestro equipo ya fue
          notificado. Por favor intenta de nuevo.
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white hover:bg-orange-light transition-colors shadow-lg shadow-orange/25"
        >
          <RefreshCw className="h-4 w-4" />
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
