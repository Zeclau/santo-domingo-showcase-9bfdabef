import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Waves, UtensilsCrossed, Sparkles, TrendingUp,
  MapPin, Calendar, ArrowDown, Play,
} from "lucide-react";
import { Lightbox, type LightboxImage } from "@/components/Lightbox";
import { FadeIn } from "@/components/FadeIn";
import { AgentsSection } from "@/components/AgentsSection";

import heroTerrace from "@/assets/hero-terrace.jpg";
import living from "@/assets/living.jpg";
import living2 from "@/assets/living-2.jpg";
import kitchen1 from "@/assets/kitchen-1.jpg";
import kitchen2 from "@/assets/kitchen-2.jpg";
import bedroom1 from "@/assets/bedroom-1.jpg";
import bedroom2 from "@/assets/bedroom-2.jpg";
import walkin from "@/assets/walkin-closet.jpg";
import bath1 from "@/assets/bathroom-1.jpg";
import bath2 from "@/assets/bathroom-2.jpg";
import extra1 from "@/assets/extra-1.jpg";
import extra2 from "@/assets/extra-2.jpg";
import extra3 from "@/assets/extra-3.jpg";
import extra4 from "@/assets/extra-4.jpg";
import extra5 from "@/assets/extra-5.jpg";

const videos = [
  { src: "/videos/tour-1.mp4", poster: extra1 },
  { src: "/videos/tour-2.mp4", poster: extra2 },
  { src: "/videos/tour-3.mp4", poster: extra3 },
  { src: "/videos/tour-4.mp4", poster: extra4 },
  { src: "/videos/tour-5.mp4", poster: extra5 },
];

