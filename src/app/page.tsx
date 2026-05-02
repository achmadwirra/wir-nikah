"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Calendar,
  MapPin,
  Camera,
  Music,
  Users,
  Check,
  Star,
  Palette,
  Smartphone,
  Mail,
  Clock,
  Image,
  Share2,
  FileText,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

/* ─── Animation Variants ─── */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Data ─── */
const features = [
  { icon: Palette, title: "10+ Template Cantik", desc: "Koleksi desain premium yang elegan untuk setiap tema pernikahan", emoji: "🎨" },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Tampil sempurna di semua perangkat, dari HP hingga desktop", emoji: "📱" },
  { icon: Mail, title: "RSVP & Ucapan", desc: "Terima konfirmasi kehadiran dan ucapan dari tamu undangan", emoji: "💌" },
  { icon: Clock, title: "Countdown Timer", desc: "Hitung mundur menuju hari bahagia yang dinantikan", emoji: "⏰" },
  { icon: Image, title: "Galeri Foto", desc: "Tampilkan momen-momen indah dalam galeri yang memukau", emoji: "📸" },
  { icon: Music, title: "Background Music", desc: "Tambahkan alunan musik romantis di undangan Anda", emoji: "🎵" },
];

const templates = [
  { name: "Elegant Gold", color: "bg-gradient-to-br from-amber-50 to-yellow-100", accent: "#B8860B", textColor: "text-amber-800" },
  { name: "Garden Romance", color: "bg-gradient-to-br from-green-50 to-pink-50", accent: "#9CAF88", textColor: "text-green-800" },
  { name: "Modern Minimalist", color: "bg-gradient-to-br from-gray-50 to-slate-100", accent: "#4A5568", textColor: "text-gray-800" },
  { name: "Javanese Traditional", color: "bg-gradient-to-br from-red-50 to-amber-50", accent: "#8B2500", textColor: "text-red-900" },
  { name: "Islamic Elegant", color: "bg-gradient-to-br from-emerald-50 to-teal-50", accent: "#065F46", textColor: "text-emerald-900" },
  { name: "Cherry Blossom", color: "bg-gradient-to-br from-pink-50 to-rose-100", accent: "#DB2777", textColor: "text-pink-800" },
];

const steps = [
  { step: "01", icon: Palette, title: "Pilih Template", desc: "Pilih desain yang sesuai dengan tema pernikahan Anda" },
  { step: "02", icon: FileText, title: "Isi Data", desc: "Masukkan informasi acara, foto, dan detail pernikahan" },
  { step: "03", icon: Share2, title: "Bagikan Link", desc: "Kirim link undangan ke semua tamu melalui WhatsApp atau media sosial" },
];

const testimonials = [
  {
    name: "Rina & Andi Pratama",
    location: "Jakarta",
    text: "Undangan digitalnya cantik banget! Tamu-tamu kami kagum dengan desainnya. Prosesnya juga sangat mudah dan cepat.",
    rating: 5,
  },
  {
    name: "Dian Safitri & Budi Hartono",
    location: "Yogyakarta",
    text: "Sangat membantu! RSVP online bikin kami mudah menghitung jumlah tamu. Fiturnya lengkap dan harganya terjangkau.",
    rating: 5,
  },
  {
    name: "Maya Putri & Rizki Ramadhan",
    location: "Bandung",
    text: "Template Elegant Gold-nya mewah sekali. Semua tamu memuji undangan kami. Terima kasih WirNikah!",
    rating: 5,
  },
];

/* ─── Ornamental Divider Component ─── */
function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#B8860B]/40" />
      <div className="mx-3 text-[#B8860B]/60">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
          <path d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2ZM12 22C12 22 6 18 6 14C6 12 8 10 10 10C10 12 11 14 12 14C13 14 14 12 14 10C16 10 18 12 18 14C18 18 12 22 12 22Z" />
        </svg>
      </div>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#B8860B]/40" />
    </div>
  );
}

