import {NextRequest, NextResponse} from "next/server";
import {deleteObject} from "@/lib/cloudflare";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "key required" }, { status :400 });
  }
  await deleteObject(`/products/${id}`);
  return NextResponse.json({ ok: true });
}