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
      } else if (name === 'submit|blogs') {
        const { blog, paragraphs } = elements;
        const blogThumbnail= await apiPOST('/thumbnails', blog[1]);
        blog[0]['thumbnail'] = await blogThumbnail.data.id;
        for (const paragraph of paragraphs) {
          const paragraphThumbnailId = await apiPOST('/thumbnails', paragraph[1]);
          paragraph[0]['thumbnail'] = await paragraphThumbnailId.data.id;
        }
        await apiPOST('/blogs', { blog, paragraphs });
      } else if (name === 'update|blogs') {

      } else if (name === 'delete|blogs') {

      }
    } else if (func === 'navigation') {
    }
  }
}
