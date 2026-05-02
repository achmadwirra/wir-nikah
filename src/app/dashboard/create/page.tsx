"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart, ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import Link from "next/link";

const steps = [
  "Pilih Template",
  "Data Mempelai",
  "Detail Acara",
  "Gallery",
  "Pesan & Musik",
  "Preview & Publish",
];

const templates = [
  { id: "ELEGANT_GOLD", name: "Elegant Gold", desc: "Gold & cream, classic luxury", colors: "from-yellow-100 to-amber-50 border-amber-300", emoji: "👑" },
  { id: "GARDEN_ROMANCE", name: "Garden Romance", desc: "Green & pink, floral botanical", colors: "from-green-50 to-pink-50 border-green-300", emoji: "🌸" },
  { id: "MODERN_MINIMALIST", name: "Modern Minimalist", desc: "Black & white, clean typography", colors: "from-gray-50 to-white border-gray-300", emoji: "◼️" },
  { id: "RUSTIC_VINTAGE", name: "Rustic Vintage", desc: "Brown & beige, kraft paper feel", colors: "from-orange-50 to-amber-50 border-orange-300", emoji: "🍂" },
  { id: "JAVANESE_TRADITIONAL", name: "Javanese Traditional", desc: "Deep red & gold, batik patterns", colors: "from-red-100 to-yellow-50 border-red-400", emoji: "🏛️" },
  { id: "ISLAMIC_ELEGANT", name: "Islamic Elegant", desc: "Green & gold, geometric patterns", colors: "from-green-100 to-emerald-50 border-green-400", emoji: "☪️" },
  { id: "CHERRY_BLOSSOM", name: "Cherry Blossom", desc: "Soft pink & white, sakura theme", colors: "from-pink-100 to-pink-50 border-pink-300", emoji: "🌸" },
  { id: "NAVY_LUXURY", name: "Navy Luxury", desc: "Navy blue & silver, premium feel", colors: "from-blue-100 to-indigo-50 border-blue-400", emoji: "💎" },
  { id: "TROPICAL_PARADISE", name: "Tropical Paradise", desc: "Teal & coral, beach vibes", colors: "from-teal-50 to-orange-50 border-teal-300", emoji: "🌴" },
  { id: "SAGE_EUCALYPTUS", name: "Sage Eucalyptus", desc: "Sage green & white, organic natural", colors: "from-green-50 to-lime-50 border-green-300", emoji: "🌿" },
];

