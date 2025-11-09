import { prisma } from '@/lib/prisma';
import { NextResponse } from "next/server";
import {generateToken} from "@/objects/helper";

type Props = {
  email: string;
}

export default async function POST(req: Request) {
  try {
    const { email }: Props = await req.json();
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      return NextResponse.json({ error: "User with this email does not exist" }, { status: 404 });
    }
    const token = generateToken();
    await prisma.user.update({
      where: { email },
      data: { token }
    });
    return NextResponse.json({ data: true }, { status: 200 });
  } catch (err) {
    if (typeof err === 'object' && err && 'code' in err && (err as any).code === 'P2002') {
      return NextResponse.json({ error: 'Something went wrong' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}