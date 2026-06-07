"use client";

import { useState, useEffect } from "react";
import {
  CheckSquare,
  CheckCircle,
  XCircle,
  Loader2,
  MessageSquare,
  Send,
} from "lucide-react";

interface Approval {
  id: number;
  status: string;
  comment: string | null;
  step: number;
  request: {
    id: number;
    title: string;
    description: string | null;
    status: string;
    currentStep: number;
    process: { name: string; steps: number };
    requester: { name: string };
  };
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [actionId, setActionId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<"approved" | "rejected" | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/approvals")
      .then((r) => r.json())
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

  async function handleAction(approvalId: number, status: string) {
    setSubmitting(true);
    await fetch("/api/approvals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        approvalId,
        status,
        comment: status === "rejected" ? comment : comment || undefined,
      }),
    });
    setSubmitting(false);
    setComment("");
    setActionId(null);
    setActionType(null);
    fetch("/api/approvals")
      .then((r) => r.json())
      .then(setTasks)
      .catch(() => {});
  }

  const filtered = tasks.filter((t) => {
    if (filter === "pending") return t.status === "pending";
    if (filter === "done") return t.status !== "pending";
    return true;
  });

  const pendingCount = tasks.filter((t) => t.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tareas</h1>
          <p className="mt-1 text-sm text-slate-500">
            {pendingCount} tarea{pendingCount !== 1 ? "s" : ""} pendiente
           {pendingCount !== 1 ? "s" : ""} de revisión
          </p>
        </div>
        <div className="flex gap-2">
          {["all", "pending", "done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === f
                  ? "bg-orange-100 text-orange-700"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {f === "all" ? "Todas" : f === "pending" ? "Pendientes" : "Hechas"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <CheckSquare className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-lg font-medium text-slate-700">
            No hay tareas
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {filter === "all"
              ? "No hay tareas de aprobación pendientes"
              : "No hay tareas en este filtro"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((approval) => {
            const isPending = approval.status === "pending";
            return (
              <div
                key={approval.id}
                className={`rounded-xl border bg-white p-5 shadow-sm ${
                  isPending
                    ? "border-l-4 border-l-amber-400"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {approval.request.title}
                      </h3>
                      {!isPending && (
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            approval.status === "approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {approval.status === "approved"
                            ? "Aprobado"
                            : "Rechazado"}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      Proceso: {approval.request.process.name} — Paso{" "}
                      {approval.step}/{approval.request.process.steps}
                    </p>
                    {approval.request.description && (
                      <p className="mt-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-100">
                        {approval.request.description}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-slate-400">
                      Solicitado por {approval.request.requester.name}
                    </p>
                  </div>
                </div>

                {isPending && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Agregar comentario (opcional)..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setActionId(approval.id);
                          setActionType("approved");
                          handleAction(approval.id, "approved");
                        }}
                        disabled={submitting}
                        className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-400 disabled:opacity-50 transition"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Aprobar
                      </button>
                      <button
                        onClick={() => {
                          setActionId(approval.id);
                          setActionType("rejected");
                          if (!comment) {
                            alert(
                              "Agrega un comentario para justificar el rechazo"
                            );
                            return;
                          }
                          handleAction(approval.id, "rejected");
                        }}
                        disabled={submitting}
                        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 disabled:opacity-50 transition"
                      >
                        <XCircle className="h-4 w-4" />
                        Rechazar
                      </button>
                    </div>
                  </div>
                )}

                {approval.comment && approval.status !== "pending" && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 p-3 border border-slate-100">
                    <MessageSquare className="mt-0.5 h-4 w-4 text-slate-400" />
                    <p className="text-sm text-slate-600">
                      {approval.comment}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