export default function CreateInvitationPage() {
  const { status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    template: "ELEGANT_GOLD",
    slug: "",
    groomName: "",
    groomFullName: "",
    groomParents: "",
    groomPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    groomInstagram: "",
    brideName: "",
    brideFullName: "",
    brideParents: "",
    bridePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    brideInstagram: "",
    akadDate: "",
    akadTime: "",
    akadVenue: "",
    akadAddress: "",
    resepsiDate: "",
    resepsiTime: "",
    resepsiVenue: "",
    resepsiAddress: "",
    mapsLink: "",
    gallery: ["https://images.unsplash.com/photo-1519741497674-611481863552?w=600", "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600", "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600"],
    galleryCaptions: ["Prewedding 1", "Prewedding 2", "Prewedding 3", "Prewedding 4"],
    quote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. (QS. Ar-Rum: 21)",
    message: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.",
    musicChoice: "romantic1",
    published: false,
  });

  const updateForm = (field: string, value: string | string[] | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePublish = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, published: true }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        alert(data.error || "Gagal menyimpan");
      }
    } catch {
      alert("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, published: false }),
      });

      if (res.ok) {
        router.push("/dashboard");
      }
    } catch {
      alert("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-600 fill-amber-600" />
            <span className="font-bold text-amber-800">Buat Undangan</span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i < step ? "bg-green-500 text-white" : i === step ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className="hidden sm:block ml-2 text-xs text-gray-600">{s}</span>
                {i < steps.length - 1 && <div className="w-4 sm:w-8 h-0.5 bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          {/* Step 1: Template */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilih Template</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateForm("template", t.id)}
                    className={`bg-gradient-to-br ${t.colors} border-2 rounded-xl p-4 sm:p-5 text-center transition hover:shadow-lg ${
                      form.template === t.id ? "ring-2 ring-amber-500 ring-offset-2" : ""
                    }`}
                  >
                    <span className="text-3xl block mb-2">{t.emoji}</span>
                    <h3 className="font-bold text-sm sm:text-base">{t.name}</h3>
                    <p className="text-xs opacity-70 mt-1 line-clamp-2">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Data Mempelai */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Mempelai</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-blue-700">👤 Mempelai Pria</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Panggilan</label>
                    <input type="text" value={form.groomName} onChange={(e) => updateForm("groomName", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Ahmad" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input type="text" value={form.groomFullName} onChange={(e) => updateForm("groomFullName", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Ahmad Fauzi, S.Kom" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Putra dari</label>
                    <input type="text" value={form.groomParents} onChange={(e) => updateForm("groomParents", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Bapak H. Fauzi & Ibu Hj. Aminah" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram (optional)</label>
                    <input type="text" value={form.groomInstagram} onChange={(e) => updateForm("groomInstagram", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="@ahmad_fauzi" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-pink-700">👤 Mempelai Wanita</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Panggilan</label>
                    <input type="text" value={form.brideName} onChange={(e) => updateForm("brideName", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Sarah" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input type="text" value={form.brideFullName} onChange={(e) => updateForm("brideFullName", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Sarah Amelia, S.Pd" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Putri dari</label>
                    <input type="text" value={form.brideParents} onChange={(e) => updateForm("brideParents", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Bapak Dr. Surya & Ibu Ratna" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram (optional)</label>
                    <input type="text" value={form.brideInstagram} onChange={(e) => updateForm("brideInstagram", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="@sarah_amelia" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Detail Acara */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detail Acara</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-amber-700">🕌 Akad Nikah</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                    <input type="date" value={form.akadDate} onChange={(e) => updateForm("akadDate", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Waktu</label>
                    <input type="time" value={form.akadTime} onChange={(e) => updateForm("akadTime", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Venue</label>
                    <input type="text" value={form.akadVenue} onChange={(e) => updateForm("akadVenue", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Masjid Al-Ikhlas" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                    <textarea value={form.akadAddress} onChange={(e) => updateForm("akadAddress", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" rows={2} placeholder="Jl. Masjid No. 1, Jakarta" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-amber-700">🎉 Resepsi</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                    <input type="date" value={form.resepsiDate} onChange={(e) => updateForm("resepsiDate", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Waktu</label>
                    <input type="time" value={form.resepsiTime} onChange={(e) => updateForm("resepsiTime", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Venue</label>
                    <input type="text" value={form.resepsiVenue} onChange={(e) => updateForm("resepsiVenue", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Ballroom Hotel Grand" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                    <textarea value={form.resepsiAddress} onChange={(e) => updateForm("resepsiAddress", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" rows={2} placeholder="Jl. Sudirman No. 10, Jakarta" />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link</label>
                <input type="url" value={form.mapsLink} onChange={(e) => updateForm("mapsLink", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="https://maps.google.com/..." />
              </div>
            </div>
          )}

          {/* Step 4: Gallery */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery Foto</h2>
              <p className="text-gray-600 mb-4">Masukkan URL foto prewedding (4-8 foto)</p>
              <div className="space-y-4">
                {form.gallery.map((url, i) => (
                  <div key={i} className="flex gap-3">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        const newGallery = [...form.gallery];
                        newGallery[i] = e.target.value;
                        updateForm("gallery", newGallery);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="https://..."
                    />
                    <input
                      type="text"
                      value={form.galleryCaptions[i] || ""}
                      onChange={(e) => {
                        const newCaptions = [...form.galleryCaptions];
                        newCaptions[i] = e.target.value;
                        updateForm("galleryCaptions", newCaptions);
                      }}
                      className="w-40 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="Caption"
                    />
                  </div>
                ))}
                {form.gallery.length < 8 && (
                  <button
                    onClick={() => {
                      updateForm("gallery", [...form.gallery, ""]);
                      updateForm("galleryCaptions", [...form.galleryCaptions, ""]);
                    }}
                    className="text-amber-600 font-medium hover:underline"
                  >
                    + Tambah Foto
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Pesan & Musik */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pesan & Musik</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quotes / Ayat</label>
                  <textarea value={form.quote} onChange={(e) => updateForm("quote", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" rows={4} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pesan untuk Tamu</label>
                  <textarea value={form.message} onChange={(e) => updateForm("message", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Music</label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { id: "romantic1", name: "Romantic Piano" },
                      { id: "romantic2", name: "Acoustic Love" },
                      { id: "romantic3", name: "String Quartet" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => updateForm("musicChoice", m.id)}
                        className={`p-4 border-2 rounded-xl text-center transition ${
                          form.musicChoice === m.id ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-amber-300"
                        }`}
                      >
                        <span className="text-2xl">🎵</span>
                        <p className="text-sm font-medium mt-1">{m.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Preview & Publish */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview & Publish</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom Slug (URL undangan)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">/undangan/</span>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => updateForm("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="ahmad-dan-sarah"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <h3 className="font-bold text-amber-800 mb-3">📋 Ringkasan Undangan</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">Template:</span> <span className="font-medium">{form.template.replace(/_/g, " ")}</span></div>
                    <div><span className="text-gray-600">Mempelai:</span> <span className="font-medium">{form.groomName} & {form.brideName}</span></div>
                    <div><span className="text-gray-600">Akad:</span> <span className="font-medium">{form.akadDate} {form.akadTime}</span></div>
                    <div><span className="text-gray-600">Resepsi:</span> <span className="font-medium">{form.resepsiDate} {form.resepsiTime}</span></div>
                    <div><span className="text-gray-600">Gallery:</span> <span className="font-medium">{form.gallery.filter(Boolean).length} foto</span></div>
                    <div><span className="text-gray-600">Music:</span> <span className="font-medium">{form.musicChoice}</span></div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSaveDraft}
                    disabled={saving}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                  >
                    Simpan Draft
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={saving || !form.slug}
                    className="flex-1 bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                    Publish Undangan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Sebelumnya
            </button>
            {step < 5 && (
              <button
                onClick={() => setStep((s) => Math.min(5, s + 1))}
                className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-amber-700 transition"
              >
                Selanjutnya
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
