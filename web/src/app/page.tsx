"use client";

import { useState } from "react";
import {
  Menu, X, Zap, ArrowRight, CheckCircle, Target, Eye, Heart,
  BarChart3, GitBranch, Shield, Users, TrendingUp, Globe, Award,
  ChevronRight, Star, Quote, Send, Brain, Smartphone,
} from "lucide-react";
import AutomationIllustration from "@/components/AutomationIllustration";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Nosotros", href: "#about" },
  { label: "Servicios", href: "#services" },
  { label: "Mercado", href: "#market" },
  { label: "Casos de Éxito", href: "#testimonials" },
  { label: "Contacto", href: "#contact" },
];

const services = [
  {
    icon: GitBranch,
    title: "Automatización de Procesos",
    desc: "Power Automate, RPA y flujos inteligentes para aprobaciones multi-paso, gestión documental, orquestación de tareas administrativas e industriales.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Inteligente",
    desc: "Power BI, KPIs en tiempo real, reportes automáticos y analytics impulsado por IA para decisiones más rápidas.",
  },
  {
    icon: Shield,
    title: "Seguridad y Compliance",
    desc: "Cumplimiento normativo, trazabilidad total y auditoría de cada acción del sistema.",
  },
  {
    icon: Users,
    title: "Gestión de Usuarios",
    desc: "Roles y permisos granulares, autenticación segura y control de acceso por nivel.",
  },
  {
    icon: TrendingUp,
    title: "Optimización Continua",
    desc: "Identificación de cuellos de botella, sugerencias de mejora y reportes de eficiencia.",
  },
  {
    icon: Globe,
    title: "Integración Total",
    desc: "Conexión con tus sistemas existentes vía API, webhooks y exportación de datos.",
  },
  {
    icon: Smartphone,
    title: "Desarrollo de Apps Móviles",
    desc: "Aplicaciones nativas e híbridas con React Native y Flutter. Desde prototipos hasta apps en producción con backend integrado.",
  },
];

const stats = [
  { value: "$120B+", label: "Mercado global automatización 2026" },
  { value: "77%", label: "Empresas colombianas sin IA" },
  { value: "2,295+", label: "Startups activas en Colombia" },
  { value: "Bogotá", label: "Top tech hub LATAM" },
];

const testimonials = [
  {
    name: "Fredy Amado",
    role: "CEO",
    sector: "Nebula — Agencia Digital",
    text: "FlowStack transformó nuestra operación. Hoy gestionamos cotizaciones, seguimiento de proyectos y atención al cliente todo desde n8n + WhatsApp integrado con FlowStack. Nuestro CRM nunca fue tan eficiente.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Fredy+Amado&background=654090&color=fff&size=80",
  },
  {
    name: "Andrés Torres",
    role: "Gerente de Operaciones",
    sector: "Mantus — Mantenimiento Técnico",
    text: "Con FlowStack automatizamos órdenes de trabajo, despacho de técnicos vía WhatsApp y control de inventario de repuestos. Redujimos el tiempo de respuesta a emergencias de 48h a 4h. Un antes y después para nuestra operación.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Andres+Torres&background=f97316&color=fff&size=80",
  },
  {
    name: "Pedro Castillo",
    role: "Gerente de TI",
    sector: "Salud",
    text: "Integrarlo con nuestros sistemas existentes fue sorprendentemente fácil. El equipo de FlowStack nos acompañó en cada paso del proceso.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Pedro+Castillo&background=ff6b00&color=fff&size=80",
  },
];

