
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { getObject, putObject, isCloudflareWorkerRuntime } from "@/lib/cloudflare";

import type { R2ObjectBody } from "@cloudflare/workers-types/experimental";
import type {GetObjectOutput} from "@aws-sdk/client-s3";

export async function GET(req: NextRequest) {
  const key = new URL(req.url).searchParams.get("key");
  if (!key) {
    return new Response("key required", { status: 400 });
  }
  const obj = await getObject(key);
  if (isCloudflareWorkerRuntime()) {
    const r2Obj = obj as R2ObjectBody | null;
    if (!r2Obj) {
      return new Response("Not found", { status: 404 });
    }
    const headers = new Headers();
    if (r2Obj.httpMetadata?.contentType) {
      headers.set("Content-Type", r2Obj.httpMetadata.contentType);
    }
    headers.set("Cache-Control", "public, max-age=300, s-maxage=300");
    return new Response(r2Obj.body as any, { headers });
  }
  const s3Obj = obj as GetObjectOutput;
  const body = s3Obj.Body as unknown as ReadableStream;
  const headers = new Headers();
  if (s3Obj.ContentType) headers.set("Content-Type", s3Obj.ContentType);
  headers.set('Cache-Control', 'public, max-age=300, s-maxage=300');
  return new Response(body, { headers });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  const loc = (formData.get("location") as string | null) ?? "";
  const id = uuid();
  const key = `${loc}${id}`;

  const arrayBuffer = await file.arrayBuffer();
  const body = new Uint8Array(arrayBuffer);
  const contentType = file.type || "application/octet-stream";

  await putObject(key, body, contentType);

  return NextResponse.json({ id, key });
}