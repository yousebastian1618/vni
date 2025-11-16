'use client'
import React, { createContext, useContext, useMemo, useState } from 'react';
import {Button} from "@/types/types";

type Ctx = {
  modalOpen: boolean;
  modalTitle: string;
  modalType: string;
  modalMain: Record<string, any>,
  modalList?: Record<string, any>[],
  modalButtons: Button[];
  openModal: (
    modalType: string,
    modalTitle: string,
    modalMain: Record<string, any>,
    modalButtons: Button[],
    modalList?: Record<string, any>[],
  ) => void;
  selectModalMain: (modalMain: Record<string, any>) => void;
  closeModal: () => void;
}

const modalCtx = createContext<Ctx>({
  modalOpen: false,
  modalTitle: '',
  modalType: '',
  modalMain: {},
  modalButtons: [],
  openModal: (
    _modalType: string,
    _modalTitle: string,
    _modalMain: Record<string, any>,
    _modalButtons: Button[],
    _modalList?: Record<string, any>[],
  ) => {},
  selectModalMain: (_modalMain: Record<string, any>) => {},
  closeModal: () => {}
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState('');
  const [modalMain, setModalMain] = useState({});
  const [modalList, setModalList] = useState<Record<string, any>[]>([]);
  const [modalButtons, setModalButtons] = useState<Button[]>([]);
  const value = useMemo(
    () => ({
      modalOpen,
      modalTitle,
      modalType,
      modalMain,
      modalList,
      modalButtons,
      openModal: (modalType: string, modalTitle: string, modalMain: Record<string, any>, modalButtons: Button[], modalList?: Record<string, string>[]) => {
        setModalOpen(true);
        setModalTitle(modalTitle);
        setModalType(modalType);
        setModalMain(modalMain);
        if (modalList) {
          setModalList(modalList);
        }
        setModalButtons(modalButtons);
      },
      selectModalMain: (modalMain: Record<string, any>) => {
        setModalMain(modalMain);
      },
      closeModal: () => {
        setModalOpen(false);
        setModalTitle('');
        setModalType('');
        setModalMain({});
        setModalList([]);
        setModalButtons([]);
      },
    }),
    [modalOpen, modalTitle, modalMain, modalType, modalButtons]
  )
  return <modalCtx.Provider value={value}>{children}</modalCtx.Provider>
}

export const useModal = () => useContext(modalCtx);
