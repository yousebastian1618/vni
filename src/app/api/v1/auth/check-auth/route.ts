import {NextResponse} from "next/server";
import {verifyJwt} from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function GET(req: NextResponse) {
  try {
    const token = req.cookies.get("auth")?.value;
    if (!token) {
      return NextResponse.json(null, { status: 200 });
    }
    let decoded = null;
    try {
      decoded = await verifyJwt(token);
    } catch {
      return NextResponse.json(null, { status: 200 });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded?.sub },
      select: { id: true, email: true }
    });
    if (!user) {
      return NextResponse.json(null, { status: 200 });
    }
    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}