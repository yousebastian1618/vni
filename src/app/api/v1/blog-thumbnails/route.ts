import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.log(formData);
  // const file = formData.get('file') as File | null;
  return NextResponse.json({ ok: true });
}