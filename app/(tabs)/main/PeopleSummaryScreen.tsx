import React, { useEffect, useState } from "react";
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
import { useRouter } from "expo-router";
import { PersonWithItems } from "@/types/types";


export default function PeopleSummaryScreen() {
  const { receiptData } = useReceipt();
  const { people } = usePeople();
  const router = useRouter();
  const [peopleWithItems, setPeopleWithItems] = useState<PersonWithItems[]>()

  const calculateTotal = (items) => {
    return items
      .reduce((sum, item) => sum + parseFloat(item.sharePrice), 0);
  };

  const overallItemsTotal = peopleWithItems?.reduce(
    (sum, person) => sum + person.items.reduce((itemSum, item) => itemSum + parseFloat(item.sharePrice), 0),
    0
  ) ?? 0;

  const totalTip = receiptData.tipAmount;
  const totalTax = receiptData.taxAmount;



  useEffect(() => {

    const itemsToPeopleMap = people.map((person) => {
      const personItems = receiptData.items
        .filter((item) => item.people?.includes(person.id))
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

      const personTotal = calculateTotal(personItems)
      const portion = overallItemsTotal > 0 ? (personTotal / overallItemsTotal) : 0;
      const taxShare = overallItemsTotal > 0 ? portion * totalTax : 0;
      const tipShare = overallItemsTotal > 0 ? portion * totalTip : 0;

      const personGrandTotal = personTotal + taxShare + tipShare;

      return { ...person, items: personItems, subtotal: personTotal.toFixed(2), tipShare: tipShare.toFixed(2), taxShare: taxShare.toFixed(2), percentage: portion * 100, grandTotal: personGrandTotal.toFixed(2) };
    });

    setPeopleWithItems(itemsToPeopleMap);

  }, []);



  const handleConfirm = () => {
    console.log("confrim")
  };



  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title} type="title">
          Receipt Split Summary
        </ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {peopleWithItems?.length ? (
          peopleWithItems?.map((person) => (
            <ThemedView key={person.id} style={styles.personCard}>
              <ThemedView style={styles.personHeader}>
                <ThemedView style={styles.avatar}>
                  <User width={24} height={24} color="white" />
                </ThemedView>
                <ThemedText style={styles.personName}>{person.name}</ThemedText>
              </ThemedView>

              <ThemedView style={styles.itemsContainer}>
                {person.items.length > 0 ? (
                  person.items.map((item, index) => (
                    <ThemedView key={index} style={styles.itemCard}>
                      <ThemedView style={styles.itemRow}>
                        <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                        <ThemedText style={styles.itemPrice}>
                          ${item.sharePrice}
                        </ThemedText>
                      </ThemedView>
                      {item.splitCount > 1 && (
                        <ThemedView style={styles.splitInfo}>
                          <Users width={16} height={16} color="#1e90ff" />
                          <ThemedText style={styles.splitText}>
                            1 of {item.splitCount}
                          </ThemedText>
                        </ThemedView>
                      )}
                    </ThemedView>
                  ))
                ) : (
                  <ThemedText style={styles.noItemsText}>No items assigned</ThemedText>
                )}
              </ThemedView>


              {/* Total Section */}
              <ThemedView style={styles.totalSection}>
                <ThemedView style={styles.table}>
                  <ThemedView style={styles.tableRow}>
                    <ThemedText style={styles.tableCell}>Subtotal</ThemedText>
                    <ThemedText style={[styles.tableCell, styles.tableRight]}>${person.subtotal}</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.tableRow}>
                    <ThemedText style={styles.tableCell}>Tax</ThemedText>
                    <ThemedText style={[styles.tableCell, styles.tableRight]}>${person.taxShare}</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.tableRow}>
                    <ThemedText style={styles.tableCell}>Tip</ThemedText>
                    <ThemedText style={[styles.tableCell, styles.tableRight]}>${person.tipShare}</ThemedText>
                  </ThemedView>
                  <ThemedView style={[styles.tableRow, styles.lastTableRow]}>
                    <ThemedText style={[styles.tableCell, styles.totalLabel]}>Grand Total</ThemedText>
                    <ThemedText style={[styles.tableCell, styles.tableRight, styles.totalAmount]}>${person.grandTotal}</ThemedText>
                  </ThemedView>
                </ThemedView>

              </ThemedView>
            </ThemedView>
          ))
        ) : (
          <ThemedText style={styles.noDataText}>No data available to display</ThemedText>
        )}
      </ScrollView>

      {/* Footer Button */}
      <ThemedView style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <ThemedText style={styles.confirmButtonText}>Confirm Summary</ThemedText>
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
    backgroundColor: "white",
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
    color: "black",
  },
  itemsContainer: {
    marginBottom: 16,
    backgroundColor: "white",
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
    backgroundColor: "transparent",
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
    backgroundColor: "transparent"
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
    justifyContent: "space-between",
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
  table: {
    marginTop: 8,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    backgroundColor: "white",
  },
  lastTableRow: {
    paddingVertical: 8,
  },
  tableHead: {
    fontWeight: "600",
  },
  tableCell: {
    fontSize: 16,
    color: "black",
  },
  tableRight: {
    textAlign: "right",
  },
});
