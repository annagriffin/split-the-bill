import React from "react";
import { Stack } from "expo-router";
import { ReceiptProvider } from "@/context/ReceiptContext";

export default function MainStack() {
  return (
    <ReceiptProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="SummaryScreen"
          options={{ title: "Order Summary" }}
        />
        <Stack.Screen name="PeopleScreen" options={{ title: "Add People" }} />
      </Stack>
    </ReceiptProvider>
  );
}
