'use client'
import {useLoading} from "@/contexts/loadingContext";

export function useApiAction() {
  const { increment, decrement } = useLoading();
  const apiGET = async (url: string, params?: Record<string, string>) => {
    const query = params
      ? `${new URLSearchParams(params).toString()}`
      : "";
    const api = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_API_VERSION}${url}${query}`;
    increment();
    try {
      const res = await fetch(api, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      return await res.json();
    } finally {
      decrement();
    }
  }
  const apiPOST = async (url: string, payload?: any) => {
    const api = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_API_VERSION}${url}`;
    increment();
    try {
      const isFormData = payload instanceof FormData;
      const response = await fetch(api, {
        method: 'POST',
        headers: isFormData ? undefined :{ "Content-Type": "application/json" },
        body: isFormData ? payload : JSON.stringify(payload)
      });
      const res = await response.json();
      const status = response.status;
      return {
        status: status,
        data: res
      }
    } finally {
      decrement();
    }
  }
  const apiPUT = async (url: string, payload?: any) => {
    const api = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_API_VERSION}${url}`;
    increment();
    try {
      const response = await fetch(api, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      const res = await response.json();
      const status = response.status;
      return {
        status: status,
        data: res
      }
    } finally {
      decrement();
    }
  }
  const apiDELETE = async (url: string, payload?: any) => {
    const api = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_API_VERSION}${url}`;
    increment();
    try {
      const params: any[] = payload;
      const response = await fetch(api, {
        method: 'DELETE',
        body: JSON.stringify(params)
      })
      const res = await response.json();
      const status = response.status;
      return {
        status: status,
        data: res
      }
    } finally {
      decrement();
    }
  }

  return { apiGET, apiPOST, apiPUT, apiDELETE }
}