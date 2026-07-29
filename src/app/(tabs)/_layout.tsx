import React from "react";
import { Tabs } from "expo-router";

import { AppTabBar } from "@/components/app/BottomTabs";

export default function MainTabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="groups" />
      <Tabs.Screen name="activity" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="request" options={{ href: null }} />
    </Tabs>
  );
}

