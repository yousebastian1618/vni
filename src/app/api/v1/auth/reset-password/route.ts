import {NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";
import {hashPassword} from "@/lib/helper";

export async function POST(req: Request) {
  // try {
  //   const { password, confirmPassword, token } = await req.json();
  //   if (password !== confirmPassword) {
  //     return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
  //   }
  //   const user = await prisma.user.findFirst({
  //     where: { token }
  //   });
  //   if (!user) {
  //     return NextResponse.json({ error: "Token expired" }, { status: 400 });
  //   }
  //   const hashedPassword = await hashPassword(password);
  //   await prisma.user.update({
  //     where: { email: user.email },
  //     data: {
  //       password: hashedPassword,
  //       token: null
  //     }
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