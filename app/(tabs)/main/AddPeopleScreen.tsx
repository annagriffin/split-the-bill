import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Keyboard,
} from "react-native";
import { User, UserPlus, XCircle } from "react-native-feather";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { usePeople } from "@/context/PeopleContext";

export default function PeopleComponent() {
  const { people, addPerson, removePerson } = usePeople();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");

  // Method to open the modal and set focus on the TextInput
  const openModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      inputRef.current?.focus(); // Focus the TextInput after modal opens
    }, 100);
  };

  // Method to close the modal and reset the name state
  const closeModal = () => {
    setModalVisible(false);
    setName("");
  };

  const capitalizeEachWord = (text) => {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Handle saving the new person
  const handleSave = () => {
    if (name.trim() === "") {
      alert("Please enter a name");
      return;
    }
    const newPerson = {
      id: Math.random().toString(36).substr(2, 9),
      name: capitalizeEachWord(name),
      initials: name.charAt(0),
    };
    addPerson(newPerson);
    closeModal(); // Close the modal and reset the input
  };

  const handleConfirm = () => {
    router.push("/main/SplitItemsScreen");
  };

  const isDoneButtonEnabled = people.length >= 2;

  return (
    <ThemedView style={styles.container}>
      {/* Top Section with Title and Add Button */}
      <ThemedView style={styles.topSection}>
        <ThemedText style={styles.title} type="title">
          Who spent with you today?
        </ThemedText>

        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <UserPlus width={20} height={20} color="#6b7280" style={styles.icon} />
          <ThemedText style={styles.addButtonText}>Add person</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Scrollable List Section */}
      <View style={styles.listSection}>
        <ThemedText style={styles.subTitle}>Split bill between:</ThemedText>

        {people.length === 0 ? (
          <ThemedView style={styles.emptyState}>
            <ThemedView style={styles.emptyIconContainer}>
              <User width={24} height={24} color="#6b7280" />
            </ThemedView>
            <ThemedText style={styles.emptyText}>
              Add people to split the bill with
            </ThemedText>
          </ThemedView>
        ) : (
          <FlatList
            data={people}
            keyExtractor={(person) => person.id}
            renderItem={({ item }) => (
              <ThemedView style={styles.personContainer}>
                <ThemedView style={styles.avatar}>
                  <ThemedText style={styles.avatarText}>
                    {item.initials}
                  </ThemedText>
                </ThemedView>
                <ThemedText style={styles.personName}>{item.name}</ThemedText>

                <TouchableOpacity
                  onPress={() => removePerson(item.id)}
                  style={styles.deleteIconContainer}
                >
                  <XCircle width={20} height={20} color="#d1d5db" />
                </TouchableOpacity>
              </ThemedView>
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}
      </View>

      {/* Bottom Done Button */}
      <View style={styles.doneButtonContainer}>
        <TouchableOpacity
          style={[
            styles.doneButton,
            !isDoneButtonEnabled && styles.disabledDoneButton,
          ]}
          disabled={!isDoneButtonEnabled}
          onPress={handleConfirm}
        >
          <ThemedText style={styles.doneButtonText}>
            Done adding people
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Modal for adding a person's name */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ThemedText style={styles.modalTitle}>Enter Name</ThemedText>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
              ref={inputRef} // Attach the ref to TextInput
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                <ThemedText style={styles.cancelText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <ThemedText style={styles.saveText}>Save</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  topSection: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "black",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  addButtonText: {
    color: "#6b7280",
    fontSize: 16,
  },
  listSection: {
    flex: 1,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "black",
  },
  emptyState: {
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderStyle: "dashed",
    backgroundColor: "white",
  },
  emptyIconContainer: {
    backgroundColor: "#f3f4f6",
    borderRadius: 24,
    padding: 16,
    marginBottom: 8,
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 14,
  },
  personContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    marginBottom: 8,
  },
  avatar: {
    backgroundColor: "#d1d5db",
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  avatarText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
  personName: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
    flex: 1,
  },
  deleteIconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonContainer: {
    backgroundColor: "white",
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  doneButton: {
    padding: 12,
    backgroundColor: "#04AA6D",
    borderRadius: 8,
    alignItems: "center",
  },
  disabledDoneButton: {
    backgroundColor: "#a1a1a1",
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
    color: "black",
  },
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
