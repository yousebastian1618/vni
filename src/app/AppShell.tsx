'use client'
import styles from "./App.module.scss";
import {ReactNode} from "react";
import {useLoading} from "@/contexts/loadingContext";
import Loading from "@/components/Loading/Loading";

export default function AppShell({ children }: Readonly<{ children: ReactNode}>) {

  const { count } = useLoading();

  return (
    <>
      <div className={count ? styles.loadingContainer : styles.displayNone}>
        <Loading />
      </div>
      <div className={count ? styles.disableOpacity : ''}>
        {children}
      </div>
    </>
  )

}