const marketDemands = [
  {
    icon: GitBranch,
    title: "Automatización de Procesos",
    desc: "Power Automate y RPA encabezan la lista de habilidades más buscadas. Las empresas necesitan profesionales que diseñen flujos inteligentes para eliminar tareas repetitivas y acelerar operaciones.",
  },
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    desc: "Desde chatbots hasta análisis predictivo, la IA está transformando cada industria. Buscamos expertos que sepan implementar soluciones de IA que resuelvan problemas reales de negocio.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    desc: "Power BI y visualización de datos son competencias críticas. Las organizaciones requieren dashboards inteligentes que conviertan datos en decisiones estratégicas en tiempo real.",
  },
];

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState(false);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setFormSent(true);
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setTimeout(() => setFormSent(false), 5000);
    } catch {
      setFormError(true);
      setTimeout(() => setFormError(false), 5000);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between">
            <a href="#hero" className="flex items-center gap-2.5">
              <img src="/images/flowstack-logo.svg" alt="FlowStack" className="h-9" />
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
              <a href="/demo" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Demo
              </a>
              <a href="/login" className="rounded-lg bg-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-light transition-colors shadow-lg shadow-orange/25">
                Iniciar sesión
              </a>
            </div>

            <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-sm text-zinc-400 hover:text-white py-2">
                {link.label}
              </a>
            ))}
            <a href="/demo" onClick={() => setMobileOpen(false)} className="block text-sm text-zinc-400 hover:text-white py-2">
              Demo
            </a>
            <a href="/login" className="block text-center rounded-lg bg-orange px-5 py-2.5 text-sm font-semibold text-white">
              Iniciar sesión
            </a>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="hero" className="relative min-h-screen flex items-center bg-black pt-18">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange/10 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-sm text-orange-light mb-6">
                <Zap className="h-4 w-4" />
                Automatización administrativa y desarrollo de apps móviles
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Automatización{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange-light">
                  administrativa + apps móviles.
                </span>{" "}
                Potencia lo humano. Acelera tu empresa.
              </h1>
              <p className="mt-6 text-lg text-zinc-400 max-w-xl leading-relaxed">
                Aprobaciones en horas, visibilidad en tiempo real, control total sin esfuerzo.
                Automatización inteligente, desarrollo de apps móviles y CRM empresarial en un solo ecosistema.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white hover:bg-orange-light transition-colors shadow-xl shadow-orange/25">
                  Solicitar demo <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#about" className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-white/5 hover:text-white transition-colors">
                  Conocer más
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-orange" /> ISO 27001</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-orange" /> +25 años</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-orange" /> +7,000 clientes</span>
              </div>
            </div>

            {/* Right: Contact form (like Chetu) */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-black mb-2">¡Conversemos!</h3>
              <p className="text-sm text-zinc-500 mb-6">Cuéntanos sobre tu proyecto y te contactaremos</p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <input
                    type="text" name="name" placeholder="Nombre completo*" required
                    value={formData.name} onChange={handleFormChange}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
                  />
                </div>
                <div>
                  <input
                    type="email" name="email" placeholder="Correo electrónico*" required
                    value={formData.email} onChange={handleFormChange}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
                  />
                </div>
                <div>
                  <input
                    type="tel" name="phone" placeholder="Teléfono*" required
                    value={formData.phone} onChange={handleFormChange}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
                  />
                </div>
                <div>
                  <input
                    type="text" name="company" placeholder="Empresa (opcional)"
                    value={formData.company} onChange={handleFormChange}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
                  />
                </div>
                <div>
                  <textarea
                    name="message" placeholder="¿Cómo podemos ayudarte?*" required rows={3}
                    value={formData.message} onChange={handleFormChange}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 resize-none"
                  />
                </div>
                {formSent && (
                  <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 text-center">
                    ¡Mensaje enviado! Te contactaremos pronto.
                  </div>
                )}
                {formError && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 text-center">
                    Error al enviar. Intenta de nuevo o escríbenos a contacto@stacktecnologicodeautomatizacion.com.
                  </div>
                )}
                <button type="submit" className="w-full rounded-lg bg-orange py-3 text-sm font-semibold text-white hover:bg-orange-light transition-colors shadow-lg shadow-orange/25 flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" /> Enviar mensaje
                </button>
                <p className="text-xs text-zinc-400 text-center">
                  Al enviar, aceptas nuestra política de privacidad.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <section className="py-12 bg-black border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-orange">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT US (Mission, Vision, Values, FODA, Objectives) ===== */}
      <section id="about" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-orange tracking-wide uppercase">Nosotros</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-bold text-black tracking-tight">
              Automatización administrativa + desarrollo de apps móviles
            </p>
            <p className="mt-4 text-lg text-zinc-500">
              En FlowStack creemos que la tecnología debe liberar el potencial humano, no reemplazarlo. Llevamos la automatización a cada dispositivo.
            </p>
          </div>

          {/* Brand Story */}
          <div className="relative overflow-hidden rounded-2xl bg-black p-10 sm:p-12 mb-12">
            <div className="absolute top-0 left-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-semibold text-orange tracking-widest uppercase">Nuestra historia</span>
                <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                  De la fricción administrativa a la fluidez digital
                </h3>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  FlowStack nació de una verdad incómoda: las empresas pasan el 40% de su tiempo 
                  en tareas administrativas que no agregan valor. Procesos de aprobación que tardan 
                  días, documentos que se pierden, trazabilidad que no existe. Hoy también desarrollamos 
                  apps móviles para llevar la automatización al bolsillo de tu equipo.
                </p>
                <p className="mt-3 text-zinc-400 leading-relaxed">
                  Fundamos FlowStack con una convicción simple: <span className="text-white font-medium">la tecnología no debería crear más burocracia, debería eliminarla.</span> 
                  Hoy ayudamos a cientos de empresas en Latinoamérica a operar con la agilidad de 
                  una startup y la solidez de una corporación.
                </p>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <AutomationIllustration className="w-full max-w-sm" />
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-orange/20 bg-gradient-to-br from-orange/5 to-orange/10 p-8 sm:p-10 mb-12">
            <div className="absolute top-4 right-4 hidden sm:block">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange shadow-xl shadow-orange/30">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold text-orange tracking-widest uppercase">Propuesta de valor</span>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold text-black">
                No solo automatizamos procesos. Eliminamos la fricción administrativa que frena tu empresa.
              </h3>
              <p className="mt-4 text-zinc-600 leading-relaxed">
                Mientras otros venden herramientas, nosotros vendemos resultados: aprobaciones en horas, 
                no en días; trazabilidad total sin hojas de cálculo; y un equipo que entiende tu negocio 
                antes de escribir una línea de código.
              </p>
            </div>
          </div>

          {/* Mission / Vision / Values */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-orange/10 transition-colors" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-black">Misión</h3>
                <p className="mt-4 text-zinc-500 leading-relaxed text-sm">
                  Empoderar a las empresas con automatización inteligente que elimina la fricción 
                  administrativa, liberando el talento humano para enfocarse en lo que realmente 
                  importa: hacer crecer el negocio.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-orange/10 transition-colors" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Eye className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-black">Visión</h3>
                <p className="mt-4 text-zinc-500 leading-relaxed text-sm">
                  Ser el sistema operativo administrativo de referencia en el mundo hispanohablante, 
                  donde cualquier empresa —sin importar su tamaño— pueda operar con la eficiencia 
                  de una corporación global.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-orange/10 transition-colors" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Heart className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-black">Valores</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {[
                    "Obsesión por la eficiencia — si no simplifica, no sirve",
                    "Transparencia radical — sin letra chica, sin sorpresas",
                    "El cliente es el norte — cada decisión empieza y termina en su éxito",
                    "Ejecución, no teoría — entregamos, no prometemos",
                    "Mejora sin fin — hoy mejor que ayer, mañana mejor que hoy",
                  ].map((v) => (
                    <li key={v} className="flex items-start gap-2 text-zinc-500">
                      <CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Team photo */}
          <div className="mt-16 relative overflow-hidden rounded-2xl mb-16">
            <img
              src="/images/team.jpg"
              alt="Equipo FlowStack"
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
              <div className="p-8">
                <p className="text-white text-lg font-semibold">Equipo FlowStack</p>
                <p className="text-zinc-300 text-sm">Transformando empresas juntos</p>
              </div>
            </div>
          </div>

          {/* FODA (SWOT) */}
          <div className="mt-8">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-black">Análisis Estratégico</h3>
              <p className="mt-2 text-sm text-zinc-500">Fortalezas, Debilidades, Oportunidades y Amenazas</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Fortalezas",
                  icon: Award,
                  color: "text-emerald-600 bg-emerald-50 border-emerald-200",
                  items: [
                    "Stack tecnológico moderno (Next.js, IA-ready)",
                    "Flujo multi-paso real con trazabilidad completa",
                    "Equipo con experiencia en transformación digital",
                    "Arquitectura escalable desde el día uno",
                  ],
                },
                {
                  title: "Debilidades",
                  icon: Target,
                  color: "text-red-600 bg-red-50 border-red-200",
                  items: [
                    "Marca nueva con poco reconocimiento de mercado",
                    "Sin casos de uso públicos masivos todavía",
                    "Equipo comercial en etapa de construcción",
                    "Dependencia inicial de canales digitales",
                  ],
                },
                {
                  title: "Oportunidades",
                  icon: TrendingUp,
                  color: "text-blue-600 bg-blue-50 border-blue-200",
                  items: [
                    "80% de empresas en LATAM sin automatizar procesos",
                    "Crecimiento del trabajo remoto exige herramientas digitales",
                    "Regulaciones que exigen trazabilidad y auditoría",
                    "Demanda creciente de soluciones no-code/low-code",
                  ],
                },
                {
                  title: "Amenazas",
                  icon: Shield,
                  color: "text-orange bg-orange/10 border-orange/30",
                  items: [
                    "Competidores internacionales con presupuestos grandes",
                    "Soluciones low-code genéricas que intentan cubrir el mismo espacio",
                    "Cambios regulatorios que requieran adaptación constante",
                    "Que el producto no escale al ritmo de la demanda",
                  ],
                },
              ].map((q) => (
                <div key={q.title} className={`rounded-xl border ${q.color} p-5`}>
                  <div className="flex items-center gap-3 mb-3">
                    <q.icon className={`h-5 w-5 ${q.title === "Fortalezas" || q.title === "Oportunidades" ? "text-emerald-600" : q.title === "Debilidades" ? "text-red-600" : q.title === "Amenazas" ? "text-orange" : "text-blue-600"}`} />
                    <h4 className="font-bold text-black">{q.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {q.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-zinc-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div className="mt-16 rounded-2xl bg-black p-10 sm:p-14">
            <div className="flex items-center gap-3 mb-8">
              <Award className="h-6 w-6 text-orange" />
              <h3 className="text-2xl font-bold text-white">Objetivos Estratégicos</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: "01", title: "Innovación", desc: "Desarrollar nuevas funcionalidades basadas en IA que anticipen las necesidades de nuestros clientes antes de que ellos las identifiquen." },
                { num: "02", title: "Expansión", desc: "Alcanzar presencia directa en 10 países de Latinoamérica para 2028, con equipos locales de soporte y consultoría." },
                { num: "03", title: "Excelencia", desc: "Mantener un NPS superior a 90 mediante mejora continua, atención personalizada y ciclos de feedback tempranos." },
              ].map((obj) => (
                <div key={obj.num} className="flex gap-4">
                  <span className="text-3xl font-bold text-orange/40 shrink-0">{obj.num}</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{obj.title}</h4>
                    <p className="mt-2 text-sm text-zinc-400">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-24 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-orange tracking-wide uppercase">Servicios</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-bold text-black tracking-tight">
              Soluciones personalizadas de automatización
            </p>
          <p className="mt-4 text-lg text-zinc-500">
                Automatización administrativa + desarrollo de apps móviles. Desde el concepto hasta el código.
              </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group relative rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-2xl hover:shadow-orange/10 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange to-orange-light rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange/20 to-orange/5 text-orange group-hover:from-orange group-hover:to-orange-dark group-hover:text-white transition-all duration-500 shadow-lg shadow-orange/5 group-hover:shadow-orange/20">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-black group-hover:text-orange transition-colors duration-300">{s.title}</h3>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-sm font-medium text-orange opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  Saber más <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LO QUE EL MERCADO BUSCA ===== */}
      <section id="market" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-orange tracking-wide uppercase">Mercado</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-bold text-black tracking-tight">
              Lo que el mercado busca
            </p>
            <p className="mt-4 text-lg text-zinc-500">
              Las empresas colombianas están contratando activamente profesionales en automatización e inteligencia artificial. Estas son las áreas con mayor demanda.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {marketDemands.map((d) => (
              <div key={d.title} className="group relative rounded-2xl border-2 border-orange/20 bg-gradient-to-br from-orange/5 to-orange/10 p-8 text-center hover:border-orange/50 hover:shadow-xl hover:shadow-orange/10 transition-all duration-500">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange text-white mx-auto shadow-lg shadow-orange/30">
                  <d.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-black">{d.title}</h3>
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-zinc-400">
              En FlowStack te preparamos para estas demandas del mercado con soluciones prácticas y resultados medibles.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONFIÁN EN NOSOTROS ===== */}
      <section id="trusted" className="py-24 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-orange tracking-wide uppercase">Confían en nosotros</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-bold text-black tracking-tight">
              Empresas que ya automatizan con FlowStack
            </p>
          <p className="mt-4 text-lg text-zinc-500">
                Desde agencias digitales hasta apps móviles y e-commerce — FlowStack potencia su operación.
              </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Nebula */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple text-white shadow-lg mb-4">
                <span className="text-xl font-bold">N</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Nebula</h3>
              <p className="text-sm text-zinc-500 mb-4">Agencia de Desarrollo Web</p>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />CRM integrado con WhatsApp + n8n</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />Cotizaciones automáticas</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />Seguimiento de proyectos en tiempo real</li>
              </ul>
            </div>

            {/* Mantus */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange text-white shadow-lg mb-4">
                <span className="text-xl font-bold">M</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Mantus</h3>
              <p className="text-sm text-zinc-500 mb-4">Mantenimiento Técnico Integral</p>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />Órdenes de trabajo automatizadas</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />Despacho de técnicos vía WhatsApp</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />Inventario de repuestos en tiempo real</li>
              </ul>
            </div>

            {/* FullSports */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg mb-4">
                <span className="text-xl font-bold">F</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">FullSports</h3>
              <p className="text-sm text-zinc-500 mb-4">Tienda Deportiva Online</p>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />Gestión de inventario automatizada</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />Procesamiento inteligente de pedidos</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />Sincronización multicanal de productos</li>
              </ul>
            </div>

            {/* MobileApp (case study) */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg mb-4">
                <Smartphone className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">App Móvil Demo</h3>
              <p className="text-sm text-zinc-500 mb-4">App móvil administrativa</p>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />Aprobaciones desde el celular</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />Dashboard móvil en tiempo real</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />Notificaciones push + offline</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
              Empresas colombianas de diversos sectores ya confían en FlowStack para automatizar procesos y desarrollar apps.
              ¿La próxima puede ser la tuya?
            </p>
          </div>
        </div>
      </section>

      {/* ===== DIFERENCIACIÓN vs ZAPIER/n8n ===== */}
      <section id="diferenciacion" className="py-24 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-orange tracking-wide uppercase">Diferenciación</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-bold text-black tracking-tight">
              Por qué FlowStack es diferente
            </p>
            <p className="mt-4 text-lg text-zinc-500">
              No somos una herramienta más de automatización. Estamos construidos para la empresa real.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Característica 1 */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <GitBranch className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-black">Aprobaciones multi-paso con auditoría</h3>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Flujos de aprobación con trazabilidad completa: cada acción queda registrada con quién, cuándo y por qué. 
                Ni <strong className="text-black">Zapier</strong> ni <strong className="text-black">n8n</strong> ofrecen trazabilidad 
                nativa ni control de versiones sobre aprobaciones. Nosotros sí.
              </p>
            </div>

            {/* Característica 2 */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-black">Precios claros desde $0</h3>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                <strong className="text-black">Zapier</strong> cobra desde $20/mes por 750 tareas.{" "}
                <strong className="text-black">n8n cloud</strong> desde $20/mes. 
                FlowStack arranca en <strong className="text-black">$0</strong> con 10 solicitudes/mes y 
                un plan Team desde $15/mes. Sin sorpresas ni escalas forzadas.
              </p>
            </div>

            {/* Característica 3 */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-black">Soporte en español, equipo local</h3>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Mientras otras plataformas tienen soporte en inglés con chatbots, nosotros tenemos 
                un <strong className="text-black">equipo en Bogotá</strong> que habla tu idioma y 
                entiende tu negocio. Onboarding personalizado sin importar el plan.
              </p>
            </div>

            {/* Característica 4 */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-black">Todo en un solo stack integrado</h3>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Zapier conecta apps, n8n orquesta APIs, Power BI visualiza. Nosotros hacemos 
                <strong className="text-black"> todo en uno</strong>: procesos + dashboard + IA + 
                trazabilidad. Una plataforma, un login, un proveedor. Menos fricción, más resultados.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="#pricing" className="inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white hover:bg-orange-light transition-colors shadow-lg shadow-orange/25">
              Ver planes <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-orange tracking-wide uppercase">Casos de éxito</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-bold text-black tracking-tight">
              Líderes que ya confiaron en nosotros
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-zinc-200 bg-white p-8 relative">
                <Quote className="h-8 w-8 text-orange/20 absolute top-6 right-6" />
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange text-orange" />
                  ))}
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 pt-6 border-t border-zinc-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full ring-2 ring-orange/20"
                  />
                  <div>
                    <p className="text-sm font-semibold text-black">{t.name}</p>
                    <p className="text-xs text-zinc-400">{t.role} · {t.sector}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONFIANZA / ISO ===== */}
      <section id="trust" className="py-24 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-orange tracking-wide uppercase">Confianza y Cumplimiento</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-bold text-black tracking-tight">
              Certificaciones que respaldan tu tranquilidad
            </p>
            <p className="mt-4 text-lg text-zinc-500">
              Operamos bajo los más altos estándares de calidad y seguridad de la información.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200">
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">ISO 13485</h3>
                  <p className="text-sm text-zinc-400">Sistema de Gestión de Calidad</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Certificación internacional para sistemas de gestión de calidad en organizaciones 
                que participan en el diseño, producción, instalación y servicio de dispositivos 
                médicos y servicios relacionados. Garantiza que nuestros procesos cumplen con los 
                requisitos regulatorios más exigentes.
              </p>
            </div>

            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange to-orange-dark text-white shadow-lg shadow-orange-200">
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">ISO 27001</h3>
                  <p className="text-sm text-zinc-400">Sistema de Gestión de Seguridad de la Información</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Estándar internacional para la gestión de la seguridad de la información. 
                Asegura que implementamos controles robustos para proteger la confidencialidad, 
                integridad y disponibilidad de tus datos. Auditado y certificado anualmente 
                por entidades acreditadas.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
              Nuestro compromiso con la calidad y seguridad significa que tu información está 
              protegida con los más altos estándares de la industria. Puedes enfocarte en tu 
              negocio, nosotros nos encargamos del resto.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-orange tracking-wide uppercase">Planes</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Elige el plan ideal para tu empresa
            </p>
            <p className="mt-4 text-lg text-zinc-400">
              Escala desde el plan gratuito hasta la solución enterprise. Sin sorpresas, sin letra chica.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-orange/30 hover:-translate-y-1 transition-all duration-300">
              <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">Starter</p>
              <p className="mt-4">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-zinc-500 text-sm ml-1">/mes</span>
              </p>
              <p className="mt-2 text-sm text-zinc-500">Perfecto para empezar</p>
              <ul className="mt-8 space-y-3">
                {["Hasta 3 procesos", "10 solicitudes/mes", "1 usuario", "Dashboard básico", "Soporte por email"].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-400">
                    <CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/login" className="mt-8 block w-full rounded-lg border border-zinc-700 py-3 text-sm font-semibold text-center text-zinc-300 hover:bg-white/5 hover:text-white transition-colors">
                Comenzar gratis
              </a>
            </div>

            {/* Team - New */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-orange/30 hover:-translate-y-1 transition-all duration-300">
              <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">Team</p>
              <p className="mt-4">
                <span className="text-4xl font-bold text-white">$15</span>
                <span className="text-zinc-500 text-sm ml-1">/mes</span>
              </p>
              <p className="mt-2 text-sm text-zinc-500">Para micro-PyMEs</p>
              <ul className="mt-8 space-y-3">
                {["Hasta 10 procesos", "100 solicitudes/mes", "Hasta 5 usuarios", "Dashboard avanzado", "Flujos multi-paso", "Soporte prioritario"].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-400">
                    <CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/login" className="mt-8 block w-full rounded-lg border border-zinc-700 py-3 text-sm font-semibold text-center text-zinc-300 hover:bg-white/5 hover:text-white transition-colors">
                Comenzar prueba
              </a>
            </div>

            {/* Professional - Highlighted */}
            <div className="relative rounded-2xl border-2 border-orange bg-zinc-900 p-8 shadow-2xl shadow-orange/20 -translate-y-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange px-4 py-1 text-xs font-bold text-white shadow-lg shadow-orange/30">
                Más popular
              </div>
              <p className="text-sm font-semibold text-orange uppercase tracking-wide">Professional</p>
              <p className="mt-4">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-zinc-500 text-sm ml-1">/mes</span>
              </p>
              <p className="mt-2 text-sm text-zinc-500">Para equipos en crecimiento</p>
              <ul className="mt-8 space-y-3">
                {["Procesos ilimitados", "500 solicitudes/mes", "Hasta 10 usuarios", "Dashboard avanzado + gráficos", "Flujos multi-paso", "Soporte prioritario"].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/login" className="mt-8 block w-full rounded-lg bg-orange py-3 text-sm font-semibold text-center text-white hover:bg-orange-light transition-colors shadow-lg shadow-orange/25">
                Probar gratis 14 días
              </a>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-orange/30 hover:-translate-y-1 transition-all duration-300">
              <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">Enterprise</p>
              <p className="mt-4">
                <span className="text-4xl font-bold text-white">Personalizado</span>
              </p>
              <p className="mt-2 text-sm text-zinc-500">Para grandes organizaciones</p>
              <ul className="mt-8 space-y-3">
                {["Todo lo de Professional", "Solicitudes ilimitadas", "Usuarios ilimitados", "API dedicada + Webhooks", "SLA garantizado 99.9%", "Soporte 24/7 dedicado", "Desarrollo apps móviles (bajo proyecto)", "Onboarding personalizado"].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-400">
                    <CheckCircle className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-8 block w-full rounded-lg border border-zinc-700 py-3 text-sm font-semibold text-center text-zinc-300 hover:bg-white/5 hover:text-white transition-colors">
                Contactar ventas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section id="contact" className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange to-orange-dark p-12 sm:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                ¿Listo para transformar tu empresa?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Agenda una llamada con nuestro equipo y descubre cómo podemos ayudarte 
                a automatizar procesos y desarrollar apps móviles en tiempo récord.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#hero" className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-orange hover:bg-zinc-100 transition-colors shadow-xl">
                  Solicitar demo <ChevronRight className="h-5 w-5" />
                </a>
                <a href="tel:+573114663373" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors">
                  Llamar ahora
                </a>
                <WhatsAppButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2.5">
              <img src="/images/flowstack-logo.svg" alt="FlowStack" className="h-8" />
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
              <a href="#hero" className="hover:text-white transition-colors">Inicio</a>
              <a href="#about" className="hover:text-white transition-colors">Nosotros</a>
              <a href="#services" className="hover:text-white transition-colors">Servicios</a>
              <a href="#testimonials" className="hover:text-white transition-colors">Casos de éxito</a>
              <a href="/demo" className="hover:text-white transition-colors">Demo</a>
              <a href="/login" className="hover:text-white transition-colors">Iniciar sesión</a>
              <a href="https://capacitacion-fredy.vercel.app" className="hover:text-white transition-colors">Capacitaciones</a>
              <a href="#" className="hover:text-white transition-colors">Política de privacidad</a>
            </div>
            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} FlowStack. Todos los derechos reservados.
            </p>
            <p className="text-xs text-zinc-600 mt-1">
              Desarrollado por{" "}
              <a href="https://nebula.agencia" className="text-purple hover:text-purple-light transition-colors">
                Nebula
              </a>{" "}
              — Marketing digital y diseño web
            </p>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}
