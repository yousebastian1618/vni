'use client'
import React, { createContext, useContext, useMemo, useState } from 'react';

type Ctx = {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const LoadingCtx = createContext<Ctx>({ count: 0, increment: () => {}, decrement: () => {} });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [ count, setCount ] = useState(0);
  const value = useMemo(
    () => ({
      count,
      increment: () => setCount((c) => c + 1),
      decrement: () => setCount((c) => Math.max(0, c - 1))
    }),
    [count]
  );
  return <LoadingCtx.Provider value={value}>{children}</LoadingCtx.Provider>
}

export const useLoading = () => useContext(LoadingCtx);

