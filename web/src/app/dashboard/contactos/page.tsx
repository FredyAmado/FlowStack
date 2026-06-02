"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Building, Calendar, MessageSquare, ExternalLink } from "lucide-react";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  source: string;
  createdAt: string;
};

export default function ContactosPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data) => setContacts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Contactos</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {contacts.length} {contacts.length === 1 ? "persona" : "personas"} han contactado
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-400">Cargando...</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20 text-zinc-400">Aún no hay contactos.</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-2 max-h-[70vh] overflow-y-auto pr-2">
            {contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left rounded-xl border p-4 transition-all ${
                  selected?.id === c.id
                    ? "border-orange bg-orange/5 shadow-sm"
                    : "border-zinc-200 bg-white hover:border-orange/30 hover:shadow-sm"
                }`}
              >
                <p className="font-semibold text-sm text-black">{c.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{c.email}</p>
                <p className="text-xs text-zinc-400 mt-1">{new Date(c.createdAt).toLocaleDateString("es")}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selected ? (
              <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-black">{selected.name}</h2>
                    <p className="text-sm text-zinc-500 mt-0.5">
                      {new Date(selected.createdAt).toLocaleDateString("es", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-medium text-orange">
                    {selected.source}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3">
                    <Mail className="h-4 w-4 text-orange shrink-0" />
                    <div>
                      <p className="text-xs text-zinc-400">Email</p>
                      <a href={`mailto:${selected.email}`} className="text-sm text-black hover:text-orange">
                        {selected.email}
                      </a>
                    </div>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3">
                      <Phone className="h-4 w-4 text-orange shrink-0" />
                      <div>
                        <p className="text-xs text-zinc-400">Teléfono</p>
                        <p className="text-sm text-black">{selected.phone}</p>
                      </div>
                    </div>
                  )}
                  {selected.company && (
                    <div className="flex items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3">
                      <Building className="h-4 w-4 text-orange shrink-0" />
                      <div>
                        <p className="text-xs text-zinc-400">Empresa</p>
                        <p className="text-sm text-black">{selected.company}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3">
                    <Calendar className="h-4 w-4 text-orange shrink-0" />
                    <div>
                      <p className="text-xs text-zinc-400">ID Contacto</p>
                      <p className="text-sm text-black">#{selected.id}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-orange" />
                    <p className="text-sm font-semibold text-black">Mensaje</p>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-4 text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href={`mailto:${selected.email}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange-light transition-colors"
                  >
                    Responder <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-zinc-200 bg-white p-20 text-center text-zinc-400">
                Selecciona un contacto para ver los detalles
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
