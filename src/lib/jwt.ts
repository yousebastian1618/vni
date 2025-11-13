import 'server-only';
import {SignJWT, jwtVerify} from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = process.env.JWT_ALG ?? "HS256";

export async function signJwt(
  payload: Record<string, string>,
  expiresIn = `${process.env.JWT_ACCESS_TTL_HOUR}h`
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: alg })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret)
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}