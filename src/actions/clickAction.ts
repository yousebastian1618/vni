'use client'
import {Button} from "@/types/types";
import {useAuth} from "@/contexts/authContext";
import {useRouter} from "next/navigation";
import {useApiAction} from "@/actions/apiAction";
import {useStatus} from "@/contexts/statusContext";

export function useHandleClickAction() {
  const router = useRouter();
  const { login } = useAuth();
  const { apiPOST, apiPUT, apiDELETE } = useApiAction();
  const { setStatus } = useStatus();

  return async function handleClickAction(button: Button, elements?: any) {
    const { func, name } = button;
    if (func === 'crud') {
      let message = '';
      let status = 200;
      const apiFunc = name.split('|')[0];
      const api = name.split('|')[1];
      if (apiFunc === 'auth') {
        if (api === '/login') {
          const res = await login(elements[0]);
          if (res) {
            router.push('/');
          }
          return;
        }
      }





      if (apiFunc === 'create') {
        let params = elements;
        if (api === '/blogs') {
          const { blog, paragraphs } = elements;
          const blogThumbnail= await apiPOST('/thumbnail', blog[1]);
          blog[0]['thumbnail'] = await blogThumbnail.data.id;
          for (const paragraph of paragraphs) {
            const paragraphThumbnailId = await apiPOST('/thumbnail', paragraph[1]);
            paragraph[0]['thumbnail'] = await paragraphThumbnailId.data.id;
          }
          params = { blog, paragraphs };
        } else if (api === '/projects') {
          params = elements;
        } else if (api === '/inquiry') {
          params = elements[0];
        }
        const res = await apiPOST(api, params);
        message = res.data;
        status = res.status;
      } else if (apiFunc === 'update') {
        if (api === '/blog') {
          const { blog, paragraphs, blogId } = elements;
          const blogThumbnail= await apiPOST('/thumbnail', blog[1]);
          if (blogThumbnail.data) {
            blog[0]['thumbnail'] = await blogThumbnail.data.id;
          } else if (typeof blog[0]['thumbnail'] === 'string') {
            blog[0]['thumbnail'] = decodeURIComponent(blog[0]['thumbnail']).match(/[0-9a-fA-F-]{36}$/)?.[0] || null;
          } else {
            blog[0]['thumbnail'] = ''
          }
          for (const paragraph of paragraphs) {
            const paragraphThumbnailId = await apiPOST('/thumbnail', paragraph[1]);
            if (paragraphThumbnailId.data) {
              paragraph[0]['thumbnail'] = await paragraphThumbnailId.data.id;
            } else if (typeof paragraph[0]['thumbnail'] === 'string') {
              paragraph[0]['thumbnail'] = decodeURIComponent(paragraph[0]['thumbnail']).match(/[0-9a-fA-F-]{36}$/)?.[0] || null;
            } else {
              paragraph[0]['thumbnail'] = ''
            }
          }
          const res = await apiPUT(`${api}s/${blogId}`, { 'blog': blog[0], 'paragraphs': paragraphs});
          message = res.data;
          status = res.status;
        } else {
          const res = await apiPUT(api, elements);
          message = res.data;
          status = res.status;
        }
      } else if (apiFunc === 'delete') {
        const res = await apiDELETE(api, elements);
        message = res.data;
        status = res.status;
      }
      if (message !== '') {
        setStatus(status >= 400 ? 'error' : 'success', message);
      }
    }





    else if (func === 'navigation') {

    }
  }
}
