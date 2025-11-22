import {NextResponse} from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
  const ok = await prisma.$queryRawUnsafe('SELECT 1 as ok');
  return NextResponse.json({ ok: true });
}