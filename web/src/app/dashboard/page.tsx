"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  GitBranch,
  CheckSquare,
  Clock,
  TrendingUp,
  FileText,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#ef4444", "#f59e0b"];

interface Stats {
  totalProcesses: number;
  totalRequests: number;
  pendingTasks: number;
  completedToday: number;
  requestsByStatus: { name: string; value: number }[];
  requestsByMonth: { name: string; pendientes: number; aprobados: number; rechazados: number }[];
  recentActivity: { id: number; action: string; details: string; user: string; time: string }[];
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/requests?stats=true")
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  const cards = [
    {
      label: "Procesos Activos",
      value: stats?.totalProcesses ?? 0,
      icon: GitBranch,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Solicitudes Totales",
      value: stats?.totalRequests ?? 0,
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Tareas Pendientes",
      value: stats?.pendingTasks ?? 0,
      icon: CheckSquare,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Completadas Hoy",
      value: stats?.completedToday ?? 0,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Bienvenido, {session?.user?.name || "Usuario"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Panel de control de automatización de procesos
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.label}
                </p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {card.value}
                </p>
              </div>
              <div className={`rounded-lg p-3 ${card.bg}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Solicitudes por Estado
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.requestsByStatus ?? []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(stats?.requestsByStatus ?? []).map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Solicitudes por Mes
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.requestsByMonth ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Bar dataKey="pendientes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="aprobados" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rechazados" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Actividad Reciente
        </h2>
        <div className="space-y-3">
          {stats?.recentActivity?.length ? (
            stats.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3"
              >
                <Clock className="h-4 w-4 text-slate-400" />
                <div className="flex-1">
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-xs text-slate-400">{activity.details}</p>
                </div>
                <span className="text-xs text-slate-400">{activity.time}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400 text-center py-4">
              No hay actividad reciente
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
