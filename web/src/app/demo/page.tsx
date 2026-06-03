"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Zap, ChevronRight, ChevronLeft, Play, Pause,
  BarChart3, GitBranch, CheckSquare, Clock, CheckCircle,
  ArrowRight, FileText, Users, TrendingUp, Target, Eye, Award,
} from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const steps = [
  {
    id: "problem",
    title: "El problema",
    subtitle: "¿Cuánto tiempo pierde tu equipo?",
    bg: "bg-black",
    textColor: "text-white",
    accent: "text-orange",
  },
  {
    id: "dashboard",
    title: "Dashboard en tiempo real",
    subtitle: "Visibilidad total de tu operación",
    bg: "bg-white",
    textColor: "text-black",
    accent: "text-orange",
  },
  {
    id: "process",
    title: "Creación de procesos",
    subtitle: "Flujos multi-paso en segundos",
    bg: "bg-black",
    textColor: "text-white",
    accent: "text-orange",
  },
  {
    id: "request",
    title: "Solicitud inteligente",
    subtitle: "Enrutamiento automático",
    bg: "bg-white",
    textColor: "text-black",
    accent: "text-orange",
  },
  {
    id: "approval",
    title: "Aprobación multi-paso",
    subtitle: "De días a horas",
    bg: "bg-black",
    textColor: "text-white",
    accent: "text-orange",
  },
  {
    id: "history",
    title: "Trazabilidad total",
    subtitle: "Cada acción queda registrada",
    bg: "bg-white",
    textColor: "text-black",
    accent: "text-orange",
  },
  {
    id: "cta",
    title: "¿Listo para transformar tu empresa?",
    subtitle: "Automatiza lo tedioso. Potencia lo humano. Acelera tu empresa.",
    bg: "bg-gradient-to-br from-orange to-orange-dark",
    textColor: "text-white",
    accent: "text-white",
  },
];

const chartData = [
  { name: "Ene", pendientes: 8, aprobados: 12 },
  { name: "Feb", pendientes: 6, aprobados: 15 },
  { name: "Mar", pendientes: 4, aprobados: 20 },
  { name: "Abr", pendientes: 3, aprobados: 25 },
  { name: "May", pendientes: 2, aprobados: 30 },
];

