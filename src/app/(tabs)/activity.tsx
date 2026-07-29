import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";

import { AppShell } from "@/components/app/AppShell";
import { Avatar } from "@/components/app/Avatar";
import { Surface } from "@/components/app/Surface";
import { TopBar } from "@/components/app/TopBar";
import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";

const sections = [
  {
    title: "TODAY",
    rows: [
      {
        initial: "T",
        name: "Tunde paid you",
        note: "Dinner at Yellow Chilli",
        amount: "+₦12,500",
        time: "5:24 PM",
      },
      {
        initial: "N",
        name: "Nkechi paid you",
        note: "House rent",
        amount: "+₦75,000",
        time: "2:11 PM",
      },
    ],
  },
  {
    title: "YESTERDAY",
    rows: [
      {
        initial: "D",
        name: "David paid you",
        note: "Weekend trip",
        amount: "+₦37,500",
        time: "11:45 AM",
      },
      {
        initial: "F",
        name: "Femi paid you",
        note: "Event tickets",
        amount: "+₦8,500",
        time: "9:02 AM",
      },
    ],
  },
];

export default function ActivityFeedScreen() {
  return (
    <AppShell withBottomTabs={false} contentClassName="px-0">
      <TopBar title="Activity" />
      <View className="pt-[17px]">
        {sections.map((section, s) => (
          <View key={section.title} className={s ? "mt-[17px]" : ""}>
            <AppText font="SB" size={12} style={{ color: ThemeColors.sage }}>
              {section.title}
            </AppText>
            <Surface className="mt-[11px] rounded-[15px] border px-4">
              {section.rows.map((row, i) => (
                <Pressable
                  key={row.name}
                  className={`h-[74px] flex-row items-center ${i ? "border-t border-mist" : ""}`}
                  onPress={() =>
                    router.push("/request/dinner-at-yellow-chilli")
                  }
                >
                  <Avatar initial={row.initial} size={43} />
                  <View className="ml-[12px] flex-1">
                    <AppText
                      font="SB"
                      size={14}
                      style={{ color: ThemeColors.deepGreen }}
                    >
                      {row.name}
                    </AppText>
                    <AppText
                      font="SR"
                      size={12}
                      style={{ color: ThemeColors.sage }}
                    >
                      {row.note}
                    </AppText>
                  </View>
                  <View className="items-end">
                    <AppText
                      font="SB"
                      size={15}
                      style={{ color: ThemeColors.primary }}
                    >
                      {row.amount}
                    </AppText>
                    <AppText
                      font="SR"
                      size={10}
                      style={{ color: ThemeColors.sage }}
                    >
                      {row.time}
                    </AppText>
                  </View>
                </Pressable>
              ))}
            </Surface>
          </View>
        ))}
      </View>
    </AppShell>
  );
}