/* ─── Main Page ─── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] overflow-hidden">
      {/* ═══ Navbar ═══ */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 border-b border-[#B8860B]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-[#B8860B] fill-[#B8860B]" />
            <span className="text-xl font-serif font-bold text-[#B8860B]">WirNikah</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-[#B8860B] transition text-sm font-medium">Fitur</Link>
            <Link href="#templates" className="text-gray-600 hover:text-[#B8860B] transition text-sm font-medium">Template</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-[#B8860B] transition text-sm font-medium">Harga</Link>
            <Link href="#demo" className="text-gray-600 hover:text-[#B8860B] transition text-sm font-medium">Contoh</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-[#B8860B] hover:text-[#8B6914] font-medium text-sm hidden sm:block">
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="bg-[#B8860B] text-white px-5 py-2 rounded-full hover:bg-[#9A7209] transition font-medium text-sm shadow-md shadow-[#B8860B]/20"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ Hero Section ═══ */}
      <section className="relative pt-28 pb-24 px-4 bg-gradient-to-br from-[#FFF8F0] via-[#FFF5F5] to-[#FFF0F5] overflow-hidden">
        {/* Floating ornamental elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FFE4E1]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#B8860B]/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 opacity-20 animate-float hidden lg:block">
          <Heart className="w-8 h-8 text-[#B8860B]" />
        </div>
        <div className="absolute bottom-32 left-20 opacity-15 animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
          <Sparkles className="w-6 h-6 text-[#B8860B]" />
        </div>
        <div className="absolute top-60 left-1/4 opacity-10 animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
          <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#B8860B]/20 text-[#B8860B] px-4 py-1.5 rounded-full text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              Platform Undangan Digital #1
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-bold text-gray-900 leading-tight mb-6">
              Buat Undangan Pernikahan Digital yang{" "}
              <span className="text-[#B8860B] relative">
                Elegan
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                </svg>
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Bagikan momen bahagia Anda dengan undangan digital yang cantik, mudah dibuat, dan bisa dibagikan ke semua tamu.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 bg-[#B8860B] text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-[#9A7209] transition shadow-lg shadow-[#B8860B]/25 hover:shadow-xl hover:shadow-[#B8860B]/30"
              >
                Buat Undangan
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#B8860B]/30 text-[#B8860B] px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-[#B8860B]/5 transition"
              >
                Lihat Contoh
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Mockup Preview */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto w-[320px]">
              {/* Phone frame */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-900/10 p-3 border border-gray-100">
                <div className="bg-gradient-to-br from-amber-50 via-[#FFF8F0] to-pink-50 rounded-[2rem] p-6 min-h-[480px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-4 right-4 w-20 h-20 border border-[#B8860B]/20 rounded-full" />
                  <div className="absolute bottom-8 left-4 w-16 h-16 border border-pink-200 rounded-full" />
                  
                  <div className="text-[#B8860B]/40 text-xs tracking-[0.3em] uppercase mb-4 font-medium">The Wedding of</div>
                  <h3 className="font-serif text-2xl text-[#B8860B] mb-1">Ahmad</h3>
                  <div className="text-[#B8860B]/60 text-xl font-serif">&</div>
                  <h3 className="font-serif text-2xl text-[#B8860B] mb-4">Sarah</h3>
                  <div className="w-12 h-px bg-[#B8860B]/30 mb-4" />
                  <p className="text-gray-500 text-sm">12 Juni 2026</p>
                  <p className="text-gray-400 text-xs mt-1">Jakarta, Indonesia</p>
                  
                  <div className="mt-8 bg-[#B8860B] text-white text-xs px-4 py-2 rounded-full">
                    Buka Undangan
                  </div>
                </div>
              </div>
              {/* Floating card behind */}
              <div className="absolute -top-4 -right-8 w-[280px] bg-white rounded-2xl shadow-xl p-4 opacity-40 -rotate-6 -z-10">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 h-32" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ═══ Features Section ═══ */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <p className="text-[#B8860B] font-medium text-sm tracking-wide uppercase mb-3">Fitur Unggulan</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Kenapa Memilih WirNikah?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk membuat undangan pernikahan digital yang sempurna
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeInUp}
                className="group bg-[#FFFBF5] p-7 rounded-2xl border border-[#B8860B]/10 hover:border-[#B8860B]/30 hover:shadow-lg hover:shadow-[#B8860B]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#B8860B]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#B8860B]/15 transition-colors">
                  <span className="text-2xl">{f.emoji}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ═══ Template Preview Section ═══ */}
      <section id="templates" className="py-20 px-4 bg-gradient-to-b from-[#FFFBF5] to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <p className="text-[#B8860B] font-medium text-sm tracking-wide uppercase mb-3">Desain Premium</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Pilihan Template
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Koleksi template eksklusif yang dirancang khusus untuk momen spesial Anda
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6"
          >
            {templates.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className={`${t.color} rounded-2xl p-5 md:p-6 border border-white/60 hover:shadow-xl transition-all duration-300 cursor-pointer group`}
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-4 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] group-hover:bg-white/90 transition-colors">
                  <p className="text-xs tracking-[0.2em] uppercase opacity-50 mb-2">The Wedding of</p>
                  <p className={`font-serif text-lg md:text-xl ${t.textColor} font-semibold`}>Ahmad & Sarah</p>
                  <div className="w-8 h-px mt-2 mb-2" style={{ backgroundColor: t.accent }} />
                  <p className="text-xs opacity-60">12 . 06 . 2026</p>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm md:text-base font-semibold ${t.textColor}`}>{t.name}</h3>
                  <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: t.accent, backgroundColor: `${t.accent}33` }} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mt-10"
          >
            <Link href="/templates" className="inline-flex items-center gap-2 text-[#B8860B] font-semibold hover:gap-3 transition-all">
              Lihat Semua Template
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ═══ How It Works ═══ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <p className="text-[#B8860B] font-medium text-sm tracking-wide uppercase mb-3">Mudah & Cepat</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Cara Membuat Undangan
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Hanya 3 langkah mudah untuk membuat undangan pernikahan digital Anda
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 md:gap-12"
          >
            {steps.map((s, i) => (
              <motion.div key={s.step} variants={fadeInUp} className="text-center relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px border-t-2 border-dashed border-[#B8860B]/20" />
                )}
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-[#B8860B]/5 rounded-full" />
                  <div className="absolute inset-2 bg-[#B8860B]/10 rounded-full" />
                  <s.icon className="w-8 h-8 text-[#B8860B] relative z-10" />
                </div>
                <div className="text-[#B8860B] font-bold text-sm mb-2">Langkah {s.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ═══ Demo Section ═══ */}
      <section id="demo" className="py-20 px-4 bg-gradient-to-b from-[#FFFBF5] to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <p className="text-[#B8860B] font-medium text-sm tracking-wide uppercase mb-3">Preview</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Lihat Contoh Undangan
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Lihat langsung bagaimana undangan digital Anda akan terlihat
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Demo Card 1 */}
            <motion.div variants={fadeInUp}>
              <Link href="/undangan/ahmad-dan-sarah" className="block group">
                <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-8 border border-[#B8860B]/20 hover:shadow-xl hover:shadow-[#B8860B]/10 transition-all duration-300 min-h-[240px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute top-3 right-3 bg-[#B8860B] text-white text-xs px-3 py-1 rounded-full font-medium">
                    Elegant Gold
                  </div>
                  <div className="absolute inset-0 border-[12px] border-[#B8860B]/5 rounded-2xl pointer-events-none" />
                  <p className="text-[#B8860B]/50 text-xs tracking-[0.3em] uppercase mb-3">The Wedding of</p>
                  <h3 className="font-serif text-2xl text-[#B8860B] mb-1">Ahmad & Sarah</h3>
                  <p className="text-gray-400 text-sm mt-2">12 Juni 2026</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[#B8860B] font-medium text-sm group-hover:gap-3 transition-all">
                    Lihat Undangan <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Demo Card 2 */}
            <motion.div variants={fadeInUp}>
              <Link href="/undangan/budi-dan-ani" className="block group">
                <div className="bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 rounded-2xl p-8 border border-red-200/50 hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300 min-h-[240px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute top-3 right-3 bg-red-800 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Javanese Traditional
                  </div>
                  <div className="absolute inset-0 border-[12px] border-red-800/5 rounded-2xl pointer-events-none" />
                  <p className="text-red-800/50 text-xs tracking-[0.3em] uppercase mb-3">The Wedding of</p>
                  <h3 className="font-serif text-2xl text-red-900 mb-1">Budi & Ani</h3>
                  <p className="text-gray-400 text-sm mt-2">20 Juli 2026</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-red-800 font-medium text-sm group-hover:gap-3 transition-all">
                    Lihat Undangan <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ═══ Pricing Section ═══ */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <p className="text-[#B8860B] font-medium text-sm tracking-wide uppercase mb-3">Investasi Terbaik</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Harga
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Pilih paket yang sesuai dengan kebutuhan Anda
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Free Plan */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-colors"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">Free</h3>
              <p className="text-gray-500 text-sm mb-4">Untuk mencoba</p>
              <p className="text-4xl font-bold text-gray-900 mb-6">
                Rp 0
                <span className="text-base font-normal text-gray-400 ml-1">/ selamanya</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-[#9CAF88] flex-shrink-0" /> 1 Template pilihan
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-[#9CAF88] flex-shrink-0" /> Maksimal 50 tamu
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-[#9CAF88] flex-shrink-0" /> RSVP Online
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-[#9CAF88] flex-shrink-0" /> Countdown Timer
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-[#9CAF88] flex-shrink-0" /> 4 Foto Gallery
                </li>
              </ul>
              <Link
                href="/auth/register"
                className="block text-center border-2 border-[#B8860B]/30 text-[#B8860B] px-6 py-3 rounded-full font-semibold hover:bg-[#B8860B]/5 transition"
              >
                Mulai Gratis
              </Link>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              variants={fadeInUp}
              className="relative bg-gradient-to-br from-[#FFFBF5] to-amber-50 border-2 border-[#B8860B] rounded-2xl p-8 shadow-xl shadow-[#B8860B]/10"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B8860B] text-white text-xs px-4 py-1 rounded-full font-bold tracking-wide">
                POPULER ✨
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Premium</h3>
              <p className="text-gray-500 text-sm mb-4">Untuk pernikahan sempurna</p>
              <p className="text-4xl font-bold text-[#B8860B] mb-6">
                Rp 99.000
                <span className="text-base font-normal text-gray-400 ml-1">/ undangan</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#B8860B] flex-shrink-0" /> Semua template premium
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#B8860B] flex-shrink-0" /> Unlimited tamu
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#B8860B] flex-shrink-0" /> Semua fitur lengkap
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#B8860B] flex-shrink-0" /> Background Music
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#B8860B] flex-shrink-0" /> Custom domain
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#B8860B] flex-shrink-0" /> Galeri foto unlimited
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-[#B8860B] flex-shrink-0" /> Export RSVP data
                </li>
              </ul>
              <Link
                href="/auth/register"
                className="block text-center bg-[#B8860B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#9A7209] transition shadow-lg shadow-[#B8860B]/25"
              >
                Pilih Premium
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ═══ Testimonials Section ═══ */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#FFFBF5] to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <p className="text-[#B8860B] font-medium text-sm tracking-wide uppercase mb-3">Testimoni</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Kata Mereka
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Ribuan pasangan telah mempercayakan undangan mereka kepada WirNikah
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className="bg-white p-7 rounded-2xl border border-[#B8860B]/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#B8860B] fill-[#B8860B]" />
                  ))}
                </div>
                <p className="text-gray-600 mb-5 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#B8860B]/20 to-[#B8860B]/10 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-[#B8860B]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ═══ CTA Section ═══ */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#B8860B] via-[#9A7209] to-[#7A5A07] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Heart className="w-12 h-12 text-white/80 mx-auto mb-6 fill-white/30" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-5">
              Siap Membuat Undangan?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Bergabung dengan ribuan pasangan yang telah membuat undangan digital cantik bersama WirNikah
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 bg-white text-[#B8860B] px-10 py-4 rounded-full text-lg font-bold hover:bg-amber-50 transition shadow-2xl hover:shadow-white/20"
            >
              Mulai Sekarang — Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <Heart className="w-6 h-6 text-[#B8860B] fill-[#B8860B]" />
                <span className="text-white font-serif font-bold text-xl">WirNikah</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                Platform undangan pernikahan digital terbaik di Indonesia. Buat undangan cantik, modern, dan mudah dibagikan.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Menu</h4>
              <ul className="space-y-2.5">
                <li><Link href="/" className="hover:text-[#B8860B] transition text-sm">Beranda</Link></li>
                <li><Link href="#templates" className="hover:text-[#B8860B] transition text-sm">Template</Link></li>
                <li><Link href="#pricing" className="hover:text-[#B8860B] transition text-sm">Harga</Link></li>
                <li><Link href="#demo" className="hover:text-[#B8860B] transition text-sm">Contoh</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Ikuti Kami</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-[#B8860B] transition text-sm">Instagram</a></li>
                <li><a href="#" className="hover:text-[#B8860B] transition text-sm">Facebook</a></li>
                <li><a href="#" className="hover:text-[#B8860B] transition text-sm">Twitter</a></li>
                <li><a href="#" className="hover:text-[#B8860B] transition text-sm">WhatsApp</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">© 2026 WirNikah. All rights reserved.</p>
            <p className="text-sm text-gray-600">Dibuat dengan ❤️ oleh Wir-Code</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