const approvalSteps = [
  { step: 1, user: "Revisor Contable", status: "approved", comment: "Documentación en orden" },
  { step: 2, user: "Director Financiero", status: "approved", comment: "Presupuesto disponible" },
  { step: 3, user: "Gerente General", status: "pending", comment: "..." },
];

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [animPhase, setAnimPhase] = useState(0);

  const totalSteps = steps.length;

  const goNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
      setAnimPhase(0);
    }
  }, [currentStep, totalSteps]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      setAnimPhase(0);
    }
  }, [currentStep]);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          goNext();
          return 0;
        }
        return p + 1;
      });
      setAnimPhase((p) => Math.min(p + 1, 20));
    }, 80);
    return () => clearInterval(timer);
  }, [playing, goNext]);

  const step = steps[currentStep];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-orange shadow-lg shadow-orange/30">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-white">FlowStack</span>
            <span className="text-xs text-zinc-500 ml-2">Demo interactiva</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500">
              Paso {currentStep + 1}/{totalSteps}
            </span>
            <button
              onClick={() => setPlaying(!playing)}
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5 transition"
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
        <div className="h-0.5 bg-zinc-800">
          <div
            className="h-full bg-orange transition-all duration-75"
            style={{ width: `${playing ? progress : 0}%` }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-black/50 backdrop-blur-sm border-b border-white/5">
        <div className="mx-auto max-w-4xl px-4 py-2 flex gap-1.5">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setCurrentStep(i); setAnimPhase(0); }}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i === currentStep
                  ? "bg-orange"
                  : i < currentStep
                  ? "bg-orange/40"
                  : "bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 flex items-center justify-center pt-20 pb-16 transition-colors duration-700 ${step.bg}`}
      >
        <div className="mx-auto max-w-5xl px-4 w-full">
          <div className="text-center mb-8 animate-fadeIn">
            <span className={`text-xs font-semibold tracking-widest uppercase ${step.accent}`}>
              {step.title}
            </span>
            <p className={`mt-2 text-lg sm:text-xl font-medium ${step.textColor}/70`}>
              {step.subtitle}
            </p>
          </div>

          {/* Dynamic content per step */}
          <div className="animate-fadeIn min-h-[400px] flex items-center justify-center">
            {currentStep === 0 && <ProblemScene />}
            {currentStep === 1 && <DashboardScene animPhase={animPhase} />}
            {currentStep === 2 && <ProcessScene animPhase={animPhase} />}
            {currentStep === 3 && <RequestScene animPhase={animPhase} />}
            {currentStep === 4 && <ApprovalScene animPhase={animPhase} />}
            {currentStep === 5 && <HistoryScene animPhase={animPhase} />}
            {currentStep === 6 && <CTAScene />}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>

          <span className="text-xs text-zinc-500">
            {playing ? "Reproduciendo automáticamente" : "Pausado"}
          </span>

          {currentStep < totalSteps - 1 ? (
            <button
              onClick={goNext}
              className="flex items-center gap-1.5 rounded-lg bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange-light transition shadow-lg shadow-orange/25"
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <a
              href="/login"
              className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-orange hover:bg-zinc-100 transition"
            >
              Comenzar ahora <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProblemScene() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
      <div className="space-y-4">
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium text-red-400">45% del tiempo</span>
          </div>
          <p className="text-sm text-zinc-400">en tareas administrativas manuales</p>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium text-red-400">3-5 días</span>
          </div>
          <p className="text-sm text-zinc-400">para una aprobación simple</p>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium text-red-400">30%</span>
          </div>
          <p className="text-sm text-zinc-400">de los documentos se pierden o extravían</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" className="stroke-zinc-800" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              className="stroke-red-500"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 42 * 0.45} ${2 * Math.PI * 42 * 0.55}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">45%</p>
              <p className="text-xs text-zinc-500">perdido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardScene({ animPhase }: { animPhase: number }) {
  const show = (t: number) => animPhase >= t;
  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Procesos", value: "12", color: "text-orange", showAt: 1 },
          { label: "Solicitudes", value: "156", color: "text-blue-500", showAt: 3 },
          { label: "Pendientes", value: "8", color: "text-amber-500", showAt: 5 },
          { label: "Hoy", value: "23", color: "text-emerald-500", showAt: 7 },
        ].map((card) => (
          <div
            key={card.label}
            className={`rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-500 ${
              show(card.showAt) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-xs text-zinc-500">{card.label}</p>
            <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>
      <div
        className={`rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-700 ${
          show(9) ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-sm font-semibold text-black mb-4">Solicitudes por mes</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
              <Bar dataKey="pendientes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="aprobados" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ProcessScene({ animPhase }: { animPhase: number }) {
  const show = (t: number) => animPhase >= t;
  return (
    <div className="w-full max-w-lg space-y-4">
      <div
        className={`rounded-xl border-2 border-dashed border-zinc-700 bg-white/5 p-6 transition-all duration-500 ${
          show(1) ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-xs text-orange font-semibold uppercase tracking-wide">Formulario</p>
        <div className="mt-3 space-y-3">
          <div className="h-10 rounded-lg bg-zinc-800 animate-pulse" />
          <div className="h-20 rounded-lg bg-zinc-800 animate-pulse" />
          <div className="h-10 w-24 rounded-lg bg-zinc-800 animate-pulse" />
        </div>
        <div
          className={`mt-4 flex justify-end transition-all duration-500 ${
            show(5) ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="rounded-lg bg-orange px-4 py-2 text-xs font-semibold text-white">
            Crear proceso
          </span>
        </div>
      </div>
      <div
        className={`rounded-xl border border-zinc-700 bg-white/5 p-5 transition-all duration-500 ${
          show(8) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-3">
          <GitBranch className="h-5 w-5 text-orange" />
          <div>
            <p className="text-sm font-semibold text-white">Aprobación de Facturas</p>
            <p className="text-xs text-zinc-500">2 pasos · Creado hace 1 min</p>
          </div>
          <CheckCircle className="ml-auto h-5 w-5 text-emerald-500" />
        </div>
      </div>
    </div>
  );
}

function RequestScene({ animPhase }: { animPhase: number }) {
  const show = (t: number) => animPhase >= t;
  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="text-center">
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 transition-all duration-500 ${
            show(2) ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <FileText className="h-4 w-4" />
          Solicitud enviada
        </div>
      </div>
      <div
        className={`rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-700 ${
          show(1) ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-lg font-bold text-black">Factura Proveedor XYZ - $15,000</p>
        <p className="mt-2 text-sm text-zinc-500">
          Factura por servicios de consultoría del mes de mayo.
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-zinc-400" />
          <span className="text-zinc-600">Enviado a: </span>
          <span className="font-medium text-black">Revisor Contable</span>
        </div>
      </div>
      <div
        className={`flex items-center justify-center gap-4 text-sm text-zinc-500 transition-all duration-500 ${
          show(5) ? "opacity-100" : "opacity-0"
        }`}
      >
        <ArrowRight className="h-4 w-4 text-orange animate-pulse" />
        <span>Enrutamiento automático al primer revisor</span>
        <ArrowRight className="h-4 w-4 text-orange animate-pulse" />
      </div>
    </div>
  );
}

function ApprovalScene({ animPhase }: { animPhase: number }) {
  const show = (t: number) => animPhase >= t;
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="flex items-center justify-center gap-6">
        {approvalSteps.map((as, i) => (
          <div key={as.step} className="flex items-center gap-3">
            <div
              className={`flex flex-col items-center transition-all duration-700 ${
                show(i * 3 + 1) ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold ${
                  as.status === "approved"
                    ? "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500"
                    : as.status === "pending"
                    ? "bg-amber-500/20 text-amber-400 border-2 border-amber-500 animate-pulse"
                    : "bg-zinc-800 text-zinc-500 border-2 border-zinc-700"
                }`}
              >
                {as.status === "approved" ? "✓" : as.status === "pending" ? "..." : as.step}
              </div>
              <p className="mt-2 text-xs text-zinc-400 text-center max-w-24">{as.user}</p>
              {as.status === "approved" && (
                <p className="text-[10px] text-emerald-500/70 mt-0.5">{as.comment}</p>
              )}
            </div>
            {i < approvalSteps.length - 1 && (
              <div className={`text-zinc-700 transition-all duration-500 ${show(i * 3 + 2) ? "opacity-100" : "opacity-0"}`}>
                <ChevronRight className="h-5 w-5" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`text-center transition-all duration-700 ${
          show(10) ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-5 py-2">
          <CheckCircle className="h-5 w-5 text-emerald-400" />
          <span className="text-emerald-400 font-semibold">
            ¡Aprobación final completada en 2 horas!
          </span>
        </div>
      </div>
    </div>
  );
}

function HistoryScene({ animPhase }: { animPhase: number }) {
  const show = (t: number) => animPhase >= t;
  const entries = [
    { user: "Carlos M.", action: "aprobó la solicitud", detail: "Factura XYZ - Paso 2/2", time: "10:32", showAt: 1 },
    { user: "María L.", action: "aprobó la solicitud", detail: "Factura XYZ - Paso 1/2", time: "10:15", showAt: 4 },
    { user: "Juan P.", action: "creó la solicitud", detail: '"Factura XYZ" para proceso "Aprobación de Facturas"', time: "09:45", showAt: 7 },
    { user: "Admin", action: "creó el proceso", detail: '"Aprobación de Facturas" con 2 pasos', time: "09:00", showAt: 10 },
  ];
  return (
    <div className="w-full max-w-lg">
      <div className="relative pl-8 space-y-6">
        <div className="absolute left-3.5 top-2 bottom-2 w-px bg-zinc-700" />
        {entries.map((e, i) => (
          <div
            key={i}
            className={`relative transition-all duration-500 ${
              show(e.showAt) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <div className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full bg-orange ring-2 ring-black" />
            <div className="rounded-lg border border-zinc-700 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white">
                  <span className="font-semibold text-orange">{e.user}</span>{" "}
                  <span className="text-zinc-400">{e.action}</span>
                </p>
                <span className="text-xs text-zinc-600">{e.time}</span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">{e.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTAScene() {
  return (
    <div className="text-center space-y-8">
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 shadow-xl">
          <Zap className="h-10 w-10 text-white" />
        </div>
      </div>
      <div className="max-w-xl mx-auto space-y-4">
        <p className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          Automatiza lo tedioso.{" "}
          <span className="text-white/80">Potencia lo humano.</span>{" "}
          Acelera tu empresa.
        </p>
        <p className="text-white/70">
          Únete a cientos de empresas que ya transformaron su gestión administrativa.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/login"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-orange hover:bg-zinc-100 transition-colors shadow-xl"
        >
          Comenzar ahora <ArrowRight className="h-5 w-5" />
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
        >
          Conocer más
        </a>
      </div>
    </div>
  );
}
