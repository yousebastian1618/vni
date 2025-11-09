'use client'
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {User} from "@/types/types";
import {apiGET, apiPOST} from "@/actions/apiAction";

type Ctx = {
  user: User | null;
  checkAuth: () => Promise<void>;
  login: (requestObj: Record<string, string>) => Promise<boolean>;
  logout: () => Promise<void>;
}

const authCtx = createContext<Ctx>({
  user: null,
  checkAuth: async () => {},
  login: async (_req: Record<string, string>) => false,
  logout: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ user, setUser ] = useState(null);

  const checkAuth = async () => {
    const res = await apiGET('/auth/check-auth/');
    setUser(res.data);
  };
  const login = async (requestObj: Record<string, string>) => {
    const res = await apiPOST('/auth/login/', requestObj);
    if (res.status !== 200) {
      setUser(null);
      return false
    }
    setUser(res.data);
    return true
  };
  const logout = async () => {
    await apiPOST('/auth/logout/');
    setUser(null);
  };

  useEffect(() => {
    void checkAuth();
  }, []);

  const value = useMemo(() => ({
    user, login, logout, checkAuth
  }), [user])
  return <authCtx.Provider value={value}>{children}</authCtx.Provider>
}

export const useAuth = () => useContext(authCtx);