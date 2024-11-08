// app/(tabs)/index.tsx
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { useRouter, router } from "expo-router";
import { Item, ReceiptData } from "@/types/receiptTypes";
import { useColorScheme } from "react-native";
import { Edit } from "react-native-feather"; // Import the Edit icon
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { useReceipt } from "@/context/ReceiptContext";

export default function Next() {
  const router = useRouter();

  const { receiptData, setReceiptData } = useReceipt();

  const colorScheme = "light"; // Override to always use light mode

  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);

  if (!receiptData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  const subtotal = receiptData.items.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );

  const handleConfirm = () => {
    router.push("/main/add");
  };

  const handleSaveEdit = () => {
    if (itemToEdit) {
      const updatedItems: Item[] = receiptData.items.map((item) =>
        item.id === itemToEdit.id
          ? { ...item, name: itemToEdit.name, price: itemToEdit.price }
          : item
      );

      setReceiptData({
        ...receiptData,
        items: updatedItems,
      });

      setItemToEdit(null);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Static Header */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title} type="title">
          Order Summary
        </ThemedText>
      </ThemedView>

      {/* Scrollable Items Section */}
      <View style={styles.listContainer}>
        <FlatList
          data={receiptData.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <ThemedView style={[styles.itemContainer, styles.topAligned]}>
                <ThemedText
                  style={[styles.item, styles.name]}
                  numberOfLines={2}
                >
                  {item.name}
                </ThemedText>
                <ThemedView style={styles.flex}>
                  <ThemedText style={styles.item}>${item.price}</ThemedText>
                  <TouchableOpacity onPress={() => setItemToEdit(item)}>
                    <Edit width={20} height={20} color="black" />
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            );
          }}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>

      {/* Fixed Footer Section */}
      <ThemedView style={styles.fixedFooter}>
        <ThemedView style={styles.divider} />

        <ThemedView style={styles.summary}>
          <ThemedView style={styles.itemContainer}>
            <ThemedText style={styles.summaryText}>Subtotal</ThemedText>
            <ThemedText style={[styles.summaryText, styles.boldText]}>
              ${subtotal.toFixed(2)}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.itemContainer}>
            <ThemedText style={styles.summaryText}>Tax</ThemedText>
            <ThemedText style={[styles.summaryText, styles.boldText]}>
              ${receiptData.taxAmount.toFixed(2)}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.itemContainer}>
            <ThemedText style={styles.summaryText}>Total after tax</ThemedText>
            <ThemedText style={[styles.summaryText, styles.boldText]}>
              ${(subtotal + receiptData.taxAmount).toFixed(2)}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.itemContainer}>
            <ThemedText style={styles.summaryText}>Tip</ThemedText>
            <ThemedText style={[styles.summaryText, styles.boldText]}>
              ${receiptData.tipAmount.toFixed(2)}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.grandTotalContainer}>
          <ThemedText style={styles.largeText}>
            Grand Total (tax+tip)
          </ThemedText>
          <ThemedText style={styles.largeText}>
            $
            {(subtotal + receiptData.taxAmount + receiptData.tipAmount).toFixed(
              2
            )}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={handleConfirm}
          >
            <ThemedText style={styles.buttonText}>Confirm</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {!!itemToEdit && (
        <Modal visible={!!itemToEdit} animationType="slide" transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Edit Item</Text>

              <View style={styles.modalContent}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput
                    style={styles.input}
                    value={itemToEdit.name}
                    onChangeText={(text) =>
                      setItemToEdit({ ...itemToEdit, name: text })
                    }
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Price</Text>
                  <TextInput
                    style={styles.input}
                    value={itemToEdit.price.toString()}
                    onChangeText={(text) =>
                      setItemToEdit({
                        ...itemToEdit,
                        price: parseFloat(text) || 0,
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    onPress={() => setItemToEdit(null)}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSaveEdit}
                    style={styles.saveButton}
                  >
                    <Text style={styles.saveText}>Save changes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
  listContainer: {
    flex: 1,
  },
  topAligned: {
    alignItems: "flex-start",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingRight: 8,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  item: {
    fontSize: 16,
    color: "black",
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  inputLabel: {
    width: 80,
    fontSize: 16,
    color: "gray",
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
  fixedFooter: {
    backgroundColor: "white",
    paddingBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 10,
  },
  summary: {
    marginTop: 16,
  },
  summaryText: {
    fontSize: 16,
    color: "black",
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "700",
  },
  grandTotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 14,
    backgroundColor: "gainsboro",
    borderRadius: 8,
    marginTop: 28,
  },
  largeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },
  name: {
    maxWidth: 240, // Set your desired max width here
    flexWrap: "wrap",
    fontSize: 16,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    backgroundColor: "white",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "darkgrey",
    marginRight: 16,
  },
  outlineButtonText: {
    color: "black",
  },
  confirmButton: {
    backgroundColor: "#04AA6D",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalContent: {
    width: "100%",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    width: "40%",
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#04AA6D",
    width: "40%",
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "600",
  },
});
