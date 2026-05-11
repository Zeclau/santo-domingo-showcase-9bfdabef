import { useEffect, useState } from "react";
import { Phone, MessageCircle, Mail, UserPlus, Loader2, X, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn } from "./FadeIn";
import kwLogo from "@/assets/kw-logo.png";

type Agent = {
  id: string;
  name: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  photo_url: string | null;
  agency: string | null;
  created_at: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

function waLink(num: string) {
  const clean = num.replace(/[^\d+]/g, "");
  return `https://wa.me/${clean.replace(/^\+/, "")}`;
}

export function AgentsSection() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    agency: "",
    photo_url: "",
  });
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAgents(data as Agent[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const channel = supabase
      .channel("agents-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "agents" },
        (payload) => {
          setAgents((prev) => [payload.new as Agent, ...prev]);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("agents").insert({
      name: form.name.trim().slice(0, 100),
      phone: form.phone.trim() || null,
      whatsapp: form.whatsapp.trim() || form.phone.trim() || null,
      email: form.email.trim() || null,
      agency: form.agency.trim() || null,
      photo_url: form.photo_url.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      setError("No se pudo registrar. Verifica los datos e intenta de nuevo.");
      return;
    }
    setForm({ name: "", phone: "", whatsapp: "", email: "", agency: "", photo_url: "" });
    setOpen(false);
  };

  return (
    <section
      id="agentes"
      className="relative overflow-hidden bg-slate-900 px-6 py-24 text-white md:py-32"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, oklch(0.72 0.14 70) 0%, transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.72 0.14 70) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <FadeIn className="mb-12 text-center md:mb-16">
          <div className="flex justify-center">
            <img
              src={kwLogo}
              alt="Keller Williams Nicaragua"
              width={96}
              height={96}
              loading="lazy"
              className="h-20 w-auto md:h-24"
            />
          </div>
          <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Agenda tu Visita Privada
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl">Agentes Disponibles</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Elige el agente con el que quieres coordinar tu visita. ¿Eres agente
            inmobiliario? Únete a la lista y muestra tu contacto a los visitantes.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-900/30 transition hover:bg-amber-500"
          >
            <UserPlus className="h-5 w-5" />
            Registrarme como agente
          </button>
        </FadeIn>

        {loading ? (
          <div className="flex justify-center py-12 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : agents.length === 0 ? (
          <FadeIn className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-300">
            <p>Aún no hay agentes registrados.</p>
            <p className="mt-2 text-sm text-slate-400">
              Sé el primero en aparecer aquí — visible para todos los visitantes.
            </p>
          </FadeIn>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, i) => (
              <FadeIn key={agent.id} delay={i * 0.05}>
                <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-amber-400/40 hover:bg-white/[0.07]">
                  <div className="flex items-center gap-4">
                    {agent.photo_url ? (
                      <img
                        src={agent.photo_url}
                        alt={agent.name}
                        loading="lazy"
                        className="h-16 w-16 rounded-full object-cover ring-2 ring-amber-400/40"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-600/20 text-lg font-semibold text-amber-300 ring-2 ring-amber-400/40">
                        {initials(agent.name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="truncate font-serif text-xl text-white">{agent.name}</h3>
                      {agent.agency && (
                        <p className="truncate text-sm text-amber-200/80">{agent.agency}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    {agent.whatsapp && (
                      <a
                        href={waLink(agent.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-500"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    )}
                    {agent.phone && (
                      <a
                        href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
                      >
                        <Phone className="h-4 w-4 text-amber-300" />
                        {agent.phone}
                      </a>
                    )}
                    {agent.email && (
                      <a
                        href={`mailto:${agent.email}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white"
                      >
                        <Mail className="h-4 w-4 text-amber-300" />
                        <span className="truncate">{agent.email}</span>
                      </a>
                    )}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-serif text-2xl">Registrarme como agente</h3>
            <p className="mt-2 text-sm text-slate-500">
              Tu información será visible públicamente en esta página.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Nombre completo *
                </label>
                <input
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  placeholder="Ej. Ligia Donaire"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Teléfono
                  </label>
                  <input
                    maxLength={30}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    placeholder="+505 …"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    WhatsApp
                  </label>
                  <input
                    maxLength={30}
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    placeholder="+505 …"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Email
                </label>
                <input
                  type="email"
                  maxLength={200}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  placeholder="agente@correo.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Agencia
                </label>
                <input
                  maxLength={100}
                  value={form.agency}
                  onChange={(e) => setForm({ ...form, agency: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  placeholder="Keller Williams Nicaragua"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  URL de foto (opcional)
                </label>
                <input
                  maxLength={500}
                  value={form.photo_url}
                  onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  placeholder="https://…"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-500 disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                Publicar mi contacto
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
