import 'server-only';
import {getCloudflareContext} from "@opennextjs/cloudflare";

function getBucket() {
  const { env } = getCloudflareContext();
  const bucket = (env as any).R2_BUCKET; // or R2_PRODUCTS if that's your binding name

  if (!bucket) {
    throw new Error("R2_BUCKET binding is missing");
  }

  return bucket;
}

export async function getObject(key: string) {
  const bucket = getBucket();
  return bucket.get(key);
}

export async function putObject(
  key: string,
  bytes: Uint8Array,
  contentType?: string
) {
  const bucket = getBucket();
  await bucket.put(key, bytes, {
    httpMetadata: contentType ? { contentType } : undefined
  })
}

export async function deleteObjects(keys: string[]) {
  const bucket = getBucket();
  await Promise.all(
    keys.map(async (key) => {
      await bucket.delete(key);
    })
  )
}
