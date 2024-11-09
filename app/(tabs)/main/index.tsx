import React from "react";
import { Stack } from "expo-router";
import { ReceiptProvider } from "@/context/ReceiptContext";
import { PeopleProvider } from "@/context/PeopleContext";

export default function MainStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SummaryScreen" options={{ title: "Order Summary" }} />
      <Stack.Screen name="PeopleScreen" options={{ title: "Add People" }} />
      <Stack.Screen
        name="SplitItemsScreen"
        options={{ title: "Split Items" }}
      />
    </Stack>
  );
}
