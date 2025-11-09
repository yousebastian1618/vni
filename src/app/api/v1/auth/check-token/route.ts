import {NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const user = await prisma.user.findFirst({
    where: { token }
  });
  if (!user) {
    return NextResponse.json({ data: null }, { status: 403 });
  }
  return NextResponse.json({ data: true }, { status: 200 })
}