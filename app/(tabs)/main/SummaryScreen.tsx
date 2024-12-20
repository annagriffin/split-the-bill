import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Item } from "@/types/types";
import { useState, useRef } from "react";
import { useReceipt } from "@/context/ReceiptContext";
import { Edit, ChevronLeft } from "react-native-feather";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function SummaryScreen() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  const { receiptData, setReceiptData } = useReceipt();

  type EditableItem = Omit<Item, "price"> & {
    price: string; // Temporarily handle price as a string for input
  };

  const [itemToEdit, setItemToEdit] = useState<EditableItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (item: Item) => {
    setModalVisible(true);
    setItemToEdit({ ...item, price: item.price.toFixed(2) });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const closeModal = () => {
    setModalVisible(false);
    setItemToEdit(null);
  };

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
    router.push("/main/AddPeopleScreen");
  };

  const handleSaveEdit = () => {
    if (itemToEdit) {
      const parsedPrice = parseFloat(itemToEdit.price);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        alert("Please enter a valid positive number");
        return;
      }

      const roundedPrice = parseFloat(parsedPrice.toFixed(2));

      const updatedItems: Item[] = receiptData.items.map((item) =>
        item.id === itemToEdit.id
          ? {
            ...item,
            name: itemToEdit.name,
            price: roundedPrice,
          }
          : item
      );

      setReceiptData({
        ...receiptData,
        items: updatedItems,
      });

      setItemToEdit(null);
      setModalVisible(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Static Header */}
      <ThemedView style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()} // Use router.back() to go back to the previous screen
        >
          <ChevronLeft width={24} height={24} color="black" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>
          Order Summary
        </ThemedText>
      </ThemedView>

      {/* Scrollable Items Section */}
      <View style={styles.receiptContainer}>
        <FlatList
          data={receiptData.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView style={[styles.itemContainer, styles.topAligned]}>
              <ThemedText style={[styles.item, styles.name]} numberOfLines={2}>
                {item.name}
              </ThemedText>
              <ThemedView style={styles.flex}>
                <ThemedText style={styles.item}>
                  ${item.price.toFixed(2)}
                </ThemedText>
                <TouchableOpacity onPress={() => openModal(item)}>
                  <Edit width={20} height={20} color="black" />
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          )}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 1 }}
        />
        <ThemedView style={styles.divider} />

        <ThemedView style={styles.summary}>
          <ThemedView style={styles.itemContainer}>
            <ThemedText style={styles.summaryText}>Subtotal</ThemedText>
            <ThemedText style={styles.summaryText}>
              ${subtotal.toFixed(2)}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.itemContainer}>
            <ThemedText style={styles.summaryText}>Tax</ThemedText>
            <ThemedText style={styles.summaryText}>
              ${receiptData.taxAmount.toFixed(2)}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.itemContainer}>
            <ThemedText style={styles.summaryText}>Total after tax</ThemedText>
            <ThemedText style={styles.summaryText}>
              ${(subtotal + receiptData.taxAmount).toFixed(2)}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.itemContainer}>
            <ThemedText style={styles.summaryText}>Tip</ThemedText>
            <ThemedText style={styles.summaryText}>
              ${receiptData.tipAmount.toFixed(2)}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.itemContainer}>
            <ThemedText style={[styles.summaryText, styles.total]}>Total</ThemedText>
            <ThemedText style={[styles.summaryText, styles.total]}>
              $
              {(subtotal + receiptData.taxAmount + receiptData.tipAmount).toFixed(
                2
              )}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </View>




      {/* Fixed Footer Section */}
      <ThemedView style={styles.fixedFooter}>
        <TouchableOpacity
          style={[styles.button, styles.confirmButton]}
          onPress={handleConfirm}
        >
          <ThemedText style={styles.buttonText}>Confirm</ThemedText>
        </TouchableOpacity>

      </ThemedView>

      {modalVisible && !!itemToEdit && (
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
                    ref={inputRef}
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Price</Text>
                  <TextInput
                    style={styles.input}
                    value={itemToEdit.price}
                    onChangeText={(text) =>
                      setItemToEdit({
                        ...itemToEdit,
                        price: text.replace(/[^0-9.]/g, ""),
                      })
                    }
                    keyboardType="decimal-pad"
                  />
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    onPress={closeModal}
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
    backgroundColor: "#f8f9fa",
    paddingTop: 36,
    paddingHorizontal: 16,
  },
  titleContainer: {
    backgroundColor: "transparent",
    marginBottom: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontWeight: "600",
    fontSize: 20,
  },
  listContainer: {
    flex: 1
  },
  backButton: {
    marginRight: 8, // Spacing between the button and the title
  },
  receiptContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 84,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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
    paddingVertical: 10,
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
    backgroundColor: "transparent",
    paddingBottom: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
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
    marginBottom: 6,
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
  },
  largeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },
  name: {
    maxWidth: 240,
    flexWrap: "wrap",
    fontSize: 16,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    backgroundColor: "transparent",
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
  confirmButton: {
    backgroundColor: "#04AA6D",
    width: "100%",
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
