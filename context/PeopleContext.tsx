// context/PeopleContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Person, ItemBreakdown } from "@/types/types";

// Define context types
interface PeopleContextType {
  people: Person[];
  peopleWithItems: PersonWithItems[];
  addPerson: (person: Person) => void;
  removePerson: (id: string) => void;
  setPeopleWithItems: (items: PersonWithItems[]) => void;
}



interface PersonWithItems extends Person {
  items: ItemBreakdown[];
}

// Create the context with initial values
const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider = ({ children }: { children: ReactNode }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleWithItems, setPeopleWithItems] = useState<PersonWithItems[]>([]);

  const addPerson = (person: Person) => {
    setPeople((prevPeople) => [...prevPeople, person]);
  };

  const removePerson = (id: string) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
  };

  return (
    <PeopleContext.Provider
      value={{ people, peopleWithItems, addPerson, removePerson, setPeopleWithItems }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

// Hook to use PeopleContext in components
export const usePeople = () => {
  const context = useContext(PeopleContext);
  if (!context)
    throw new Error("usePeople must be used within a PeopleProvider");
  return context;
};
