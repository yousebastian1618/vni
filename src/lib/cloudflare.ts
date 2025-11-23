import 'server-only';
import { S3Client } from "@aws-sdk/client-s3";
import {
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectsCommand,
  HeadObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET = process.env.CLOUDFLARE_BUCKET;
const FALLBACK_KEY = process.env.CLOUDFLARE_FALLBACK_KEY || 'noThumbnail.jpg';

export const cfClient = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
  },
  forcePathStyle: true
});

export async function listObjects(prefix: string) {
  const cmd = new ListObjectsV2Command({
    Bucket: BUCKET,
    Delimiter: '/',
    Prefix: prefix
  });
  return cfClient.send(cmd);
}

export async function getObject(key: string) {
  try {
    const head = new HeadObjectCommand({ Bucket: BUCKET, Key: key });
    await cfClient.send(head);
    const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    return cfClient.send(cmd);
  } catch (err) {
    const fallbackCmd = new GetObjectCommand({ Bucket: BUCKET, Key: FALLBACK_KEY });
    return cfClient.send(fallbackCmd);
  }
}

export async function putObject(
  key: string,
  body: Uint8Array | Blob | string,
  contentType?: string
) {
  const cmd = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType
  });
  return cfClient.send(cmd);
}

export async function deleteObjects(keys: string[]) {
  if (keys.length === 0) return;
  const cmd = new DeleteObjectsCommand({
    Bucket: BUCKET,
    Delete: {
      Objects: keys.map((key) => ({ Key: key }))
    }
  });
  return cfClient.send(cmd);
}

export async function generatePreSignedUrl(
  method: "getObject" | "putObject",
  key: string,
  expiresInSec = 3600
) {
  if (method === 'getObject') {
    const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    return getSignedUrl(cfClient, cmd, { expiresIn: expiresInSec });
  } else {
    const cmd = new PutObjectCommand({ Bucket: BUCKET, Key: key });
    return getSignedUrl(cfClient, cmd, { expiresIn: expiresInSec });
  }
}