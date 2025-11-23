import {NextRequest, NextResponse} from "next/server";
import { v4 as uuid } from "uuid";
import {getObject, putObject} from "@/lib/cloudflare";

export async function GET(req: NextRequest) {
  const key = new URL(req.url).searchParams.get("key");
  if (!key) return new Response("key required", { status: 400 });
  const obj = await getObject(key);
  const body = obj.Body as unknown as ReadableStream;
  const headers = new Headers();
  if (obj.ContentType) headers.set("Content-Type", obj.ContentType);
  headers.set('Cache-Control', 'public, max-age=300, s-maxage=300');
  return new Response(body, { headers });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'file required' }, { status: 400 });
  }

  const loc = (formData.get('location') as string | null) ?? '';
  const id = uuid();
  const key = `${loc}${id}`;

  const arrayBuffer = await file.arrayBuffer();
  const body = new Uint8Array(arrayBuffer); // ✅ Worker-safe
  const contentType = file.type || 'application/octet-stream';

  await putObject(key, body, contentType);
  return NextResponse.json({ id, key });
}