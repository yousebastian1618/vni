import {NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";
import {hashPassword} from "@/lib/helper";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const existing = await prisma.user.findUnique({ where: { email }});
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
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





  // try {
  //
  //   const passwordHash = await hashPassword(password);
  //
  //   const user = await prisma.user.create({
  //     data: { email, password: passwordHash },
  //     select: { id: true, email: true }
  //   });
  //
  //   const token = await signJwt({ sub: user.id })
  //
  //   const res = NextResponse.json({ user });
  //   res.cookies.set({
  //     name: 'access_token',
  //     value: token,
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'lax',
  //     path: '/',
  //     maxAge: 60 * 60 * 12
  //   });
  // } catch (err) {
  //   if (typeof err === 'object' && err && 'code' in err && (err as any).code === 'P2002') {
  //     return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
  //   }
  //   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  // }
}