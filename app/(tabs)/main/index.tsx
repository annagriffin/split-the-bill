import React from "react";
import { Stack } from "expo-router";

export default function MainStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SummaryScreen" options={{ title: "Order Summary" }} />
      <Stack.Screen name="PeopleScreen" options={{ title: "Add People" }} />
      <Stack.Screen
        name="SplitItemsScreen"
        options={{ title: "Split Items" }}
      />
      <Stack.Screen
        name="PeopleSummaryScreen"
        options={{ title: "People Summary" }}
      />
      <Stack.Screen
        name="TaxSummaryScreen"
        options={{ title: "Tax Summary" }}
      />
    </Stack>
  );
}
