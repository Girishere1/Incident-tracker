import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title || !body.service || !body.severity || !body.status) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const incident = await prisma.incident.create({
    data: {
      title: body.title,
      service: body.service,
      severity: body.severity,
      status: body.status,
      owner: body.owner || null,
      summary: body.summary || null,
    },
  });

  return NextResponse.json(incident);
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const service = searchParams.get("service");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const incidents = await prisma.incident.findMany({
    where: {
      ...(service && { service }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { summary: { contains: search } },
        ],
      }),
    },
  });

  return NextResponse.json(incidents);
}

