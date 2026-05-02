"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Calendar, MapPin, Camera, Music, Users, Check, Star } from "lucide-react";

const features = [
  { icon: Users, title: "RSVP Online", desc: "Kelola konfirmasi kehadiran tamu secara digital" },
  { icon: Calendar, title: "Countdown Timer", desc: "Hitung mundur menuju hari bahagia" },
  { icon: Camera, title: "Gallery Foto", desc: "Tampilkan momen indah dalam galeri cantik" },
  { icon: Music, title: "Background Music", desc: "Tambahkan musik romantis di undangan" },
  { icon: MapPin, title: "Google Maps", desc: "Tamu mudah menemukan lokasi acara" },
  { icon: Heart, title: "Desain Elegan", desc: "Template premium yang cantik dan modern" },
];

const templates = [
  { name: "Elegant Gold", color: "from-yellow-100 to-amber-50", accent: "text-amber-700", border: "border-amber-300" },
  { name: "Garden Romance", color: "from-green-50 to-pink-50", accent: "text-green-700", border: "border-green-300" },
  { name: "Modern Minimalist", color: "from-gray-50 to-white", accent: "text-gray-800", border: "border-gray-300" },
];

const testimonials = [
  { name: "Rina & Andi", text: "Undangan digitalnya cantik banget! Tamu-tamu kami kagum dengan desainnya.", rating: 5 },
  { name: "Dian & Budi", text: "Sangat membantu! RSVP online bikin kami mudah menghitung jumlah tamu.", rating: 5 },
  { name: "Maya & Rizki", text: "Template Elegant Gold-nya mewah sekali. Worth every penny!", rating: 5 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-pink-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-amber-600 fill-amber-600" />
            <span className="text-xl font-bold text-amber-800">WirNikah</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-amber-700 hover:text-amber-900 font-medium">
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition font-medium"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4 fill-amber-600" />
              Platform Undangan Digital #1 di Indonesia
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Buat Undangan Pernikahan{" "}
              <span className="text-amber-600">Digital yang Elegan</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Wujudkan undangan pernikahan impian Anda dalam hitungan menit. 
              Cantik, modern, dan mudah dibagikan ke semua tamu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-amber-600 text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-amber-700 transition shadow-lg shadow-amber-200"
              >
                Buat Undangan Sekarang
              </Link>
              <Link
                href="/undangan/ahmad-dan-sarah"
                className="border-2 border-amber-300 text-amber-700 px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-amber-50 transition"
              >
                Lihat Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Template Premium
            </h2>
            <p className="text-gray-600 text-lg">Pilih desain yang sesuai dengan tema pernikahan Anda</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {templates.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`bg-gradient-to-br ${t.color} ${t.border} border-2 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow`}
              >
                <div className="w-full h-48 bg-white/50 rounded-xl mb-4 flex items-center justify-center">
                  <div className={`text-center ${t.accent}`}>
                    <Heart className="w-12 h-12 mx-auto mb-2 fill-current opacity-30" />
                    <p className="font-serif text-2xl">Ahmad & Sarah</p>
                    <p className="text-sm mt-1 opacity-70">12 . 06 . 2026</p>
                  </div>
                </div>
                <h3 className={`text-xl font-bold ${t.accent}`}>{t.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Fitur Lengkap
            </h2>
            <p className="text-gray-600 text-lg">Semua yang Anda butuhkan untuk undangan digital sempurna</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition"
              >
                <f.icon className="w-10 h-10 text-amber-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Harga Terjangkau</h2>
            <p className="text-gray-600 text-lg">Mulai gratis, upgrade kapan saja</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-2 border-gray-200 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-4xl font-bold text-gray-900 mb-6">Rp 0</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600"><Check className="w-5 h-5 text-green-500" /> 1 Template</li>
                <li className="flex items-center gap-2 text-gray-600"><Check className="w-5 h-5 text-green-500" /> RSVP Online</li>
                <li className="flex items-center gap-2 text-gray-600"><Check className="w-5 h-5 text-green-500" /> Countdown Timer</li>
                <li className="flex items-center gap-2 text-gray-600"><Check className="w-5 h-5 text-green-500" /> 4 Foto Gallery</li>
              </ul>
              <Link href="/auth/register" className="block text-center border-2 border-amber-300 text-amber-700 px-6 py-3 rounded-full font-semibold hover:bg-amber-50 transition">
                Mulai Gratis
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-2 border-amber-400 rounded-2xl p-8 bg-gradient-to-br from-amber-50 to-yellow-50 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-bold">POPULAR</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-4xl font-bold text-amber-700 mb-6">Rp 99.000</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-700"><Check className="w-5 h-5 text-amber-600" /> Semua Template</li>
                <li className="flex items-center gap-2 text-gray-700"><Check className="w-5 h-5 text-amber-600" /> RSVP Online</li>
                <li className="flex items-center gap-2 text-gray-700"><Check className="w-5 h-5 text-amber-600" /> Countdown Timer</li>
                <li className="flex items-center gap-2 text-gray-700"><Check className="w-5 h-5 text-amber-600" /> 8 Foto Gallery</li>
                <li className="flex items-center gap-2 text-gray-700"><Check className="w-5 h-5 text-amber-600" /> Background Music</li>
                <li className="flex items-center gap-2 text-gray-700"><Check className="w-5 h-5 text-amber-600" /> Custom Slug</li>
                <li className="flex items-center gap-2 text-gray-700"><Check className="w-5 h-5 text-amber-600" /> Export RSVP CSV</li>
              </ul>
              <Link href="/auth/register" className="block text-center bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition shadow-lg">
                Pilih Premium
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Kata Mereka</h2>
            <p className="text-gray-600 text-lg">Ribuan pasangan telah mempercayakan undangan mereka di WirNikah</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="font-semibold text-amber-700">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Heart className="w-12 h-12 text-amber-200 mx-auto mb-4 fill-amber-200" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Siap Membuat Undangan Impian?
            </h2>
            <p className="text-amber-100 text-lg mb-8">
              Bergabung dengan ribuan pasangan yang telah membuat undangan digital cantik bersama WirNikah
            </p>
            <Link
              href="/auth/register"
              className="inline-block bg-white text-amber-700 px-8 py-3.5 rounded-full text-lg font-bold hover:bg-amber-50 transition shadow-xl"
            >
              Buat Undangan Sekarang
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="text-white font-bold text-lg">WirNikah</span>
          </div>
          <p className="mb-4">Platform undangan pernikahan digital terbaik di Indonesia</p>
          <p className="text-sm">© 2026 WirNikah. Dibuat dengan ❤️ oleh Wir-Code</p>
        </div>
      </footer>
    </div>
  );
}
