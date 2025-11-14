'use client'
import styles from "./App.module.scss";
import {ReactNode} from "react";
import {useLoading} from "@/contexts/loadingContext";
import Loading from "@/components/Loading/Loading";
import {useModal} from "@/contexts/modalContext";
import Modal from "@/components/Modal/Modal";

export default function AppShell({ children }: Readonly<{ children: ReactNode}>) {

  const { count } = useLoading();
  const { modalOpen } = useModal();

  return (
    <>
      <div className={count ? styles.loadingContainer : styles.displayNone}>
        <Loading />
      </div>
      <div className={modalOpen ? styles.modalOpen : styles.modalClose}>
        <Modal />
      </div>
      <div className={count ? styles.disableOpacity : ''}>
        {children}
      </div>
    </>
  )

}