import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Item, ReceiptData } from '@/types/receiptTypes';


type ReceiptContextType = {
  receiptData: ReceiptData | null;
  setReceiptData: (data: ReceiptData) => void;
};

const ReceiptContext = createContext<ReceiptContextType | undefined>(undefined);

export const ReceiptProvider = ({ children }: { children: ReactNode }) => {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  return (
    <ReceiptContext.Provider value={{ receiptData, setReceiptData }}>
      {children}
    </ReceiptContext.Provider>
  );
};

export const useReceipt = () => {
  const context = useContext(ReceiptContext);
  if (!context) throw new Error("useReceipt must be used within a ReceiptProvider");
  return context;
};
