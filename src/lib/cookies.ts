import type { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export function setCookie(res: NextResponse, token: string, maxAgeSec = 60 * 60 * 12) {
  res.cookies.set("auth", token, {
    httpOnly: true,
    sameSite: 'lax',
    path: "/",
    maxAge: maxAgeSec
  })
}

export async function getCookie(key: string) {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
}

export function clearCookie(res: NextResponse) {
  res.cookies.set("auth", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0)
  })
}