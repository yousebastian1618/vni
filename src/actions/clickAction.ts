'use client'
import {Button, InputElement} from "@/types/types";
import {formToObject} from "@/lib/helper";
import {useAuth} from "@/contexts/authContext";
import {useRouter} from "next/navigation";


export function useHandleClickAction() {
  const router = useRouter();
  const { login } = useAuth();

  return async function handleClickAction(button: Button, form?: InputElement[]) {
    const { function: fn, name } = button;
    if (fn === 'crud') {
      if (name === 'login') {
        const requestObj = formToObject(form ?? []);
        const res = await login(requestObj);
        if (res) {
          router.push('/');
        }
      }
    }
  }
}
