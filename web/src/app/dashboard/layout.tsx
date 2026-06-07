"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  GitBranch,
  CheckSquare,
  Clock,
  LogOut,
  ChevronRight,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useEffect } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/processes", label: "Procesos", icon: GitBranch },
  { href: "/dashboard/tasks", label: "Tareas", icon: CheckSquare },
  { href: "/dashboard/history", label: "Historial", icon: Clock },
  { href: "/dashboard/contactos", label: "Contactos", icon: Mail },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange border-t-transparent" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-black text-white">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <img src="/images/flowstack-logo.svg" alt="FlowStack" className="h-8" />
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-orange/20 text-orange border border-orange/30"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4.5 w-4.5" />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight className="ml-auto h-4 w-4 text-orange" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange text-xs font-bold text-white">
              {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session.user?.name || "Usuario"}
              </p>
              <p className="text-xs text-zinc-500 truncate">
                {session.user?.role === "admin"
                  ? "Administrador"
                  : "Usuario"}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-white/5 hover:text-white transition"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
