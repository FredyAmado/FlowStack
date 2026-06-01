"use client";

import { useState, useEffect } from "react";
import { Clock, Loader2, FileText, CheckCircle, XCircle, PlusCircle } from "lucide-react";

interface Activity {
  id: number;
  action: string;
  details: string | null;
  user: { name: string };
  createdAt: string;
}

export default function HistoryPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/requests?history=true")
      .then((r) => r.json())
      .then(setActivities)
      .finally(() => setLoading(false));
  }, []);

  function getIcon(action: string) {
    if (action.includes("aprob")) return CheckCircle;
    if (action.includes("rech")) return XCircle;
    if (action.includes("cre") || action.includes("nueva")) return PlusCircle;
    return FileText;
  }

  function getColor(action: string) {
    if (action.includes("aprob")) return "text-emerald-500 bg-emerald-50";
    if (action.includes("rech")) return "text-red-500 bg-red-50";
    if (action.includes("cre") || action.includes("nueva")) return "text-orange-500 bg-orange-50";
    return "text-slate-500 bg-slate-50";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Historial</h1>
        <p className="mt-1 text-sm text-slate-500">
          Registro completo de actividad del sistema
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      ) : activities.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Clock className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-lg font-medium text-slate-700">
            No hay actividad registrada
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            El historial se llenará a medida que uses el sistema
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getIcon(activity.action);
              const color = getColor(activity.action);
              return (
                <div key={activity.id} className="relative flex items-start gap-4">
                  <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">
                        <span className="font-semibold">{activity.user.name}</span>{" "}
                        {activity.action}
                      </p>
                      <span className="text-xs text-slate-400">
                        {new Date(activity.createdAt).toLocaleString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {activity.details && (
                      <p className="mt-1 text-sm text-slate-500">
                        {activity.details}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
