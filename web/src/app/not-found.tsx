import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
            <SearchX className="h-10 w-10" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-black tracking-tight">404</h1>
        <p className="mt-4 text-xl font-semibold text-black">
          Página no encontrada
        </p>
        <p className="mt-2 text-zinc-500 leading-relaxed">
          La página que buscas no existe o fue movida. Verifica la URL o vuelve al inicio.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white hover:bg-orange-light transition-colors shadow-lg shadow-orange/25"
        >
          <Home className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
