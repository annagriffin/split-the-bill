import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { ReceiptProvider } from "@/context/ReceiptContext";
import { PeopleProvider } from "@/context/PeopleContext";

export default function TabLayout() {
  const colorScheme = "light";

  return (
    <ReceiptProvider>
      <PeopleProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            tabBarStyle: { backgroundColor: "white" },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="main/index"
            options={{
              title: "Homde",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="manage/index"
            options={{
              title: "Manage",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "code-slash" : "code-slash-outline"}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </PeopleProvider>
    </ReceiptProvider>
  );
}
