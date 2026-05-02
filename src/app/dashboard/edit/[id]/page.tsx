"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart, ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function EditInvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { status } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    fetch(`/api/invitations/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm(data);
        setLoading(false);
      });
  }, [id]);

  const updateForm = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { id: _id, userId: _uid, createdAt: _ca, updatedAt: _ua, rsvps: _r, ...updateData } = form;
      const res = await fetch(`/api/invitations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (res.ok) {
        router.push("/dashboard");
      }
    } catch {
      alert("Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-600 fill-amber-600" />
            <span className="font-bold text-amber-800">Edit Undangan</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-8">
          {/* Template */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Template</h3>
            <div className="grid grid-cols-3 gap-3">
              {["ELEGANT_GOLD", "GARDEN_ROMANCE", "MODERN_MINIMALIST"].map((t) => (
                <button
                  key={t}
                  onClick={() => updateForm("template", t)}
                  className={`p-3 border-2 rounded-xl text-center text-sm font-medium transition ${
                    form.template === t ? "border-amber-500 bg-amber-50" : "border-gray-200"
                  }`}
                >
                  {t.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              type="text"
              value={(form.slug as string) || ""}
              onChange={(e) => updateForm("slug", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Mempelai */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Mempelai Pria</h3>
              <input type="text" value={(form.groomName as string) || ""} onChange={(e) => updateForm("groomName", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Nama panggilan" />
              <input type="text" value={(form.groomFullName as string) || ""} onChange={(e) => updateForm("groomFullName", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Nama lengkap" />
              <input type="text" value={(form.groomParents as string) || ""} onChange={(e) => updateForm("groomParents", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Putra dari" />
              <input type="text" value={(form.groomInstagram as string) || ""} onChange={(e) => updateForm("groomInstagram", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Instagram" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Mempelai Wanita</h3>
              <input type="text" value={(form.brideName as string) || ""} onChange={(e) => updateForm("brideName", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Nama panggilan" />
              <input type="text" value={(form.brideFullName as string) || ""} onChange={(e) => updateForm("brideFullName", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Nama lengkap" />
              <input type="text" value={(form.brideParents as string) || ""} onChange={(e) => updateForm("brideParents", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Putri dari" />
              <input type="text" value={(form.brideInstagram as string) || ""} onChange={(e) => updateForm("brideInstagram", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Instagram" />
            </div>
          </div>

          {/* Acara */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Akad Nikah</h3>
              <input type="date" value={(form.akadDate as string) || ""} onChange={(e) => updateForm("akadDate", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" />
              <input type="time" value={(form.akadTime as string) || ""} onChange={(e) => updateForm("akadTime", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" />
              <input type="text" value={(form.akadVenue as string) || ""} onChange={(e) => updateForm("akadVenue", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Venue" />
              <input type="text" value={(form.akadAddress as string) || ""} onChange={(e) => updateForm("akadAddress", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Alamat" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Resepsi</h3>
              <input type="date" value={(form.resepsiDate as string) || ""} onChange={(e) => updateForm("resepsiDate", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" />
              <input type="time" value={(form.resepsiTime as string) || ""} onChange={(e) => updateForm("resepsiTime", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" />
              <input type="text" value={(form.resepsiVenue as string) || ""} onChange={(e) => updateForm("resepsiVenue", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Venue" />
              <input type="text" value={(form.resepsiAddress as string) || ""} onChange={(e) => updateForm("resepsiAddress", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none" placeholder="Alamat" />
            </div>
          </div>

          {/* Published */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={!!form.published}
              onChange={(e) => updateForm("published", e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            />
            <label className="font-medium text-gray-700">Published (visible to public)</label>
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Simpan Perubahan
          </button>
        </div>
      </main>
    </div>
  );
}
