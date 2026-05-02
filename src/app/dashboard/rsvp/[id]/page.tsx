"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, CheckCircle, XCircle, Download, Heart } from "lucide-react";

interface RSVPItem {
  id: string;
  name: string;
  attendance: "HADIR" | "TIDAK_HADIR";
  guests: number;
  message: string;
  createdAt: string;
}

interface InvitationData {
  id: string;
  groomName: string;
  brideName: string;
  rsvps: RSVPItem[];
}

export default function RSVPPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<InvitationData | null>(null);
  const [filter, setFilter] = useState<"ALL" | "HADIR" | "TIDAK_HADIR">("ALL");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    fetch(`/api/invitations/${id}`)
      .then((r) => r.json())
      .then(setData);
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const filtered = data.rsvps.filter((r) => filter === "ALL" || r.attendance === filter);
  const hadirCount = data.rsvps.filter((r) => r.attendance === "HADIR").length;
  const tidakHadirCount = data.rsvps.filter((r) => r.attendance === "TIDAK_HADIR").length;
  const totalGuests = data.rsvps.filter((r) => r.attendance === "HADIR").reduce((sum, r) => sum + r.guests, 0);

  const exportCSV = () => {
    const headers = "Nama,Kehadiran,Jumlah Tamu,Ucapan,Waktu\n";
    const rows = data.rsvps.map((r) =>
      `"${r.name}","${r.attendance === "HADIR" ? "Hadir" : "Tidak Hadir"}",${r.guests},"${r.message}","${new Date(r.createdAt).toLocaleString("id-ID")}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvp-${data.groomName}-${data.brideName}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-600 fill-amber-600" />
            <span className="font-bold text-amber-800">RSVP Management</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          RSVP: {data.groomName} & {data.brideName}
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <p className="text-2xl font-bold text-gray-900">{data.rsvps.length}</p>
            <p className="text-sm text-gray-600">Total RSVP</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <p className="text-2xl font-bold text-green-600">{hadirCount}</p>
            <p className="text-sm text-gray-600">Hadir</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <p className="text-2xl font-bold text-red-600">{tidakHadirCount}</p>
            <p className="text-sm text-gray-600">Tidak Hadir</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <p className="text-2xl font-bold text-amber-600">{totalGuests}</p>
            <p className="text-sm text-gray-600">Total Tamu</p>
          </div>
        </div>

        {/* Filter & Export */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex gap-2">
            {(["ALL", "HADIR", "TIDAK_HADIR"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === f ? "bg-amber-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {f === "ALL" ? "Semua" : f === "HADIR" ? "Hadir" : "Tidak Hadir"}
              </button>
            ))}
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Nama</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Tamu</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Ucapan</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                    <td className="px-4 py-3">
                      {r.attendance === "HADIR" ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4" /> Hadir
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                          <XCircle className="w-4 h-4" /> Tidak Hadir
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{r.guests}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{r.message}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm">
                      {new Date(r.createdAt).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-500">Belum ada RSVP</div>
          )}
        </div>
      </main>
    </div>
  );
}
