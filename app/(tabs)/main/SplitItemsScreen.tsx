import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Item {
  id: number;
  name: string;
  price: number;
}

interface Person {
  id: number;
  name: string;
}

interface Assignment {
  itemId: number;
  personId: number;
}

export default function ItemAssignment() {
  const [items] = useState<Item[]>([
    { id: 1, name: "Pizza", price: 15 },
    { id: 2, name: "Salad", price: 10 },
    { id: 3, name: "Drinks", price: 8 },
    { id: 4, name: "Dessert", price: 7 },
  ]);

  const [people] = useState<Person[]>([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const toggleAssignment = (itemId: number, personId: number) => {
    setAssignments((prev) => {
      const existingAssignment = prev.find(
        (a) => a.itemId === itemId && a.personId === personId
      );
      if (existingAssignment) {
        return prev.filter((a) => a !== existingAssignment);
      } else {
        return [...prev, { itemId, personId }];
      }
    });
  };

  const calculateTotalForPerson = (personId: number) => {
    return assignments
      .filter((a) => a.personId === personId)
      .reduce((total, a) => {
        const item = items.find((i) => i.id === a.itemId);
        return (
          total +
          (item ? item.price / assignments.filter((assign) => assign.itemId === a.itemId).length : 0)
        );
      }, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Item Assignment</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <View style={styles.cardPriceContainer}>
                <Feather name="dollar-sign" size={16} color="#666" />
                <Text style={styles.cardPrice}>{item.price.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.cardContent}>
              {people.map((person) => (
                <TouchableOpacity
                  key={person.id}
                  style={[
                    styles.personButton,
                    assignments.some((a) => a.itemId === item.id && a.personId === person.id) &&
                    styles.personButtonSelected,
                  ]}
                  onPress={() => toggleAssignment(item.id, person.id)}
                >
                  <Text
                    style={[
                      styles.personButtonText,
                      assignments.some((a) => a.itemId === item.id && a.personId === person.id) &&
                      styles.personButtonTextSelected,
                    ]}
                  >
                    {person.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Summary</Text>
          {people.map((person) => (
            <View key={person.id} style={styles.summaryRow}>
              <View style={styles.summaryPerson}>
                <Feather name="users" size={16} color="#666" />
                <Text style={styles.personName}>{person.name}</Text>
              </View>
              <View style={styles.summaryTotal}>
                <Feather name="dollar-sign" size={16} color="#666" />
                <Text style={styles.totalAmount}>
                  {calculateTotalForPerson(person.id).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardPrice: {
    fontSize: 16,
    marginLeft: 4,
    color: "#666",
  },
  cardContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  personButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  personButtonSelected: {
    backgroundColor: "#007bff",
  },
  personButtonText: {
    fontSize: 14,
    color: "#333",
  },
  personButtonTextSelected: {
    color: "#fff",
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryPerson: {
    flexDirection: "row",
    alignItems: "center",
  },
  personName: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  summaryTotal: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalAmount: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
