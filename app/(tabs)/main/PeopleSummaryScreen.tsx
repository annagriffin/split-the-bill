import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { User, Users } from "react-native-feather";

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
  const calculateTotal = (items) => {
    return items
      .reduce((sum, item) => sum + item.price / item.splitCount, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title} type="title">
          Personal Subtotals
        </ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {people.map((person) => (
          <View key={person.id} style={styles.personCard}>
            <View style={styles.personHeader}>
              <View style={styles.avatar}>
                <User width={24} height={24} color="white" />
              </View>
              <Text style={styles.personName}>{person.name}</Text>
            </View>

            <View style={styles.itemsContainer}>
              {person.items.map((item, index) => (
                <View key={index} style={styles.itemCard}>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>
                      ${(item.price / item.splitCount).toFixed(2)}
                    </Text>
                  </View>
                  {item.splitCount > 1 && (
                    <View style={styles.splitInfo}>
                      <Users width={16} height={16} color="#1e90ff" />
                      <Text style={styles.splitText}>
                        1 out of {item.splitCount}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>

            {/* Total Section */}
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>
                ${calculateTotal(person.items)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm Summary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  titleContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 16,
  },
  title: {
    color: "black",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  scrollContainer: {
    padding: 16,
  },
  personCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  personHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1e90ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  personName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemsContainer: {
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
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
  totalSection: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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
