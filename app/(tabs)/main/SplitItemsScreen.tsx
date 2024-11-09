import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "react-native-feather";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useReceipt } from "@/context/ReceiptContext";

const people = [
  { id: 1, name: "Alice", initial: "A" },
  { id: 2, name: "Bob", initial: "B" },
  { id: 3, name: "Charlie", initial: "C" },
  { id: 4, name: "David", initial: "D" },
];

export default function SplitItemsScreen() {
  const { receiptData } = useReceipt();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [assignments, setAssignments] = useState({});

  const currentItem = receiptData.items[currentItemIndex];

  const toggleAssignment = (personId) => {
    setAssignments((prev) => {
      const current = prev[currentItem.id] || [];
      if (current.includes(personId)) {
        return {
          ...prev,
          [currentItem.id]: current.filter((id) => id !== personId),
        };
      } else {
        return { ...prev, [currentItem.id]: [...current, personId] };
      }
    });
  };

  const nextItem = () => {
    setCurrentItemIndex((prev) => (prev + 1) % receiptData.items.length);
  };

  const prevItem = () => {
    setCurrentItemIndex(
      (prev) => (prev - 1 + receiptData.items.length) % receiptData.items.length
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.itemContainer}>
        <TouchableOpacity onPress={prevItem} style={styles.navButton}>
          <ChevronLeft width={24} height={24} color="#666" />
        </TouchableOpacity>
        <ThemedView style={styles.itemDetails}>
          <ThemedText style={styles.itemName}>{currentItem.name}</ThemedText>
          <ThemedText style={styles.itemPrice}>
            ${currentItem.price.toFixed(2)}
          </ThemedText>
        </ThemedView>
        <TouchableOpacity onPress={nextItem} style={styles.navButton}>
          <ChevronRight width={24} height={24} color="#666" />
        </TouchableOpacity>
      </ThemedView>

      <ScrollView style={styles.peopleContainer}>
        {people.map((person) => (
          <TouchableOpacity
            key={person.id}
            onPress={() => toggleAssignment(person.id)}
            style={[
              styles.personButton,
              assignments[currentItem.id]?.includes(person.id) &&
                styles.personButtonSelected,
            ]}
          >
            <ThemedText
              style={[
                styles.personName,
                assignments[currentItem.id]?.includes(person.id) &&
                  styles.personNameSelected,
              ]}
            >
              {person.name}
            </ThemedText>
            <ThemedView
              style={[
                styles.personInitial,
                assignments[currentItem.id]?.includes(person.id) &&
                  styles.personInitialSelected,
              ]}
            >
              <ThemedText style={styles.personInitialText}>
                {person.initial}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          Item {currentItemIndex + 1} of {receiptData.items.length}
        </ThemedText>
        <TouchableOpacity style={styles.confirmButton}>
          <ThemedText style={styles.confirmButtonText}>
            Confirm Split
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    backgroundColor: "white",
  },
  itemDetails: { alignItems: "center", flex: 1, backgroundColor: "white" },
  itemName: { fontSize: 24, fontWeight: "700", color: "black" },
  itemPrice: { fontSize: 20, color: "#666" },
  navButton: { padding: 8, backgroundColor: "#e0e0e0", borderRadius: 20 },
  peopleContainer: { padding: 16 },
  personButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 8,
  },
  personButtonSelected: { backgroundColor: "#1e90ff" },
  personName: { fontSize: 16, color: "black" },
  personNameSelected: { color: "#fff" },
  personInitial: {
    width: 32,
    height: 32,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  personInitialSelected: { backgroundColor: "#fff" },
  personInitialText: { fontWeight: "600", color: "#1e90ff" },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  footerText: { textAlign: "center", marginBottom: 8, color: "#333" },
  confirmButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
