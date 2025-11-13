import {listObjects, putObject} from "@/lib/cloudflare";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
  const data = await listObjects('products/');
  const keys = (data.Contents ?? [])
    .filter(o => o.Key && !o.Key.endsWith('/'))
    .map(o => o.Key as string);
  const products = await Promise.all(
    keys.map(async (key) => {
      const url = `/api/v1/product?key=${encodeURIComponent(key)}`;
      return { key, url };
    })
  )
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  const key = (form.get('key') as string) || (file?.name ?? "upload.bin");

  if (!file) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = file.type || "application/octet-stream";

  await putObject(key, buffer, contentType);
  return NextResponse.json({ ok: true, key });
}