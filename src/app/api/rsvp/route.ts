import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { invitationId, name, attendance, guests, message } = await req.json();

    if (!invitationId || !name || !attendance) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        invitationId,
        name,
        attendance,
        guests: guests || 1,
        message: message || "",
      },
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
