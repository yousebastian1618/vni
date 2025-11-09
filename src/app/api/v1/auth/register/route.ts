import {NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";
import {hashPassword} from "@/lib/helper";

export async function POST(req: Request) {
  try {
    const { email, password, confirmPassword } = await req.json();
    const existing = await prisma.user.findUnique({ where: { email }});
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }
    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    return NextResponse.json({ data: true }, { status: 201 });
  } catch (err) {
    if (typeof err === 'object' && err && 'code' in err && (err as any).code === 'P2002') {
      return NextResponse.json({ error: `Something went wrong: ${err}` }, { status: 409 });
    }
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 });
  }
}