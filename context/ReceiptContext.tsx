import React, { createContext, useContext, useState, ReactNode } from "react";
import { Item, Person, ReceiptData } from "@/types/Types";

// Define context types
interface ReceiptContextType {
  receiptData: ReceiptData;
  setReceiptData: (data: ReceiptData) => void;
  updateReceiptData: (updates: Partial<ReceiptData>) => void;
  updateItemPeople: (itemId: string, people: Person[]) => void; // Change to Person[]
}

// Create the context with initial values
const ReceiptContext = createContext<ReceiptContextType | undefined>(undefined);

export const ReceiptProvider = ({ children }: { children: ReactNode }) => {
  const dummyReceiptData: ReceiptData = {
    items: [
      { id: "1", name: "French Fries", price: 3.87, people: [] },
      { id: "2", name: "Hot Dog", price: 3.59, people: [] },
      { id: "3", name: "Soda", price: 3.87, people: [] },
    ],
    taxAmount: 0.07,
    tipAmount: 1.0,
    people: [] // Default to an empty array for people
  };

  const [receiptData, setReceiptData] = useState<ReceiptData>(dummyReceiptData);

  // Function to update general properties of receiptData
  const updateReceiptData = (updates: Partial<ReceiptData>) => {
    setReceiptData((prevData) => ({
      ...prevData,
      ...updates,
    }));
  };

  // Function to update the people array of a specific item by item ID
  const updateItemPeople = (itemId: string, people: Person[]) => { // Change to Person[]
    setReceiptData((prevData) => {
      const updatedItems = prevData.items.map((item) =>
        item.id === itemId ? { ...item, people } : item
      );
      return { ...prevData, items: updatedItems };
    });
  };

  return (
    <ReceiptContext.Provider
      value={{
        receiptData,
        setReceiptData,
        updateReceiptData,
        updateItemPeople,
      }}
    >
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
