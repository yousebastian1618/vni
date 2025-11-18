import bcrypt from 'bcryptjs';
import {InputElement} from "@/types/types";

export async function hashPassword(plain: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export function formToObject(form: InputElement[]) {
  let obj: Record<string, any> = {};
  for (let inputElement of form) {
    obj[inputElement.name] = inputElement.value;
  }
  return obj;
}