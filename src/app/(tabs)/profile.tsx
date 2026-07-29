import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";

import { AppShell } from "@/components/app/AppShell";
import { Avatar } from "@/components/app/Avatar";
import { Surface } from "@/components/app/Surface";
import { TopBar } from "@/components/app/TopBar";
import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";

const rows = [{ label: "Personal Info", route: "/profile/completion" as const }, { label: "Bank Accounts", route: "/settings/bank-account" as const }, { label: "Notifications", route: "/profile/completion" as const }, { label: "Security", route: "/profile/completion" as const }, { label: "Refer & Earn 🎁", route: "/refer-and-earn" as const }];
export default function ProfileAndSettingsScreen() {
  return <AppShell withBottomTabs={false} contentClassName="px-0"><TopBar title="Profile" /><View className="px-[19px] pt-[16px]">
    <View className="items-center"><Avatar initial="C" size={91} dark /><AppText font="SB" size={22} className="mt-[13px]" style={{ color: ThemeColors.deepGreen }}>Chiamaka Okafor</AppText><Pressable onPress={() => router.push("/u/chiamaka")}><AppText font="SB" size={16} className="mt-[5px]" style={{ color: ThemeColors.primary }}>@chiamaka</AppText></Pressable><AppText font="SR" size={13} className="mt-[9px]" style={{ color: ThemeColors.primary }}>●  Verified</AppText></View>
    <AppText font="SB" size={12} className="mb-[8px] mt-[22px]" style={{ color: ThemeColors.sage }}>APPEARANCE</AppText><Surface className="h-[78px] flex-row items-center justify-around rounded-[15px] border">{[{ n: "Light", c: "#fff" }, { n: "Dark", c: "#071B13" }, { n: "System", c: "#8D8D8D" }].map(x => <View key={x.n} className="items-center"><View className="h-[44px] w-[44px] rounded-[12px] border-2" style={{ backgroundColor: x.c, borderColor: x.n === "Light" ? ThemeColors.primary : ThemeColors.mist }} /><AppText font="SR" size={10} className="mt-[4px]" style={{ color: x.n === "Light" ? ThemeColors.primary : ThemeColors.sage }}>{x.n}</AppText></View>)}</Surface>
    <AppText font="SB" size={12} className="mb-[8px] mt-[15px]" style={{ color: ThemeColors.sage }}>ACCOUNT</AppText><Surface className="rounded-[15px] border px-[14px]">{rows.map((row, i) => <Pressable key={row.label} className={`h-[58px] flex-row items-center ${i ? "border-t border-mist" : ""}`} onPress={() => router.push(row.route)}><View className="h-[40px] w-[40px] rounded-full" style={{ backgroundColor: ThemeColors.mint }} /><AppText font="SR" size={15} className="ml-[13px] flex-1" style={{ color: ThemeColors.deepGreen }}>{row.label}</AppText><AppText style={{ color: ThemeColors.sage }}>›</AppText></Pressable>)}</Surface>
    <Pressable className="mt-[13px] h-[54px] items-center justify-center rounded-[15px] border border-mist"><AppText font="SR" size={15} style={{ color: "#EF4444" }}>Sign Out</AppText></Pressable>
  </View></AppShell>;
}
