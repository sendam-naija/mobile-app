import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";

import { AppShell } from "@/components/app/AppShell";
import { ProgressBar, Surface } from "@/components/app/Surface";
import { TopBar } from "@/components/app/TopBar";
import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";

const groups = [
  {
    title: "Weekend Getaway 🏖️",
    meta: "4 members · ₦150,000",
    progress: 75,
    route: "/groups/weekend-getaway" as const,
  },
  {
    title: "Iya Basira's Birthday 🎂",
    meta: "6 members · ₦60,000",
    progress: 33,
    route: "/groups/weekend-getaway" as const,
  },
];

export default function GroupSplitsScreen() {
  return (
    <AppShell withBottomTabs={false} contentClassName="px-0">
      <TopBar title="Group splits" />
      <View className="pt-[16px]">
        {groups.map((group, index) => (
          <Pressable key={group.title} onPress={() => router.push(group.route)}>
            <Surface
              className={`rounded-[15px] border px-[16px] py-[14px] ${index ? "mt-[13px]" : ""}`}
            >
              <AppText
                font="SB"
                size={17}
                style={{ color: ThemeColors.deepGreen }}
              >
                {group.title}
              </AppText>
              <AppText font="SR" size={13} style={{ color: ThemeColors.sage }}>
                {group.meta}
              </AppText>
              <View className="mt-[11px] flex-row items-center">
                <View className="flex-1">
                  <ProgressBar value={group.progress} />
                </View>
                <AppText
                  font="SB"
                  size={13}
                  className="ml-[10px]"
                  style={{ color: ThemeColors.primary }}
                >
                  {group.progress}%
                </AppText>
              </View>
            </Surface>
          </Pressable>
        ))}
        <Pressable onPress={() => router.push("/request/new")}>
          <Surface
            className="mt-[14px] rounded-[15px] border px-[16px] py-[22px]"
            style={{ backgroundColor: ThemeColors.snow }}
          >
            <AppText font="SB" size={16} style={{ color: ThemeColors.primary }}>
              + Create a new group split
            </AppText>
            <AppText
              font="SR"
              size={13}
              className="mt-[6px]"
              style={{ color: ThemeColors.sage }}
            >
              Split any bill across your group
            </AppText>
          </Surface>
        </Pressable>
      </View>
    </AppShell>
  );
}
