import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight, User, Users } from "react-native-feather";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

const people = [
  {
    id: 1,
    name: "Alice",
    items: [
      { name: "Pizza", price: 15.0, splitCount: 2 },
      { name: "Salad", price: 4.0, splitCount: 2 },
    ],
  },
  {
    id: 2,
    name: "Bob",
    items: [
      { name: "Pizza", price: 15.0, splitCount: 2 },
      { name: "Drinks", price: 6.0, splitCount: 2 },
    ],
  },
  {
    id: 3,
    name: "Charlie",
    items: [
      { name: "Salad", price: 4.0, splitCount: 2 },
      { name: "Drinks", price: 6.0, splitCount: 2 },
      { name: "Dessert", price: 7.0, splitCount: 2 },
    ],
  },
  {
    id: 4,
    name: "David",
    items: [{ name: "Dessert", price: 7.0, splitCount: 2 }],
  },
];

export default function PeopleSummaryScreen() {
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const currentPerson = people[currentPersonIndex];

  const router = useRouter();

  const nextPerson = () => {
    setCurrentPersonIndex((prev) => (prev + 1) % people.length);
  };

  const prevPerson = () => {
    setCurrentPersonIndex((prev) => (prev - 1 + people.length) % people.length);
  };

  const calculateTotal = (items) => {
    return items
      .reduce((sum, item) => sum + item.price / item.splitCount, 0)
      .toFixed(2);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Bill Summary</ThemedText>
      </ThemedView>

      <ThemedView style={styles.navContainer}>
        <TouchableOpacity onPress={prevPerson} style={styles.navButton}>
          <ChevronLeft width={24} height={24} color="#666" />
        </TouchableOpacity>
        <ThemedView style={styles.personContainer}>
          <ThemedView style={styles.avatar}>
            <User width={36} height={36} color="white" />
          </ThemedView>
          <ThemedText style={styles.personName}>
            {currentPerson.name}
          </ThemedText>
        </ThemedView>
        <TouchableOpacity onPress={nextPerson} style={styles.navButton}>
          <ChevronRight width={24} height={24} color="#666" />
        </TouchableOpacity>
      </ThemedView>

      <ScrollView style={styles.itemsContainer}>
        {currentPerson.items.map((item, index) => (
          <ThemedView key={index} style={styles.itemCard}>
            <View style={styles.itemRow}>
              <ThemedText style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText style={styles.itemPrice}>
                ${(item.price / item.splitCount).toFixed(2)}
              </ThemedText>
            </View>
            {item.splitCount > 1 && (
              <View style={styles.splitInfo}>
                <Users width={16} height={16} color="#1e90ff" />
                <ThemedText style={styles.splitText}>
                  1 out of {item.splitCount}
                </ThemedText>
              </View>
            )}
          </ThemedView>
        ))}
      </ScrollView>

      {/* Total Section */}
      <ThemedView style={styles.totalContainer}>
        <ThemedText style={styles.totalLabel}>Total</ThemedText>
        <ThemedText style={styles.totalAmount}>
          ${calculateTotal(currentPerson.items)}
        </ThemedText>
      </ThemedView>

      {/* Footer */}
      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          Person {currentPersonIndex + 1} of {people.length}
        </ThemedText>
        <TouchableOpacity style={styles.confirmButton}>
          <ThemedText style={styles.confirmButtonText}>
            Confirm Summary
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "white",
  },
  navButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  personContainer: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "white",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1e90ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  personName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  navContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  itemsContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  itemCard: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  itemPrice: {
    fontSize: 16,
    color: "#666",
  },
  splitInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  splitText: {
    fontSize: 14,
    color: "#1e90ff",
    marginLeft: 4,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    color: "#1e90ff",
    fontWeight: "bold",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "white",
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 8,
    color: "#666",
  },
  confirmButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
