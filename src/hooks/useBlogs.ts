import useSWR from 'swr';
import { useApiAction } from "@/actions/apiAction";
import type { Blog } from "@/types/types";

export function useBlogs() {
  const { apiGET } = useApiAction();

  const { data, error, isLoading, mutate } = useSWR<Blog[]>(
    '/blogs',
    (url) => apiGET(url),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0
    }
  );

  return {
    blogs: data,
    error,
    isLoading,
    mutateBlogs: mutate
  }
}