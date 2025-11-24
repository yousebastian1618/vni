import { prisma } from '@/lib/prisma';
import {NextRequest, NextResponse} from "next/server";
import {generateToken} from "@/objects/helper";

export async function POST(req: NextRequest) {
  // try {
  //   const body = await req.json();
  //   const { email } = body;
  //   const user = await prisma.user.findUnique({
  //     where: { email }
  //   });
  //   if (!user) {
  //     return NextResponse.json({ error: "User with this email does not exist" }, { status: 404 });
  //   }
  //   const token = generateToken();
  //   await prisma.user.update({
  //     where: { email },
  //     data: { token }
  //   });
  //   return NextResponse.json({ data: true }, { status: 200 });
  // } catch (err) {
  //   if (typeof err === 'object' && err && 'code' in err && (err as any).code === 'P2002') {
  //     return NextResponse.json({ error: 'Something went wrong' }, { status: 409 });
  //   }
  //   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  // }
  return NextResponse.json('ok', { status: 500 });
}