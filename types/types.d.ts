// types/types.d.ts

export interface Item {
    id: string;
    name: string;
    price: number;
    people?: string[]; // Each item can have a list of associated people
}

export interface ReceiptData {
    items: Item[];
    taxAmount: number;
    tipAmount: number;
    people: Person[]; // Define people at the top level of ReceiptData
}

export interface Person {
    id: string;
    name: string;
    initials: string;
}

export interface ItemBreakdown {
    name: string;
    price: number;
    splitCount: number;
    sharePrice: string;
}
