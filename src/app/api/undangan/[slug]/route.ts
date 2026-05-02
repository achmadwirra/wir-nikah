import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const invitation = await prisma.invitation.findUnique({
      where: { slug },
      include: { rsvps: { orderBy: { createdAt: "desc" } } },
    });

    if (!invitation || !invitation.published) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(invitation);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
