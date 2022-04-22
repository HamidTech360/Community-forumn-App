import React, { useState } from "react";
import { useModal } from "./useModal";

export const useModalWithData = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const toggle = () => setModalOpen(!modalOpen);

  const [selected, setSelected] = useState<Record<string, any>>({});
  const setModalState = (state: any) => {
    setModalOpen(state);
    if (state === false) {
      setSelected({});
    }
  };
  return {
    modalOpen,
    setModalOpen,
    toggle,
    selected,
    setSelected,
    setModalState,
  };
};
