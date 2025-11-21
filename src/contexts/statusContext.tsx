'use client'
import React, {createContext, useContext, useEffect, useMemo, useRef, useState} from "react";

type Ctx = {
  showStatus: boolean;
  statusType: string;
  statusMessage: string;
  setStatus: (_statusType: string, _statusMessage: string) => void;
}

const statusCtx = createContext<Ctx>({
  showStatus: false,
  statusType: '',
  statusMessage: '',
  setStatus: (_statusType: string, _statusMessage: string) => {}
});

export function StatusProvider({ children }: { children: React.ReactNode }) {
  const [showStatus, setShowStatus] = useState(false);
  const [statusType, setStatusType] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const showStatusTime = 5000;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!showStatus) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowStatus(false);
    }, showStatusTime);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [showStatus, statusType, statusMessage]);

  const value = useMemo(
    () => ({
      showStatus,
      statusType,
      statusMessage,
      setStatus: (statusType: string, statusMessage: string) => {
        setShowStatus(true);
        setStatusType(statusType);
        setStatusMessage(statusMessage);
      }
    }),
    [showStatus, statusType, statusMessage]
  );
  return <statusCtx.Provider value={value}>{children}</statusCtx.Provider>
}

export const useStatus = () => useContext(statusCtx);