import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Avatar } from "@/components/app/Avatar";
import { ProgressBar, Surface } from "@/components/app/Surface";
import { TopBar } from "@/components/app/TopBar";
import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";

const members = [{ initial: "T", name: "Tunde A.", status: "Paid ✓" }, { initial: "N", name: "Nkechi E.", status: "Paid ✓" }, { initial: "D", name: "David O.", status: "Paid ✓" }, { initial: "F", name: "Femi A.", status: "Pending" }];

export default function GroupCollectionDetailScreen() {
  return <SafeAreaView className="flex-1 bg-white"><TopBar title="Weekend Getaway 🏖️" showBack onBackPress={() => router.back()} /><ScrollView className="px-[19px]" contentContainerStyle={{ paddingTop: 16, paddingBottom: 30 }}>
    <Surface className="rounded-[15px] border px-[16px] py-[16px]"><AppText font="SB" size={28} style={{ color: ThemeColors.deepGreen }}>₦112,500</AppText><AppText font="SR" size={13} style={{ color: ThemeColors.sage }}>of ₦150,000  ·  75% collected</AppText><View className="mt-[12px]"><ProgressBar value={75} /></View><AppText font="SR" size={12} className="mt-[13px]" style={{ color: ThemeColors.sage }}>3 of 4 members paid</AppText></Surface>
    <AppText font="SB" size={19} className="mb-[11px] mt-[17px]" style={{ color: ThemeColors.deepGreen }}>Members</AppText>
    {members.map((m, i) => <Surface key={m.name} className={`h-[68px] flex-row items-center rounded-[14px] border px-[13px] ${i ? "mt-[9px]" : ""}`}><Avatar initial={m.initial} size={42} /><View className="ml-[12px] flex-1"><AppText font="SB" size={14} style={{ color: ThemeColors.deepGreen }}>{m.name}</AppText><AppText font="SR" size={12} style={{ color: ThemeColors.sage }}>₦37,500</AppText></View><View className="h-[30px] w-[86px] items-center justify-center rounded-[10px] border" style={{ borderColor: m.status === "Pending" ? "#F59E0B" : ThemeColors.primary }}><AppText font="SR" size={11} style={{ color: m.status === "Pending" ? "#F59E0B" : ThemeColors.primary }}>{m.status}</AppText></View></Surface>)}
    <Pressable className="mt-[1px] h-[44px] items-center justify-center rounded-[11px] border" style={{ borderColor: "#F59E0B", backgroundColor: "#FFFBEB" }}><AppText font="SR" size={13} style={{ color: "#F59E0B" }}>Nudge Femi on WhatsApp — one tap reminder</AppText></Pressable>
  </ScrollView></SafeAreaView>;
}
