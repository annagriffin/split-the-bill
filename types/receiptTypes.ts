// app/types/receiptTypes.ts

export interface Item {
    id: string;
    name: string;
    price: number;
}

export interface ReceiptData {
    items: Item[];
    taxAmount: number;
    tipAmount: number;
}

export interface CalculatedTotals {
    subtotal: number;
    tax: number;
    totalAfterTax: number;
    grandTotal: number;
}
