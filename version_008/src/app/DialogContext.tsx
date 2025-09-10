"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type DialogContextType = {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};
export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog は <DialogProvider> と併用してください");
  }
  return context;
};

type DialogProviderProps = {
  children: ReactNode;
};
export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <DialogContext value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext>
  );
};
