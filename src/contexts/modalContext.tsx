'use client'
import React, { createContext, useContext, useMemo, useState } from 'react';
import {Button} from "@/types/types";

type Ctx = {
  modalOpen: boolean;
  modalTitle: string;
  modalType: string;
  modalMain: Record<string, string>,
  modalList?: Record<string, string>[],
  modalButtons: Button[];
  openModal: (
    modalType: string,
    modalTitle: string,
    modalMain: Record<string, string>,
    modalButtons: Button[],
    modalList?: Record<string, string>[],
  ) => void;
  selectModalMain: (modalMain: Record<string, string>) => void;
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
    _modalMain: Record<string, string>,
    _modalButtons: Button[],
    _modalList?: Record<string, string>[],
  ) => {},
  selectModalMain: (_modalMain: Record<string, string>) => {},
  closeModal: () => {}
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState('');
  const [modalMain, setModalMain] = useState({});
  const [modalList, setModalList] = useState<Record<string, string>[]>([]);
  const [modalButtons, setModalButtons] = useState<Button[]>([]);
  const value = useMemo(
    () => ({
      modalOpen,
      modalTitle,
      modalType,
      modalMain,
      modalList,
      modalButtons,
      openModal: (modalType: string, modalTitle: string, modalMain: Record<string, string>, modalButtons: Button[], modalList?: Record<string, string>[]) => {
        setModalOpen(true);
        setModalTitle(modalTitle);
        setModalType(modalType);
        setModalMain(modalMain);
        if (modalList) {
          setModalList(modalList);
        }
        setModalButtons(modalButtons);
      },
      selectModalMain: (modalMain: Record<string, string>) => {
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
