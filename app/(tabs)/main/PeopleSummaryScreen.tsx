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
import { useReceipt } from "@/context/ReceiptContext";
import { usePeople } from "@/context/PeopleContext";

export default function PeopleSummaryScreen() {
  const { receiptData } = useReceipt();
  const { people } = usePeople();

  console.log("Receipt Data Items:", receiptData.items);


  // Transform data: for each person, find the items they're associated with
  const peopleWithItems = people.map((person) => {
    const personItems = receiptData.items
      .filter((item) => {

        // Check if item.people contains the current person's id
        return item.people?.includes(person.id);
      })
      .map((item) => {
        const splitCount = item.people?.length || 1;
        const sharePrice = item.price / splitCount;
        return {
          name: item.name,
          price: item.price,
          splitCount,
          sharePrice: sharePrice.toFixed(2),
        };
      });

    // Return person data with items
    return { id: person.id, name: person.name, items: personItems };
  });




  // Calculate the total for each person's items
  const calculateTotal = (items) => {
    return items
      .reduce((sum, item) => sum + parseFloat(item.sharePrice), 0)
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
        {peopleWithItems.length > 0 ? (
          peopleWithItems.map((person) => (
            <View key={person.id} style={styles.personCard}>
              <View style={styles.personHeader}>
                <View style={styles.avatar}>
                  <User width={24} height={24} color="white" />
                </View>
                <Text style={styles.personName}>{person.name}</Text>
              </View>

              <View style={styles.itemsContainer}>
                {person.items.length > 0 ? (
                  person.items.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                      <View style={styles.itemRow}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>
                          ${item.sharePrice}
                        </Text>
                      </View>
                      {item.splitCount > 1 && (
                        <View style={styles.splitInfo}>
                          <Users width={16} height={16} color="#1e90ff" />
                          <Text style={styles.splitText}>
                            1 of {item.splitCount}
                          </Text>
                        </View>
                      )}
                    </View>
                  ))
                ) : (
                  <Text style={styles.noItemsText}>No items assigned</Text>
                )}
              </View>

              {/* Total Section */}
              <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>
                  ${calculateTotal(person.items)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No data available to display</Text>
        )}
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
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginVertical: 20,
  },
  noItemsText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginVertical: 10,
  },
});
