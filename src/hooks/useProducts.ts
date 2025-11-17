import useSWR from 'swr';
import { useApiAction } from "@/actions/apiAction";
import {Product} from "@/types/types";

export function useProducts() {
  const { apiGET } = useApiAction();

  const { data, error, isLoading, mutate } = useSWR<Product[]>(
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
    mutateProducts: mutate
  };
}
