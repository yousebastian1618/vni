import { prisma } from "@/lib/prisma";
import {NextResponse} from "next/server";
import {verifyPassword} from "@/lib/helper";

type Props = {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, password } : Props = await req.json();
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      return NextResponse.json({ error: "One of your credentials is wrong. Please try again."}, { status: 400 })
    }
    const correctPassword = await verifyPassword(password, user.password)
    if (!correctPassword) {
      return NextResponse.json({ error: "One of your credentials is wrong. Please try again."}, { status: 400 })
    }
    return NextResponse.json({ data: user }, { status: 200})
  } catch (err) {
    if (typeof err === 'object' && err && 'code' in err && (err as any).code === 'P2002') {
      return NextResponse.json({ error: 'Something went wrong' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}