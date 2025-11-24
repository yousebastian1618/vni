import "server-only";
import {R2Bucket, R2PutOptions} from "@cloudflare/workers-types/experimental/index";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

export function isCloudflareWorkerRuntime() {
  return typeof (globalThis as any).WebSocketPair !== "undefined";
}

type Binding = {
  VNI_R2_BUCKET: R2Bucket;
};

function getBucket(): R2Bucket {
  const { env } = getCloudflareContext();
  const bucket = (env as Binding).VNI_R2_BUCKET;
  if (!bucket) throw new Error("VNI_R2_BUCKET binding is missing");
  return bucket;
}

const BUCKET = process.env.CLOUDFLARE_BUCKET!;
const cfClient = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
  },
  forcePathStyle: true,
});

export async function listObjects(prefix: string) {
  if (isCloudflareWorkerRuntime()) {
    const bucket = getBucket();
    return bucket.list({ prefix, delimiter: "/" });
  } else {
    const cmd = new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: prefix,
      Delimiter: "/",
    });
    return cfClient.send(cmd);
  }
}

export async function getObject(key: string) {
  if (isCloudflareWorkerRuntime()) {
    const bucket = getBucket();
    return bucket.get(key); // R2ObjectBody | null
  } else {
    const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    return cfClient.send(cmd); // GetObjectOutput
  }
}

export async function putObject(
  key: string,
  body: Uint8Array | Blob | string,
  contentType?: string
) {
  if (isCloudflareWorkerRuntime()) {
    const bucket = getBucket();
    const options: R2PutOptions = {};
    if (contentType) options.httpMetadata = { contentType };
    return bucket.put(key, body as any, options);
  } else {
    const cmd = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    });
    return cfClient.send(cmd);
  }
}

export async function deleteObjects(keys: string[]) {
  if (keys.length === 0) return;

  if (isCloudflareWorkerRuntime()) {
    const bucket = getBucket();
    await Promise.all(keys.map((k) => bucket.delete(k)));
  } else {
    const cmd = new DeleteObjectsCommand({
      Bucket: BUCKET,
      Delete: { Objects: keys.map((Key) => ({ Key })) },
    });
    return cfClient.send(cmd);
  }
}
