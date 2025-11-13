import {NextRequest} from "next/server";
import {getObject} from "@/lib/cloudflare";

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