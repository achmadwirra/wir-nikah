"use client";

import { useEffect, useState, useRef, useCallback, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Volume2,
  VolumeX,
  Send,
  Users,
  Play,
  Pause,
  Music,
  X,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type TemplateName =
  | "ELEGANT_GOLD"
  | "GARDEN_ROMANCE"
  | "MODERN_MINIMALIST"
  | "RUSTIC_VINTAGE"
  | "JAVANESE_TRADITIONAL"
  | "ISLAMIC_ELEGANT"
  | "CHERRY_BLOSSOM"
  | "NAVY_LUXURY"
  | "TROPICAL_PARADISE"
  | "SAGE_EUCALYPTUS";

interface InvitationData {
  id: string;
  slug: string;
  template: TemplateName;
  groomName: string;
  groomFullName: string;
  groomParents: string;
  groomPhoto: string;
  groomInstagram: string;
  brideName: string;
  brideFullName: string;
  brideParents: string;
  bridePhoto: string;
  brideInstagram: string;
  akadDate: string;
  akadTime: string;
  akadVenue: string;
  akadAddress: string;
  resepsiDate: string;
  resepsiTime: string;
  resepsiVenue: string;
  resepsiAddress: string;
  mapsLink: string;
  gallery: string[];
  galleryCaptions: string[];
  quote: string;
  message: string;
  musicChoice: string;
  rsvps: {
    id: string;
    name: string;
    attendance: string;
    guests: number;
    message: string;
    createdAt: string;
  }[];
}

// ─────────────────────────────────────────────────────────────
// Template Styles
// ─────────────────────────────────────────────────────────────

interface TemplateStyle {
  bgColor: string;
  bgGradient: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  textMuted: string;
  cardBg: string;
  borderColor: string;
  buttonBg: string;
  buttonText: string;
  fontClass: string;
  ornamentChar: string;
}

const templateStyles: Record<TemplateName, TemplateStyle> = {
  ELEGANT_GOLD: {
    bgColor: "#FFFDF7",
    bgGradient: "linear-gradient(180deg, #FFFDF7 0%, #FFF8E7 30%, #FFFDF7 60%, #FFF8E7 100%)",
    primaryColor: "#B8860B",
    secondaryColor: "#D4A843",
    textColor: "#3D2B1F",
    textMuted: "#7A6348",
    cardBg: "rgba(255,255,255,0.85)",
    borderColor: "#D4A843",
    buttonBg: "#B8860B",
    buttonText: "#FFFFFF",
    fontClass: "font-serif",
    ornamentChar: "✦",
  },
  GARDEN_ROMANCE: {
    bgColor: "#FFFBFC",
    bgGradient: "linear-gradient(180deg, #FFFBFC 0%, #FFF0F3 30%, #F0FFF4 60%, #FFFBFC 100%)",
    primaryColor: "#BE185D",
    secondaryColor: "#4A7C59",
    textColor: "#1F2937",
    textMuted: "#6B7280",
    cardBg: "rgba(255,255,255,0.9)",
    borderColor: "#F9A8D4",
    buttonBg: "#BE185D",
    buttonText: "#FFFFFF",
    fontClass: "font-serif",
    ornamentChar: "❀",
  },
  MODERN_MINIMALIST: {
    bgColor: "#FFFFFF",
    bgGradient: "linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 30%, #FFFFFF 60%, #F9FAFB 100%)",
    primaryColor: "#111827",
    secondaryColor: "#6B7280",
    textColor: "#111827",
    textMuted: "#6B7280",
    cardBg: "rgba(249,250,251,0.9)",
    borderColor: "#E5E7EB",
    buttonBg: "#111827",
    buttonText: "#FFFFFF",
    fontClass: "font-sans",
    ornamentChar: "◆",
  },
  RUSTIC_VINTAGE: {
    bgColor: "#FAF5EF",
    bgGradient: "linear-gradient(180deg, #FAF5EF 0%, #F5EBE0 30%, #FAF5EF 60%, #F5EBE0 100%)",
    primaryColor: "#8B4513",
    secondaryColor: "#A0522D",
    textColor: "#3E2723",
    textMuted: "#6D4C41",
    cardBg: "rgba(255,253,248,0.85)",
    borderColor: "#D2B48C",
    buttonBg: "#8B4513",
    buttonText: "#FFFFFF",
    fontClass: "font-serif",
    ornamentChar: "❧",
  },
  JAVANESE_TRADITIONAL: {
    bgColor: "#FFF8F0",
    bgGradient: "linear-gradient(180deg, #2D0A0A 0%, #4A1010 30%, #2D0A0A 60%, #1A0505 100%)",
    primaryColor: "#FFD700",
    secondaryColor: "#DAA520",
    textColor: "#FFF8DC",
    textMuted: "#F5DEB3",
    cardBg: "rgba(74,16,16,0.7)",
    borderColor: "#FFD700",
    buttonBg: "#DAA520",
    buttonText: "#1A0505",
    fontClass: "font-serif",
    ornamentChar: "✦",
  },
  ISLAMIC_ELEGANT: {
    bgColor: "#F0FFF4",
    bgGradient: "linear-gradient(180deg, #F0FFF4 0%, #ECFDF5 30%, #F0FFF4 60%, #ECFDF5 100%)",
    primaryColor: "#166534",
    secondaryColor: "#B8860B",
    textColor: "#14532D",
    textMuted: "#3F6212",
    cardBg: "rgba(255,255,255,0.88)",
    borderColor: "#86EFAC",
    buttonBg: "#166534",
    buttonText: "#FFFFFF",
    fontClass: "font-serif",
    ornamentChar: "❋",
  },
  CHERRY_BLOSSOM: {
    bgColor: "#FFF5F7",
    bgGradient: "linear-gradient(180deg, #FFF5F7 0%, #FFE4E9 30%, #FFF5F7 60%, #FFE4E9 100%)",
    primaryColor: "#EC4899",
    secondaryColor: "#F9A8D4",
    textColor: "#831843",
    textMuted: "#9D174D",
    cardBg: "rgba(255,255,255,0.85)",
    borderColor: "#FBCFE8",
    buttonBg: "#EC4899",
    buttonText: "#FFFFFF",
    fontClass: "font-sans",
    ornamentChar: "✿",
  },
  NAVY_LUXURY: {
    bgColor: "#0F172A",
    bgGradient: "linear-gradient(180deg, #0F172A 0%, #1E293B 30%, #0F172A 60%, #1E293B 100%)",
    primaryColor: "#C9A961",
    secondaryColor: "#E2C97E",
    textColor: "#F8FAFC",
    textMuted: "#CBD5E1",
    cardBg: "rgba(30,41,59,0.8)",
    borderColor: "#C9A961",
    buttonBg: "#C9A961",
    buttonText: "#0F172A",
    fontClass: "font-serif",
    ornamentChar: "✦",
  },
  TROPICAL_PARADISE: {
    bgColor: "#F0FDFA",
    bgGradient: "linear-gradient(180deg, #F0FDFA 0%, #E0F7FA 30%, #F0FDFA 60%, #E0F7FA 100%)",
    primaryColor: "#0D9488",
    secondaryColor: "#F97316",
    textColor: "#134E4A",
    textMuted: "#5EEAD4",
    cardBg: "rgba(255,255,255,0.88)",
    borderColor: "#5EEAD4",
    buttonBg: "#0D9488",
    buttonText: "#FFFFFF",
    fontClass: "font-sans",
    ornamentChar: "❋",
  },
  SAGE_EUCALYPTUS: {
    bgColor: "#F8FAF5",
    bgGradient: "linear-gradient(180deg, #F8FAF5 0%, #ECFCCB 30%, #F8FAF5 60%, #ECFCCB 100%)",
    primaryColor: "#4D7C0F",
    secondaryColor: "#84CC16",
    textColor: "#1A2E05",
    textMuted: "#4D7C0F",
    cardBg: "rgba(255,255,255,0.88)",
    borderColor: "#BEF264",
    buttonBg: "#4D7C0F",
    buttonText: "#FFFFFF",
    fontClass: "font-sans",
    ornamentChar: "❦",
  },
};

// ─────────────────────────────────────────────────────────────
// Ornamental Components
// ─────────────────────────────────────────────────────────────

function OrnamentalDivider({ color, char }: { color: string; char: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-6 select-none">
      <span
        className="block h-px w-12 sm:w-20"
        style={{ background: `linear-gradient(to right, transparent, ${color})` }}
      />
      <span style={{ color }} className="text-lg">
        {char}
      </span>
      <span
        className="block h-px w-12 sm:w-20"
        style={{ background: `linear-gradient(to left, transparent, ${color})` }}
      />
    </div>
  );
}

function OrnamentalFrame({
  children,
  style,
}: {
  children: React.ReactNode;
  style: TemplateStyle;
}) {
  return (
    <div
      className="relative rounded-2xl p-6 sm:p-8"
      style={{
        background: style.cardBg,
        border: `2px solid ${style.borderColor}`,
        boxShadow: `0 0 30px ${style.borderColor}22, inset 0 0 30px ${style.borderColor}08`,
      }}
    >
      {/* Corner ornaments */}
      <span
        className="absolute top-2 left-3 text-xl select-none opacity-60"
        style={{ color: style.borderColor }}
      >
        ❦
      </span>
      <span
        className="absolute top-2 right-3 text-xl select-none opacity-60"
        style={{ color: style.borderColor, transform: "scaleX(-1)" }}
      >
        ❦
      </span>
      <span
        className="absolute bottom-2 left-3 text-xl select-none opacity-60"
        style={{ color: style.borderColor, transform: "scaleY(-1)" }}
      >
        ❦
      </span>
      <span
        className="absolute bottom-2 right-3 text-xl select-none opacity-60"
        style={{ color: style.borderColor, transform: "scale(-1)" }}
      >
        ❦
      </span>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section Wrapper with Scroll Animation
// ─────────────────────────────────────────────────────────────

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────────────────────

export default function UndanganPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [data, setData] = useState<InvitationData | null>(null);
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    attendance: "HADIR",
    guests: 1,
    message: "",
  });
  const [rsvpSent, setRsvpSent] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Fetch invitation data
  useEffect(() => {
    fetch(`/api/undangan/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setData(d);
      })
      .catch(() => {});
  }, [slug]);

  // Countdown timer
  useEffect(() => {
    if (!data) return;
    const target = new Date(`${data.akadDate}T${data.akadTime}`).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setRsvpLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rsvpForm, invitationId: data.id }),
      });
      if (res.ok) {
        setRsvpSent(true);
        const newRsvp = await res.json();
        setData((prev) =>
          prev ? { ...prev, rsvps: [newRsvp, ...prev.rsvps] } : prev
        );
      }
    } catch {
      alert("Gagal mengirim RSVP. Silakan coba lagi.");
    } finally {
      setRsvpLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ─── Loading State ───
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart className="w-14 h-14 text-amber-400 mx-auto fill-amber-200" />
          </motion.div>
          <p className="mt-6 text-amber-700 font-serif text-lg">
            Memuat undangan...
          </p>
        </div>
      </div>
    );
  }

  const s = templateStyles[data.template];

  return (
    <div
      className={`min-h-screen ${s.fontClass}`}
      style={{ background: s.bgGradient, color: s.textColor }}
    >
      {/* Audio Element */}
      <audio ref={audioRef} loop preload="none">
        <source src="/music/romantic.mp3" type="audio/mpeg" />
      </audio>

      {/* ═══════════════════════════════════════════════════════════
          OPENING SCREEN
      ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{ background: s.bgGradient }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative border frame */}
            <div
              className="absolute inset-4 sm:inset-8 rounded-3xl pointer-events-none"
              style={{
                border: `2px solid ${s.borderColor}`,
                boxShadow: `inset 0 0 60px ${s.primaryColor}10`,
              }}
            />
            {/* Corner decorations */}
            <span
              className="absolute top-8 left-8 sm:top-12 sm:left-12 text-3xl sm:text-4xl select-none opacity-40"
              style={{ color: s.primaryColor }}
            >
              ❦
            </span>
            <span
              className="absolute top-8 right-8 sm:top-12 sm:right-12 text-3xl sm:text-4xl select-none opacity-40"
              style={{ color: s.primaryColor, transform: "scaleX(-1)" }}
            >
              ❦
            </span>
            <span
              className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 text-3xl sm:text-4xl select-none opacity-40"
              style={{ color: s.primaryColor, transform: "scaleY(-1)" }}
            >
              ❦
            </span>
            <span
              className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 text-3xl sm:text-4xl select-none opacity-40"
              style={{ color: s.primaryColor, transform: "scale(-1)" }}
            >
              ❦
            </span>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center px-6 max-w-md"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm uppercase tracking-[0.4em] mb-6"
                style={{ color: s.textMuted }}
              >
                The Wedding of
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl sm:text-6xl font-bold mb-2"
                style={{ color: s.primaryColor }}
              >
                {data.groomName}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="my-3"
              >
                <span className="text-2xl" style={{ color: s.primaryColor }}>
                  &
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-4xl sm:text-6xl font-bold mb-6"
                style={{ color: s.primaryColor }}
              >
                {data.brideName}
              </motion.h1>

              <OrnamentalDivider color={s.borderColor} char={s.ornamentChar} />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm mb-2"
                style={{ color: s.textMuted }}
              >
                {formatDate(data.akadDate)}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 mb-6"
              >
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: s.textMuted }}>
                  Kepada Yth.
                </p>
                <p className="text-lg font-medium" style={{ color: s.textColor }}>
                  Bapak/Ibu/Saudara/i
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={handleOpen}
                className="relative px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                style={{
                  backgroundColor: s.buttonBg,
                  color: s.buttonText,
                }}
              >
                {/* Pulse ring */}
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ backgroundColor: s.buttonBg }}
                />
                <span className="relative flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Buka Undangan
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════ */}
      {opened && (
        <>
          {/* Music Player - Fixed Bottom */}
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <div
              className="mx-auto max-w-md flex items-center justify-between px-4 py-3 backdrop-blur-xl rounded-t-2xl shadow-2xl border-t"
              style={{
                background: `${s.cardBg}`,
                borderColor: s.borderColor,
              }}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMusic}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: s.buttonBg, color: s.buttonText }}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>
                <div>
                  <p className="text-xs font-medium" style={{ color: s.textColor }}>
                    Wedding Music
                  </p>
                  <p className="text-[10px]" style={{ color: s.textMuted }}>
                    {isPlaying ? "Now Playing" : "Paused"}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleMusic}
                className="p-2 rounded-full transition-all hover:scale-110"
                style={{ color: s.primaryColor }}
              >
                {isPlaying ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </button>
            </div>
          </motion.div>

          <div ref={contentRef}>
            {/* ─── Section 1: Bismillah ─── */}
            <Section id="bismillah">
              <div className="max-w-lg mx-auto text-center">
                <OrnamentalDivider color={s.borderColor} char={s.ornamentChar} />

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="text-3xl sm:text-4xl leading-relaxed mb-6 font-serif"
                  style={{ color: s.primaryColor }}
                  dir="rtl"
                >
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </motion.p>

                <OrnamentalFrame style={s}>
                  <p
                    className="text-xl sm:text-2xl leading-relaxed mb-4 font-serif"
                    style={{ color: s.primaryColor }}
                    dir="rtl"
                  >
                    وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
                    لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ
                    إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
                  </p>
                  <OrnamentalDivider color={s.borderColor} char="◆" />
                  <p
                    className="text-sm sm:text-base leading-relaxed italic"
                    style={{ color: s.textMuted }}
                  >
                    &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia
                    menciptakan pasangan-pasangan untukmu dari jenismu sendiri,
                    agar kamu cenderung dan merasa tenteram kepadanya, dan Dia
                    menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada
                    yang demikian itu benar-benar terdapat tanda-tanda (kebesaran
                    Allah) bagi kaum yang berpikir.&rdquo;
                  </p>
                  <p
                    className="text-xs mt-3 font-medium"
                    style={{ color: s.primaryColor }}
                  >
                    — QS. Ar-Rum: 21
                  </p>
                </OrnamentalFrame>

                <OrnamentalDivider color={s.borderColor} char={s.ornamentChar} />
              </div>
            </Section>

            {/* ─── Section 2: Mempelai ─── */}
            <Section id="mempelai">
              <div className="max-w-2xl mx-auto text-center w-full">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-lg sm:text-xl mb-2"
                  style={{ color: s.primaryColor }}
                >
                  Assalamualaikum Wr. Wb.
                </motion.p>
                <p
                  className="text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto"
                  style={{ color: s.textMuted }}
                >
                  Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
                  menyelenggarakan pernikahan putra-putri kami:
                </p>

                {/* Groom */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4">
                    {/* Decorative ring */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: `3px solid ${s.borderColor}`,
                        boxShadow: `0 0 20px ${s.borderColor}40`,
                      }}
                    />
                    <div
                      className="absolute -inset-2 rounded-full opacity-30"
                      style={{ border: `1px dashed ${s.borderColor}` }}
                    />
                    <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={data.groomPhoto || "/placeholder.jpg"}
                        alt={data.groomName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ color: s.primaryColor }}
                  >
                    {data.groomFullName}
                  </h3>
                  <p className="text-sm" style={{ color: s.textMuted }}>
                    Putra dari Bapak & Ibu
                  </p>
                  <p className="font-medium text-sm" style={{ color: s.textColor }}>
                    {data.groomParents}
                  </p>
                </motion.div>

                {/* Ornamental & */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="my-6"
                >
                  <span
                    className="inline-block text-5xl sm:text-6xl font-serif"
                    style={{ color: s.primaryColor }}
                  >
                    &amp;
                  </span>
                </motion.div>

                {/* Bride */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: `3px solid ${s.borderColor}`,
                        boxShadow: `0 0 20px ${s.borderColor}40`,
                      }}
                    />
                    <div
                      className="absolute -inset-2 rounded-full opacity-30"
                      style={{ border: `1px dashed ${s.borderColor}` }}
                    />
                    <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={data.bridePhoto || "/placeholder.jpg"}
                        alt={data.brideName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ color: s.primaryColor }}
                  >
                    {data.brideFullName}
                  </h3>
                  <p className="text-sm" style={{ color: s.textMuted }}>
                    Putri dari Bapak & Ibu
                  </p>
                  <p className="font-medium text-sm" style={{ color: s.textColor }}>
                    {data.brideParents}
                  </p>
                </motion.div>
              </div>
            </Section>

            {/* ─── Section 3: Countdown ─── */}
            <Section id="countdown">
              <div className="text-center max-w-lg mx-auto">
                <h2
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ color: s.primaryColor }}
                >
                  Menghitung Hari
                </h2>
                <p className="text-sm mb-8" style={{ color: s.textMuted }}>
                  {formatDate(data.akadDate)}
                </p>

                <div className="grid grid-cols-4 gap-3 sm:gap-5">
                  {(
                    [
                      { value: countdown.days, label: "Hari" },
                      { value: countdown.hours, label: "Jam" },
                      { value: countdown.minutes, label: "Menit" },
                      { value: countdown.seconds, label: "Detik" },
                    ] as const
                  ).map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="rounded-2xl p-4 sm:p-5 text-center"
                      style={{
                        background: s.cardBg,
                        border: `1.5px solid ${s.borderColor}`,
                        boxShadow: `0 4px 20px ${s.primaryColor}10`,
                      }}
                    >
                      <motion.p
                        key={item.value}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-2xl sm:text-4xl font-bold"
                        style={{ color: s.primaryColor }}
                      >
                        {String(item.value).padStart(2, "0")}
                      </motion.p>
                      <p
                        className="text-[10px] sm:text-xs mt-1 uppercase tracking-wider"
                        style={{ color: s.textMuted }}
                      >
                        {item.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* ─── Section 4: Acara ─── */}
            <Section id="acara">
              <div className="max-w-2xl mx-auto w-full text-center">
                <h2
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ color: s.primaryColor }}
                >
                  Jadwal Acara
                </h2>
                <OrnamentalDivider color={s.borderColor} char={s.ornamentChar} />

                <div className="grid sm:grid-cols-2 gap-5 mt-8">
                  {/* Akad Nikah */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl p-6 text-center"
                    style={{
                      background: s.cardBg,
                      border: `1.5px solid ${s.borderColor}`,
                      boxShadow: `0 8px 30px ${s.primaryColor}08`,
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor: `${s.primaryColor}15`,
                        color: s.primaryColor,
                      }}
                    >
                      🕌
                    </div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: s.primaryColor }}
                    >
                      Akad Nikah
                    </h3>
                    <div className="space-y-2">
                      <p
                        className="flex items-center justify-center gap-2 text-sm"
                        style={{ color: s.textColor }}
                      >
                        <Calendar className="w-4 h-4" style={{ color: s.primaryColor }} />
                        {formatDate(data.akadDate)}
                      </p>
                      <p
                        className="flex items-center justify-center gap-2 text-sm font-medium"
                        style={{ color: s.textColor }}
                      >
                        <Clock className="w-4 h-4" style={{ color: s.primaryColor }} />
                        {data.akadTime} WIB
                      </p>
                      <div
                        className="pt-3 mt-3"
                        style={{ borderTop: `1px solid ${s.borderColor}` }}
                      >
                        <p
                          className="font-semibold text-sm"
                          style={{ color: s.textColor }}
                        >
                          {data.akadVenue}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: s.textMuted }}
                        >
                          {data.akadAddress}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Resepsi */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl p-6 text-center"
                    style={{
                      background: s.cardBg,
                      border: `1.5px solid ${s.borderColor}`,
                      boxShadow: `0 8px 30px ${s.primaryColor}08`,
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor: `${s.primaryColor}15`,
                        color: s.primaryColor,
                      }}
                    >
                      🏛️
                    </div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: s.primaryColor }}
                    >
                      Resepsi
                    </h3>
                    <div className="space-y-2">
                      <p
                        className="flex items-center justify-center gap-2 text-sm"
                        style={{ color: s.textColor }}
                      >
                        <Calendar className="w-4 h-4" style={{ color: s.primaryColor }} />
                        {formatDate(data.resepsiDate)}
                      </p>
                      <p
                        className="flex items-center justify-center gap-2 text-sm font-medium"
                        style={{ color: s.textColor }}
                      >
                        <Clock className="w-4 h-4" style={{ color: s.primaryColor }} />
                        {data.resepsiTime} WIB
                      </p>
                      <div
                        className="pt-3 mt-3"
                        style={{ borderTop: `1px solid ${s.borderColor}` }}
                      >
                        <p
                          className="font-semibold text-sm"
                          style={{ color: s.textColor }}
                        >
                          {data.resepsiVenue}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: s.textMuted }}
                        >
                          {data.resepsiAddress}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Maps Button */}
                {data.mapsLink && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8"
                  >
                    <a
                      href={data.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105 hover:shadow-lg"
                      style={{
                        backgroundColor: s.buttonBg,
                        color: s.buttonText,
                      }}
                    >
                      <MapPin className="w-4 h-4" />
                      Lihat Lokasi
                    </a>
                  </motion.div>
                )}
              </div>
            </Section>

            {/* ─── Section 5: Gallery ─── */}
            <Section id="gallery">
              <div className="max-w-3xl mx-auto w-full text-center">
                <h2
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ color: s.primaryColor }}
                >
                  Galeri Foto
                </h2>
                <OrnamentalDivider color={s.borderColor} char={s.ornamentChar} />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                  {data.gallery.filter(Boolean).map((url, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                      style={{
                        boxShadow: `0 4px 20px ${s.primaryColor}15`,
                      }}
                      onClick={() => setLightbox(i)}
                    >
                      <img
                        src={url}
                        alt={data.galleryCaptions[i] || `Foto ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        style={{ backgroundColor: `${s.primaryColor}30` }}
                      >
                        <span className="text-white text-2xl">+</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Lightbox Modal */}
            <AnimatePresence>
              {lightbox !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
                  onClick={() => setLightbox(null)}
                >
                  <button
                    className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
                    onClick={() => setLightbox(null)}
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    src={data.gallery[lightbox]}
                    alt=""
                    className="max-w-full max-h-[85vh] rounded-xl object-contain"
                  />
                  {data.galleryCaptions[lightbox] && (
                    <p className="absolute bottom-6 text-white/80 text-sm text-center">
                      {data.galleryCaptions[lightbox]}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Section 6: RSVP ─── */}
            <Section id="rsvp">
              <div className="max-w-md mx-auto w-full text-center">
                <h2
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ color: s.primaryColor }}
                >
                  Konfirmasi Kehadiran
                </h2>
                <p className="text-sm mb-8" style={{ color: s.textMuted }}>
                  Mohon konfirmasi kehadiran Anda
                </p>

                {rsvpSent ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="rounded-2xl p-8 text-center"
                    style={{
                      background: s.cardBg,
                      border: `1.5px solid ${s.borderColor}`,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: 2, duration: 0.5 }}
                    >
                      <Heart
                        className="w-14 h-14 mx-auto mb-4"
                        style={{ color: s.primaryColor, fill: s.primaryColor }}
                      />
                    </motion.div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: s.primaryColor }}
                    >
                      Terima Kasih!
                    </h3>
                    <p className="text-sm" style={{ color: s.textMuted }}>
                      Konfirmasi kehadiran Anda telah kami terima. Sampai jumpa
                      di hari bahagia kami!
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleRsvp}
                    className="rounded-2xl p-6 sm:p-8 space-y-5 text-left"
                    style={{
                      background: s.cardBg,
                      border: `1.5px solid ${s.borderColor}`,
                      boxShadow: `0 8px 30px ${s.primaryColor}08`,
                    }}
                  >
                    {/* Name */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: s.textColor }}
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        value={rsvpForm.name}
                        onChange={(e) =>
                          setRsvpForm((f) => ({ ...f, name: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                        style={{
                          border: `1.5px solid ${s.borderColor}`,
                          backgroundColor: `${s.bgColor}`,
                          color: s.textColor,
                        }}
                        placeholder="Nama lengkap Anda"
                        required
                      />
                    </div>

                    {/* Attendance */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: s.textColor }}
                      >
                        Kehadiran
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setRsvpForm((f) => ({
                              ...f,
                              attendance: "HADIR",
                            }))
                          }
                          className="p-3 rounded-xl text-center text-sm font-medium transition-all"
                          style={{
                            border: `2px solid ${rsvpForm.attendance === "HADIR" ? s.primaryColor : s.borderColor}`,
                            backgroundColor:
                              rsvpForm.attendance === "HADIR"
                                ? `${s.primaryColor}15`
                                : "transparent",
                            color:
                              rsvpForm.attendance === "HADIR"
                                ? s.primaryColor
                                : s.textMuted,
                          }}
                        >
                          ✓ Hadir
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setRsvpForm((f) => ({
                              ...f,
                              attendance: "TIDAK_HADIR",
                            }))
                          }
                          className="p-3 rounded-xl text-center text-sm font-medium transition-all"
                          style={{
                            border: `2px solid ${rsvpForm.attendance === "TIDAK_HADIR" ? "#EF4444" : s.borderColor}`,
                            backgroundColor:
                              rsvpForm.attendance === "TIDAK_HADIR"
                                ? "#FEF2F2"
                                : "transparent",
                            color:
                              rsvpForm.attendance === "TIDAK_HADIR"
                                ? "#DC2626"
                                : s.textMuted,
                          }}
                        >
                          ✗ Tidak Hadir
                        </button>
                      </div>
                    </div>

                    {/* Guests */}
                    {rsvpForm.attendance === "HADIR" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label
                          className="block text-sm font-medium mb-1.5"
                          style={{ color: s.textColor }}
                        >
                          Jumlah Hadir
                        </label>
                        <select
                          value={rsvpForm.guests}
                          onChange={(e) =>
                            setRsvpForm((f) => ({
                              ...f,
                              guests: parseInt(e.target.value),
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                          style={{
                            border: `1.5px solid ${s.borderColor}`,
                            backgroundColor: s.bgColor,
                            color: s.textColor,
                          }}
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                              {n} orang
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    )}

                    {/* Message */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: s.textColor }}
                      >
                        Ucapan & Doa
                      </label>
                      <textarea
                        value={rsvpForm.message}
                        onChange={(e) =>
                          setRsvpForm((f) => ({
                            ...f,
                            message: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                        style={{
                          border: `1.5px solid ${s.borderColor}`,
                          backgroundColor: s.bgColor,
                          color: s.textColor,
                        }}
                        rows={3}
                        placeholder="Tulis ucapan untuk mempelai..."
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={rsvpLoading}
                      className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
                      style={{
                        backgroundColor: s.buttonBg,
                        color: s.buttonText,
                      }}
                    >
                      <Send className="w-4 h-4" />
                      {rsvpLoading
                        ? "Mengirim..."
                        : "Kirim Konfirmasi"}
                    </button>
                  </form>
                )}
              </div>
            </Section>

            {/* ─── Section 7: Ucapan ─── */}
            <Section id="ucapan">
              <div className="max-w-lg mx-auto w-full text-center">
                <h2
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ color: s.primaryColor }}
                >
                  Ucapan & Doa
                </h2>
                <p className="text-sm mb-6 flex items-center justify-center gap-1" style={{ color: s.textMuted }}>
                  <Users className="w-4 h-4" />
                  {data.rsvps.length} ucapan
                </p>

                <div
                  className="max-h-[400px] overflow-y-auto space-y-3 pr-1 text-left rounded-2xl p-4"
                  style={{
                    background: s.cardBg,
                    border: `1.5px solid ${s.borderColor}`,
                  }}
                >
                  {data.rsvps
                    .filter((r) => r.message)
                    .map((r, i) => (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="rounded-xl p-4"
                        style={{
                          backgroundColor: `${s.primaryColor}08`,
                          borderLeft: `3px solid ${s.primaryColor}`,
                        }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <p
                            className="font-semibold text-sm"
                            style={{ color: s.primaryColor }}
                          >
                            {r.name}
                          </p>
                          <span
                            className="text-[10px]"
                            style={{ color: s.textMuted }}
                          >
                            {new Date(r.createdAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: s.textColor }}>
                          {r.message}
                        </p>
                      </motion.div>
                    ))}
                  {data.rsvps.filter((r) => r.message).length === 0 && (
                    <div className="py-8 text-center">
                      <Music className="w-8 h-8 mx-auto mb-2 opacity-30" style={{ color: s.primaryColor }} />
                      <p className="text-sm" style={{ color: s.textMuted }}>
                        Belum ada ucapan. Jadilah yang pertama!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Section>

            {/* ─── Section 8: Penutup ─── */}
            <Section id="penutup">
              <div className="max-w-lg mx-auto text-center">
                <OrnamentalFrame style={s}>
                  <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: s.textMuted }}>
                    Merupakan suatu kehormatan dan kebahagiaan bagi kami
                    apabila Bapak/Ibu/Saudara/i berkenan hadir untuk
                    memberikan doa restu kepada kedua mempelai.
                  </p>

                  <OrnamentalDivider color={s.borderColor} char="❦" />

                  <p className="text-sm mb-4" style={{ color: s.textMuted }}>
                    Kami yang berbahagia,
                  </p>
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ color: s.primaryColor }}
                  >
                    {data.groomName} & {data.brideName}
                  </h3>

                  <OrnamentalDivider color={s.borderColor} char={s.ornamentChar} />

                  <p
                    className="text-sm font-medium"
                    style={{ color: s.primaryColor }}
                  >
                    Wassalamualaikum Wr. Wb.
                  </p>
                </OrnamentalFrame>
              </div>
            </Section>

            {/* ─── Footer ─── */}
            <footer
              className="py-8 pb-20 text-center"
              style={{ borderTop: `1px solid ${s.borderColor}` }}
            >
              <p className="text-xs" style={{ color: s.textMuted }}>
                Dibuat dengan ❤️ menggunakan
              </p>
              <a
                href="/"
                className="inline-block mt-1 text-sm font-bold transition-all hover:scale-105"
                style={{ color: s.primaryColor }}
              >
                WirNikah
              </a>
            </footer>
          </div>
        </>
      )}
    </div>
  );
}
