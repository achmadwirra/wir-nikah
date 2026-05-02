"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Heart, Plus, Edit, Trash2, Share2, Users, CheckCircle, LogOut, Eye } from "lucide-react";

interface InvitationItem {
  id: string;
  slug: string;
  groomName: string;
  brideName: string;
  template: string;
  published: boolean;
  createdAt: string;
  _count: { rsvps: number };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [invitations, setInvitations] = useState<InvitationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchInvitations();
    }
  }, [status]);

  const fetchInvitations = async () => {
    try {
      const res = await fetch("/api/invitations");
      const data = await res.json();
      setInvitations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus undangan ini?")) return;
    await fetch(`/api/invitations/${id}`, { method: "DELETE" });
    fetchInvitations();
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const totalRsvps = invitations.reduce((sum, inv) => sum + inv._count.rsvps, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-amber-600 fill-amber-600" />
            <span className="text-xl font-bold text-amber-800">WirNikah</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">{session?.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{invitations.length}</p>
                <p className="text-sm text-gray-600">Total Undangan</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalRsvps}</p>
                <p className="text-sm text-gray-600">Total RSVP</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {invitations.filter((i) => i.published).length}
                </p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Undangan Saya</h1>
          <Link
            href="/dashboard/create"
            className="bg-amber-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-amber-700 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Buat Undangan Baru
          </Link>
        </div>

        {/* Invitations List */}
        {invitations.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Heart className="w-16 h-16 text-amber-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Undangan</h3>
            <p className="text-gray-600 mb-6">Mulai buat undangan pernikahan digital pertama Anda</p>
            <Link
              href="/dashboard/create"
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-amber-700 transition"
            >
              <Plus className="w-5 h-5" />
              Buat Undangan Baru
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {invitations.map((inv) => (
              <div key={inv.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {inv.groomName} & {inv.brideName}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-500">/{inv.slug}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        inv.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {inv.published ? "Published" : "Draft"}
                      </span>
                      <span className="text-xs text-gray-500 bg-amber-50 px-2 py-0.5 rounded-full">
                        {inv.template.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {inv._count.rsvps} RSVP • Dibuat {new Date(inv.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/undangan/${inv.slug}`}
                      className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                      title="Preview"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/dashboard/edit/${inv.id}`}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/undangan/${inv.slug}`);
                        alert("Link copied!");
                      }}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Share"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <Link
                      href={`/dashboard/rsvp/${inv.id}`}
                      className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                      title="RSVP"
                    >
                      <Users className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(inv.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
