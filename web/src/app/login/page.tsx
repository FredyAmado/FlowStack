"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Credenciales inválidas");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white/10 p-8 backdrop-blur-lg border border-white/20 shadow-2xl">
        <div className="text-center">
          <Link href="/">
            <img src="/images/flowstack-logo.svg" alt="FlowStack" className="mx-auto h-14 hover:opacity-80 transition-opacity" />
          </Link>
          <Link href="/">
            <h1 className="mt-4 text-3xl font-bold text-white hover:text-orange transition-colors">FlowStack</h1>
          </Link>
          <p className="mt-2 text-sm text-orange/60">
            Automatización de Procesos Administrativos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="rounded-lg bg-red-500/20 border border-red-500/40 px-4 py-2.5 text-sm text-red-200 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30 transition"
              placeholder="admin@flowstack.ai"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange/25 hover:bg-orange-light focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin" />
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Demo: admin@flowstack.ai / admin123
        </p>
      </div>
    </div>
  );
}
