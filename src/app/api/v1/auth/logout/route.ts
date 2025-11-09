import {NextResponse} from "next/server";
import {clearCookie} from "@/lib/cookies";

export async function POST() {
  const res = NextResponse.json({data: null}, {status: 200});
  clearCookie(res);
  return res;
}