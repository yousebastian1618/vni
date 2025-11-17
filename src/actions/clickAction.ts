'use client'
import {Button} from "@/types/types";
import {formToObject} from "@/lib/helper";
import {useAuth} from "@/contexts/authContext";
import {useRouter} from "next/navigation";
import {useApiAction} from "@/actions/apiAction";

export function useHandleClickAction() {
  const router = useRouter();
  const { login } = useAuth();
  const { apiPOST, apiPUT, apiDELETE } = useApiAction();

  return async function handleClickAction(button: Button, elements?: any) {
    const { func, name } = button;
    console.log(func, name);
    if (func === 'crud') {
      if (name === 'login') {
        const requestObj = formToObject(elements ?? []);
        const res = await login(requestObj);
        if (res) {
          router.push('/');
        }
      } else if (name === 'add|products') {
        await apiPOST('/products', elements);
      }
      else if (name === 'update|products') {
        await apiPUT('/products', elements);
      } else if (name === 'delete|products') {
        await apiDELETE('/products', elements);
      } else if (name === 'update|blogs') {
        console.log('updating blogs');
        console.log(elements);
      } else if (name === 'delete|blogs') {
        console.log('deleting blogs');
        console.log(elements);
      }
    } else if (func === 'navigation') {
      console.log('hello');
    }
  }
}
