import useSWR from 'swr';
import { useApiAction } from "@/actions/apiAction";

type Product = { key: string; url: string };

export function useProducts() {
  const { apiGET } = useApiAction();

  const { data, error, isLoading } = useSWR<Product[]>(
    '/products',
    (url) => apiGET(url),   // returns the array directly
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  );

  return {
    products: data,
    error,
    isLoading,
  };
}
