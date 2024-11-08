import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

export default function ExampleScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/main/SummaryScreen");
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.buttonText}>Welcome</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#007AFF", // Button color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8, // Rounded corners
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF", // Text color
    fontSize: 16,
    fontWeight: "bold",
  },
});