const PHONE = "+50587607418";
const PHONE_DISPLAY = "+505 8760-7418";
const WHATSAPP_MSG = encodeURIComponent(
  "Hola Ligia, me interesa la Residencia de Lujo en Lomas de Santo Domingo. Quisiera agendar una visita privada."
);
const WHATSAPP_URL = `https://wa.me/50587607418?text=${WHATSAPP_MSG}`;
const TEL_URL = `tel:${PHONE}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Residencia de Lujo Moderna en Lomas de Santo Domingo | Ligia Donaire" },
      { name: "description", content: "Exclusiva residencia premium en Lomas de Santo Domingo, Managua. Piscina privada, terraza con bar, walk-in closet y acabados de lujo. Agenda tu visita privada." },
      { property: "og:title", content: "Residencia de Lujo en Lomas de Santo Domingo" },
      { property: "og:description", content: "Diseño de concepto abierto, piscina privada y acabados premium. Una propiedad única en Managua." },
      { property: "og:image", content: heroTerrace },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroTerrace },
    ],
  }),
  component: Landing,
});

const galleryImages: LightboxImage[] = [
  { src: living, alt: "Sala principal con vista al jardín y piscina" },
  { src: bedroom1, alt: "Habitación principal iluminada" },
  { src: walkin, alt: "Walk-in closet de madera personalizado" },
  { src: bath1, alt: "Baño principal con tina y acabados premium" },
  { src: kitchen1, alt: "Cocina moderna con isla" },
  { src: bedroom2, alt: "Habitación secundaria con luz natural" },
  { src: kitchen2, alt: "Cocina equipada con isla y barra" },
  { src: living2, alt: "Sala de estar con cielo raso decorativo" },
  { src: bath2, alt: "Baño secundario con ducha de vidrio" },
  { src: extra1, alt: "Terraza con bar y pérgola de madera" },
  { src: extra2, alt: "Fachada posterior con jardín amplio" },
  { src: extra3, alt: "Vista a la piscina desde la terraza techada" },
  { src: extra4, alt: "Sala abierta con vista al jardín y piscina" },
  { src: extra5, alt: "Piscina privada con mosaico azul" },
  ...videos.map((v, i) => ({
    src: v.src,
    poster: v.poster,
    type: "video" as const,
    alt: `Video tour ${i + 1} de la propiedad`,
  })),
];

const stats = [
  { icon: Waves, label: "Piscina Privada" },
  { icon: UtensilsCrossed, label: "Terraza & Bar" },
  { icon: Sparkles, label: "Acabados Premium" },
  { icon: TrendingUp, label: "Alta Plusvalía" },
];

const features = [
  "Diseño de concepto abierto",
  "Piscina privada con jardín tropical",
  "Terraza techada con área de bar",
  "Walk-in closet espacioso de madera",
  "Baño principal con tina y acabados premium",
  "Cocina con isla y equipamiento de alta gama",
];

function Landing() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Bento: layout slots for each gallery item (images + videos)
  const bento = useMemo(() => {
    const slots: string[] = [
      "md:col-span-2 md:row-span-2",
      "",
      "",
      "",
      "",
      "md:col-span-2",
      "",
      "",
      "",
      "md:col-span-2",
      "",
      "",
      "md:col-span-2 md:row-span-2",
      "",
      "",
    ];
    return galleryImages.map((img, i) => ({
      img,
      cls: slots[i] ?? "",
    }));
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          src={heroTerrace}
          alt="Vista panorámica de terraza y piscina"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/85" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex items-center gap-2 text-amber-400"
          >
            <div className="h-px w-10 bg-amber-400" />
            <span className="text-xs font-medium uppercase tracking-[0.25em]">Lomas de Santo Domingo · Managua</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Exclusividad y Confort en{" "}
            <span className="text-amber-400">Lomas de Santo Domingo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-5 max-w-xl text-base text-slate-200/90 md:text-lg"
          >
            Residencia moderna de lujo con piscina privada, terraza con bar y
            acabados premium. Una oportunidad única para vivir con distinción.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-amber-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-900/30 transition hover:bg-amber-500 hover:shadow-xl hover:shadow-amber-900/40 md:text-base"
            >
              <Calendar className="h-5 w-5" />
              Agendar Visita Privada
            </a>
            <a
              href="#galeria"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15 md:text-base"
            >
              Ver Galería
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="relative z-20 -mt-16 px-4 md:-mt-20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 rounded-2xl bg-white p-4 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-100 md:grid-cols-4 md:gap-4 md:p-6">
          {stats.map(({ icon: Icon, label }, i) => (
            <FadeIn key={label} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-3 rounded-xl p-4 text-center transition hover:bg-slate-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-slate-900 md:text-base">{label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">La Propiedad</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-900 md:text-5xl">
              Residencia de Lujo Moderna en Lomas de Santo Domingo
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
              Una propiedad pensada para quienes buscan privacidad, diseño y
              calidad. Espacios abiertos llenos de luz natural, jardines
              tropicales, una piscina privada y terraza con bar perfecta para
              recibir. Cada detalle ha sido cuidado con acabados de alta gama.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 border-b border-slate-100 pb-4">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-amber-600" />
                  <span className="text-base text-slate-800">{f}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* GALLERY - BENTO */}
      <section id="galeria" className="bg-slate-50 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-12 text-center md:mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">Galería</span>
            <h2 className="mt-3 font-serif text-3xl text-slate-900 md:text-5xl">
              Descubre cada espacio
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Haz clic en cualquier imagen para explorar la propiedad en pantalla completa.
            </p>
          </FadeIn>

          <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
            {bento.map((item, i) => {
              const isVideo = item.img.type === "video";
              const thumb = item.img.poster ?? item.img.src;
              return (
                <FadeIn
                  key={i}
                  delay={i * 0.05}
                  className={`group relative cursor-pointer overflow-hidden rounded-lg ring-1 ring-slate-200 ${item.cls}`}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <img
                      src={thumb}
                      alt={item.img.alt}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {isVideo && (
                      <>
                        <div className="absolute inset-0 bg-slate-950/30" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600/95 text-white shadow-xl ring-4 ring-white/30 transition group-hover:scale-110 md:h-16 md:w-16">
                            <Play className="ml-0.5 h-6 w-6 fill-current" />
                          </div>
                        </div>
                        <div className="absolute left-3 top-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                          Video
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-sm font-medium text-white">{item.img.alt}</p>
                    </div>
                    <div className="pointer-events-none absolute inset-0 ring-0 ring-amber-400/0 transition-all duration-500 group-hover:ring-2 group-hover:ring-amber-400/60" />
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn className="mt-8 text-center">
            <button
              onClick={() => setLightboxIndex(0)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-900 px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
              Ver galería completa ({galleryImages.length})
            </button>
          </FadeIn>
        </div>
      </section>

      {/* MAP */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-10 md:mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">Ubicación</span>
            <h2 className="mt-3 font-serif text-3xl text-slate-900 md:text-5xl">
              Lomas de Santo Domingo, Managua
            </h2>
            <p className="mt-4 flex items-center gap-2 text-slate-600">
              <MapPin className="h-4 w-4 text-amber-600" />
              12.0837220, -86.2421075
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200">
            <iframe
              title="Ubicación de la propiedad"
              src="https://maps.google.com/maps?q=12.0837220,-86.2421075&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="h-[420px] w-full md:h-[520px]"
              style={{ filter: "grayscale(0.3) contrast(1.05)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </FadeIn>
        </div>
      </section>

      {/* AGENTS LIST (Cloud-connected) */}
      <AgentsSection />

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-sm text-slate-500 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Residencia Lomas de Santo Domingo</p>
          <p>
            Desarrollo tecnológico por{" "}
            <span className="font-semibold text-slate-900">Sacuanjoche.dev</span>{" "}
            · Marketing Inmobiliario Premium
          </p>
        </div>
      </footer>

      <Lightbox
        images={galleryImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </main>
  );
}
