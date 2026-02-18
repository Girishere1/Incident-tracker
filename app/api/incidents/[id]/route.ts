import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET single incident by ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ await params

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const incident = await prisma.incident.findUnique({
    where: { id: numericId },
  });

  if (!incident) {
    return NextResponse.json({ error: "Incident not found" }, { status: 404 });
  }

  return NextResponse.json(incident);
}

// UPDATE incident
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await request.json();

  const updatedIncident = await prisma.incident.update({
    where: { id: numericId },
    data: {
      title: body.title,
      service: body.service,
      severity: body.severity,
      status: body.status,
      summary: body.summary,
      owner: body.owner ?? null, // optional
    },
  });

  return NextResponse.json(updatedIncident);
}

// DELETE incident
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  await prisma.incident.delete({
    where: { id: numericId },
  });

  return NextResponse.json({ success: true });
}
