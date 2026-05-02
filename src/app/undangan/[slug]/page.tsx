"use client";

import { useEffect, useState, useRef, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Calendar, Clock, MapPin, Volume2, VolumeX,
  Send, ChevronDown, Users, ExternalLink
} from "lucide-react";

interface InvitationData {
  id: string;
  slug: string;
  template: "ELEGANT_GOLD" | "GARDEN_ROMANCE" | "MODERN_MINIMALIST";
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

const themeColors = {
  ELEGANT_GOLD: {
    primary: "#B8860B",
    secondary: "#FFF8DC",
    accent: "#8B7355",
    bg: "bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-50",
    text: "text-amber-900",
    textLight: "text-amber-700",
    border: "border-amber-300",
    button: "bg-amber-700 hover:bg-amber-800",
    card: "bg-white/80 backdrop-blur-sm border-amber-200",
  },
  GARDEN_ROMANCE: {
    primary: "#2D5016",
    secondary: "#F8B4C8",
    accent: "#4a7c59",
    bg: "bg-gradient-to-b from-green-50 via-pink-50 to-green-50",
    text: "text-green-900",
    textLight: "text-green-700",
    border: "border-green-300",
    button: "bg-green-700 hover:bg-green-800",
    card: "bg-white/80 backdrop-blur-sm border-green-200",
  },
  MODERN_MINIMALIST: {
    primary: "#1a1a1a",
    secondary: "#ffffff",
    accent: "#666666",
    bg: "bg-gradient-to-b from-gray-50 via-white to-gray-50",
    text: "text-gray-900",
    textLight: "text-gray-600",
    border: "border-gray-300",
    button: "bg-gray-900 hover:bg-gray-800",
    card: "bg-white/90 backdrop-blur-sm border-gray-200",
  },
};

export default function UndanganPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [data, setData] = useState<InvitationData | null>(null);
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(true);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [rsvpForm, setRsvpForm] = useState({ name: "", attendance: "HADIR", guests: 1, message: "" });
  const [rsvpSent, setRsvpSent] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch(`/api/undangan/${slug}`)
      .then((r) => r.json())
      .then((d) => { if (!d.error) setData(d); });
  }, [slug]);

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

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (muted) {
      audioRef.current.play().catch(() => {});
      setMuted(false);
    } else {
      audioRef.current.pause();
      setMuted(true);
    }
  };

  const handleOpen = () => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setMuted(false);
    }
  };

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rsvpForm, invitationId: data!.id }),
      });
      if (res.ok) {
        setRsvpSent(true);
        const newRsvp = await res.json();
        setData((prev) => prev ? { ...prev, rsvps: [newRsvp, ...prev.rsvps] } : prev);
      }
    } catch {
      alert("Gagal mengirim RSVP");
    } finally {
      setRsvpLoading(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <Heart className="w-12 h-12 text-amber-400 mx-auto animate-pulse" />
          <p className="mt-4 text-amber-700">Memuat undangan...</p>
        </div>
      </div>
    );
  }

  const theme = themeColors[data.template];
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className={`min-h-screen ${theme.bg}`}>
      {/* Audio */}
      <audio ref={audioRef} loop preload="none">
        <source src="/music/romantic.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Toggle */}
      {opened && (
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg border border-gray-200"
        >
          {muted ? <VolumeX className="w-5 h-5 text-gray-600" /> : <Volume2 className="w-5 h-5 text-amber-600" />}
        </button>
      )}

      {/* Envelope Opening */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-b from-amber-100 to-amber-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center px-6"
            >
              {/* Envelope */}
              <div className="relative w-72 h-48 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-200 to-amber-100 rounded-lg shadow-xl border-2 border-amber-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-amber-600 mx-auto fill-amber-600" />
                    <p className="text-amber-800 font-serif text-lg mt-2">
                      {data.groomName} & {data.brideName}
                    </p>
                  </div>
                </div>
                {/* Envelope flap */}
                <div className="absolute -top-1 left-0 right-0 h-24 overflow-hidden">
                  <div className="w-0 h-0 mx-auto border-l-[144px] border-r-[144px] border-t-[96px] border-l-transparent border-r-transparent border-t-amber-300" />
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-amber-800 text-lg mb-2"
              >
                Anda Diundang ke Pernikahan
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-amber-900 font-serif text-2xl font-bold mb-8"
              >
                {data.groomName} & {data.brideName}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                onClick={handleOpen}
                className="bg-amber-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-800 transition shadow-lg"
              >
                Buka Undangan
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {opened && (
        <div className="relative">
          {/* Section 1: Cover */}
          <section className="invitation-section relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center z-10"
            >
              <p className={`text-sm uppercase tracking-[0.3em] ${theme.textLight} mb-4`}>The Wedding of</p>
              <h1 className={`font-serif text-5xl sm:text-7xl font-bold ${theme.text} mb-4`}>
                {data.groomName}
              </h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="w-16 h-px bg-current opacity-30" />
                <Heart className="w-6 h-6 fill-current opacity-50" style={{ color: theme.primary }} />
                <div className="w-16 h-px bg-current opacity-30" />
              </div>
              <h1 className={`font-serif text-5xl sm:text-7xl font-bold ${theme.text} mb-6`}>
                {data.brideName}
              </h1>
              <p className={`${theme.textLight} text-lg`}>{formatDate(data.akadDate)}</p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-12"
              >
                <ChevronDown className="w-6 h-6 mx-auto opacity-50" style={{ color: theme.primary }} />
              </motion.div>
            </motion.div>
          </section>

          {/* Section 2: Bismillah / Quotes */}
          <section className="invitation-section">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center px-4"
            >
              <p className="text-4xl mb-6" style={{ color: theme.primary }}>﷽</p>
              <div className={`ornament-border ${theme.card} border`}>
                <p className={`font-serif text-lg sm:text-xl leading-relaxed italic ${theme.text}`}>
                  &ldquo;{data.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          </section>

          {/* Section 3: Mempelai */}
          <section className="invitation-section">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto w-full px-4"
            >
              <h2 className={`text-center font-serif text-3xl ${theme.text} mb-12`}>Mempelai</h2>
              <div className="grid sm:grid-cols-2 gap-12 items-center">
                {/* Groom */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: theme.primary }} />
                    <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-200">
                      <img src={data.groomPhoto || "/placeholder.jpg"} alt={data.groomName} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                      <span className="text-white text-xs">♂</span>
                    </div>
                  </div>
                  <h3 className={`font-serif text-2xl font-bold ${theme.text}`}>{data.groomFullName}</h3>
                  <p className={`${theme.textLight} mt-2`}>Putra dari</p>
                  <p className={`${theme.text} font-medium`}>{data.groomParents}</p>
                  {data.groomInstagram && (
                    <a href={`https://instagram.com/${data.groomInstagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 mt-3 ${theme.textLight} hover:opacity-70`}>
                      <ExternalLink className="w-4 h-4" /> {data.groomInstagram}
                    </a>
                  )}
                </motion.div>

                {/* Bride */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: theme.primary }} />
                    <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-200">
                      <img src={data.bridePhoto || "/placeholder.jpg"} alt={data.brideName} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                      <span className="text-white text-xs">♀</span>
                    </div>
                  </div>
                  <h3 className={`font-serif text-2xl font-bold ${theme.text}`}>{data.brideFullName}</h3>
                  <p className={`${theme.textLight} mt-2`}>Putri dari</p>
                  <p className={`${theme.text} font-medium`}>{data.brideParents}</p>
                  {data.brideInstagram && (
                    <a href={`https://instagram.com/${data.brideInstagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 mt-3 ${theme.textLight} hover:opacity-70`}>
                      <ExternalLink className="w-4 h-4" /> {data.brideInstagram}
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Section 4: Countdown */}
          <section className="invitation-section">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className={`font-serif text-3xl ${theme.text} mb-2`}>Menuju Hari Bahagia</h2>
              <p className={`${theme.textLight} mb-8`}>{formatDate(data.akadDate)}</p>
              <div className="flex justify-center gap-4 sm:gap-8">
                {[
                  { value: countdown.days, label: "Hari" },
                  { value: countdown.hours, label: "Jam" },
                  { value: countdown.minutes, label: "Menit" },
                  { value: countdown.seconds, label: "Detik" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className={`${theme.card} border rounded-xl p-4 sm:p-6 min-w-[70px] sm:min-w-[90px]`}
                    animate={{ scale: item.label === "Detik" ? [1, 1.02, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <p className={`text-3xl sm:text-4xl font-bold ${theme.text}`}>
                      {String(item.value).padStart(2, "0")}
                    </p>
                    <p className={`text-xs sm:text-sm ${theme.textLight} mt-1`}>{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Section 5: Acara */}
          <section className="invitation-section">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto w-full px-4"
            >
              <h2 className={`text-center font-serif text-3xl ${theme.text} mb-12`}>Waktu & Tempat</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Akad */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`${theme.card} border rounded-2xl p-6 text-center`}
                >
                  <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20` }}>
                    <Calendar className="w-6 h-6" style={{ color: theme.primary }} />
                  </div>
                  <h3 className={`font-serif text-xl font-bold ${theme.text} mb-3`}>Akad Nikah</h3>
                  <p className={`${theme.textLight} mb-1`}>{formatDate(data.akadDate)}</p>
                  <p className={`${theme.text} font-medium flex items-center justify-center gap-1`}>
                    <Clock className="w-4 h-4" /> {data.akadTime} WIB
                  </p>
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: `${theme.primary}30` }}>
                    <p className={`font-medium ${theme.text}`}>{data.akadVenue}</p>
                    <p className={`text-sm ${theme.textLight} mt-1`}>{data.akadAddress}</p>
                  </div>
                </motion.div>

                {/* Resepsi */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className={`${theme.card} border rounded-2xl p-6 text-center`}
                >
                  <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20` }}>
                    <Heart className="w-6 h-6" style={{ color: theme.primary }} />
                  </div>
                  <h3 className={`font-serif text-xl font-bold ${theme.text} mb-3`}>Resepsi</h3>
                  <p className={`${theme.textLight} mb-1`}>{formatDate(data.resepsiDate)}</p>
                  <p className={`${theme.text} font-medium flex items-center justify-center gap-1`}>
                    <Clock className="w-4 h-4" /> {data.resepsiTime} WIB
                  </p>
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: `${theme.primary}30` }}>
                    <p className={`font-medium ${theme.text}`}>{data.resepsiVenue}</p>
                    <p className={`text-sm ${theme.textLight} mt-1`}>{data.resepsiAddress}</p>
                  </div>
                </motion.div>
              </div>

              {data.mapsLink && (
                <div className="text-center mt-8">
                  <a
                    href={data.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${theme.button} text-white px-6 py-3 rounded-full font-medium transition`}
                  >
                    <MapPin className="w-5 h-5" />
                    Lihat di Google Maps
                  </a>
                </div>
              )}
            </motion.div>
          </section>

          {/* Section 6: Gallery */}
          <section className="invitation-section">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto w-full px-4"
            >
              <h2 className={`text-center font-serif text-3xl ${theme.text} mb-12`}>Our Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {data.gallery.filter(Boolean).map((url, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition group"
                    onClick={() => setLightbox(i)}
                  >
                    <img
                      src={url}
                      alt={data.galleryCaptions[i] || `Photo ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Lightbox */}
          <AnimatePresence>
            {lightbox !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                onClick={() => setLightbox(null)}
              >
                <motion.img
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  src={data.gallery[lightbox]}
                  alt=""
                  className="max-w-full max-h-[80vh] rounded-xl object-contain"
                />
                <p className="absolute bottom-8 text-white text-center">
                  {data.galleryCaptions[lightbox]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section 7: RSVP */}
          <section className="invitation-section">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-lg mx-auto w-full px-4"
            >
              <h2 className={`text-center font-serif text-3xl ${theme.text} mb-4`}>RSVP</h2>
              <p className={`text-center ${theme.textLight} mb-8`}>Konfirmasi Kehadiran Anda</p>

              {rsvpSent ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`${theme.card} border rounded-2xl p-8 text-center`}
                >
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-green-100">
                    <Heart className="w-8 h-8 text-green-600 fill-green-600" />
                  </div>
                  <h3 className={`text-xl font-bold ${theme.text} mb-2`}>Terima Kasih!</h3>
                  <p className={theme.textLight}>Konfirmasi Anda telah kami terima</p>
                </motion.div>
              ) : (
                <form onSubmit={handleRsvp} className={`${theme.card} border rounded-2xl p-6 sm:p-8 space-y-4`}>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>Nama</label>
                    <input
                      type="text"
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="Nama lengkap Anda"
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>Kehadiran</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRsvpForm((f) => ({ ...f, attendance: "HADIR" }))}
                        className={`p-3 border-2 rounded-xl text-center transition ${
                          rsvpForm.attendance === "HADIR" ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200"
                        }`}
                      >
                        ✓ Hadir
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpForm((f) => ({ ...f, attendance: "TIDAK_HADIR" }))}
                        className={`p-3 border-2 rounded-xl text-center transition ${
                          rsvpForm.attendance === "TIDAK_HADIR" ? "border-red-500 bg-red-50 text-red-700" : "border-gray-200"
                        }`}
                      >
                        ✗ Tidak Hadir
                      </button>
                    </div>
                  </div>
                  {rsvpForm.attendance === "HADIR" && (
                    <div>
                      <label className={`block text-sm font-medium ${theme.text} mb-1`}>Jumlah Tamu</label>
                      <select
                        value={rsvpForm.guests}
                        onChange={(e) => setRsvpForm((f) => ({ ...f, guests: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>{n} orang</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>Ucapan & Doa</label>
                    <textarea
                      value={rsvpForm.message}
                      onChange={(e) => setRsvpForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                      rows={3}
                      placeholder="Tulis ucapan untuk mempelai..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={rsvpLoading}
                    className={`w-full ${theme.button} text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2`}
                  >
                    <Send className="w-5 h-5" />
                    {rsvpLoading ? "Mengirim..." : "Konfirmasi Kehadiran"}
                  </button>
                </form>
              )}
            </motion.div>
          </section>

          {/* Section 8: Ucapan */}
          <section className="invitation-section">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto w-full px-4"
            >
              <h2 className={`text-center font-serif text-3xl ${theme.text} mb-4`}>Ucapan & Doa</h2>
              <p className={`text-center ${theme.textLight} mb-8`}>
                <Users className="w-4 h-4 inline mr-1" />
                {data.rsvps.length} ucapan
              </p>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {data.rsvps.filter((r) => r.message).map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`${theme.card} border rounded-xl p-4`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className={`font-medium ${theme.text}`}>{r.name}</p>
                      <span className={`text-xs ${theme.textLight}`}>
                        {new Date(r.createdAt).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                    <p className={`text-sm ${theme.textLight}`}>{r.message}</p>
                  </motion.div>
                ))}
                {data.rsvps.filter((r) => r.message).length === 0 && (
                  <p className={`text-center ${theme.textLight}`}>Belum ada ucapan</p>
                )}
              </div>
            </motion.div>
          </section>

          {/* Section 9: Penutup */}
          <section className="invitation-section">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center px-4"
            >
              <div className={`ornament-border ${theme.card} border`}>
                <p className={`${theme.textLight} text-lg mb-6`}>{data.message}</p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-12 h-px" style={{ backgroundColor: theme.primary }} />
                  <Heart className="w-5 h-5 fill-current" style={{ color: theme.primary }} />
                  <div className="w-12 h-px" style={{ backgroundColor: theme.primary }} />
                </div>
                <p className={`font-serif text-2xl font-bold ${theme.text}`}>
                  {data.groomName} & {data.brideName}
                </p>
                <p className={`${theme.textLight} mt-4 text-sm`}>
                  Kami yang berbahagia mengucapkan terima kasih
                </p>
              </div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="py-8 text-center border-t" style={{ borderColor: `${theme.primary}20` }}>
            <p className={`text-sm ${theme.textLight}`}>
              Dibuat dengan ❤️ di{" "}
              <a href="/" className="font-medium hover:underline" style={{ color: theme.primary }}>
                WirNikah
              </a>
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}
