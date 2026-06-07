"use client";

import { useState, useEffect } from "react";
import { Plus, GitBranch, Trash2, Loader2 } from "lucide-react";

interface Process {
  id: number;
  name: string;
  description: string | null;
  steps: number;
  createdBy: { name: string };
  _count: { requests: number };
  createdAt: string;
}

export default function ProcessesPage() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("1");
  const [submitting, setSubmitting] = useState(false);

  async function loadProcesses() {
    setLoading(true);
    const res = await fetch("/api/processes");
    const data = await res.json();
    setProcesses(data);
    setLoading(false);
  }

  useEffect(() => {
    fetch("/api/processes")
      .then((r) => r.json())
      .then(setProcesses)
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/processes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        steps: parseInt(steps),
      }),
    });
    setSubmitting(false);
    setName("");
    setDescription("");
    setSteps("1");
    setShowForm(false);
    loadProcesses();
  }

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar este proceso?")) return;
    await fetch(`/api/processes?id=${id}`, { method: "DELETE" });
    loadProcesses();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Procesos</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gestiona los flujos de automatización
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-400 transition shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Nuevo Proceso
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nombre del proceso
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
              placeholder="Ej: Aprobación de facturas"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
              placeholder="Describe el propósito del proceso"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Pasos de aprobación
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-32 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-400 disabled:opacity-50 transition"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              Crear Proceso
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      ) : processes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <GitBranch className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-lg font-medium text-slate-700">
            No hay procesos creados
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Crea tu primer proceso de automatización
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processes.map((process) => (
            <div
              key={process.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-50 p-2.5">
                    <GitBranch className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {process.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Creado por {process.createdBy.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(process.id)}
                  className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {process.description && (
                <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                  {process.description}
                </p>
              )}
              <div className="mt-4 flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-slate-700">
                    {process.steps}
                  </span>{" "}
                  pasos
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-slate-700">
                    {process._count.requests}
                  </span>{" "}
                  solicitudes
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
