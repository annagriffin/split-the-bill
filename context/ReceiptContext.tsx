import React, { createContext, useContext, useState, ReactNode } from "react";
import { Item, ReceiptData } from "@/types/Types";

// Define context types
interface ReceiptContextType {
  receiptData: ReceiptData;
  setReceiptData: (data: ReceiptData) => void;
}

// Create the context with initial values
const ReceiptContext = createContext<ReceiptContextType | undefined>(undefined);

export const ReceiptProvider = ({ children }: { children: ReactNode }) => {
  const dummyReceiptData: ReceiptData = {
    items: [
      { id: "1", name: "French Fries", price: 3.87 },
      { id: "28", name: "Hot Dog", price: 3.59 },
      { id: "18", name: "French Fries", price: 3.87 },
      { id: "29", name: "Hot Dog", price: 3.59 },
      { id: "15", name: "French Fries", price: 3.87 },
      { id: "24", name: "Hot Dog", price: 3.59 },
      { id: "3", name: "Soda", price: 1.56 },
      { id: "4", name: "Soda", price: 1.56 },
    ],
    taxAmount: 0.07,
    tipAmount: 1.0,
  };

  const [receiptData, setReceiptData] = useState<ReceiptData>(dummyReceiptData);

  return (
    <ReceiptContext.Provider value={{ receiptData, setReceiptData }}>
      {children}
    </ReceiptContext.Provider>
  );
};

// Hook to use ReceiptContext in components
export const useReceipt = () => {
  const context = useContext(ReceiptContext);
  if (!context)
    throw new Error("useReceipt must be used within a ReceiptProvider");
  return context;
};
