import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemeColors } from "@/constant/theme";
import { BottomTabs } from "@/components/app/BottomTabs";

interface AppShellProps {
  children: React.ReactNode;
  activeTab?: "dashboard" | "groups" | "activity" | "profile";
  withBottomTabs?: boolean;
  scroll?: boolean;
  contentClassName?: string;
  backgroundColor?: string;
}

export function AppShell({
  children,
  activeTab = "dashboard",
  withBottomTabs = true,
  scroll = true,
  contentClassName = "",
  backgroundColor = ThemeColors.white,
}: AppShellProps) {
  const content = (
    <View className={`flex-1 px-[19px] ${contentClassName}`}>{children}</View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: withBottomTabs ? 18 : 28 }}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
      {withBottomTabs ? <BottomTabs active={activeTab} /> : null}
    </SafeAreaView>
  );
}
