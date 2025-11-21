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
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json(null)
  const loc = formData.get('location') ?? '';
  const id = uuid();
  const key = `${loc}${id}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = file.type || 'application/octet-stream';

  await putObject(key, buffer, contentType);
  return NextResponse.json({ id });
}