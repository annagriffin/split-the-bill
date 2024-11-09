import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { User, UserPlus, XCircle } from "react-native-feather";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

interface Person {
  id: string;
  name: string;
  initials: string;
}

export default function PeopleComponent() {
  const [people, setPeople] = useState<Person[]>([]);
  const router = useRouter();

  const addPerson = () => {
    const names = ["Sophie", "Megan", "Beth", "Alex", "Jamie", "Sam"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const newPerson = {
      id: Math.random().toString(36).substr(2, 9),
      name: randomName,
      initials: randomName.charAt(0),
    };
    setPeople([...people, newPerson]);
  };

  const removePerson = (id: string) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
  };

  const handleConfirm = () => {
    router.push("/main/SplitItemsScreen");
  };

  const isDoneButtonEnabled = people.length >= 2;

  return (
    <ThemedView style={styles.container}>
      {/* Top Section with Title and Add Button */}
      <View style={styles.topSection}>
        <ThemedText style={styles.title} type="title">
          Who spent with you today?
        </ThemedText>

        <TouchableOpacity style={styles.addButton} onPress={addPerson}>
          <UserPlus
            width={20}
            height={20}
            color="#6b7280"
            style={styles.icon}
          />
          <ThemedText style={styles.addButtonText}>Add person</ThemedText>
        </TouchableOpacity>
      </View>

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
            contentContainerStyle={{ paddingBottom: 80 }} // Padding at the bottom to avoid overlap with button
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
});
