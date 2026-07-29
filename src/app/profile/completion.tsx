import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Avatar } from "@/components/app/Avatar";
import { ProgressBar, Surface } from "@/components/app/Surface";
import { TopBar } from "@/components/app/TopBar";
import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";

const steps = [{ label: "Create your account", done: true, route: "/dashboard" as const }, { label: "Verify your phone number", done: false, route: "/auth/onboarding/phone" as const }, { label: "Choose your @handle", done: false, route: "/auth/onboarding/handle" as const }, { label: "Link your bank account", done: false, route: "/settings/bank-account" as const }, { label: "Send your first request", done: false, route: "/request/new" as const }];
export default function ProfileCompletionChecklistScreen() {
  return <SafeAreaView className="flex-1 bg-white"><TopBar title="Profile Completion" showBack onBackPress={() => router.replace("/profile")} /><View className="flex-1 px-[19px] pt-[16px]">
    <View className="flex-row items-center justify-between"><View className="flex-row items-center"><Avatar initial="C" size={45} /><View className="ml-[10px]"><AppText font="SR" size={12} style={{ color: ThemeColors.sage }}>Good day,</AppText><AppText font="SB" size={18} style={{ color: ThemeColors.deepGreen }}>Chiamaka</AppText></View></View><Pressable onPress={() => router.push("/request/new")} className="rounded-full px-[18px] py-[11px]" style={{ backgroundColor: ThemeColors.primary }}><AppText font="SB" size={14} style={{ color: "white" }}>+ Request</AppText></Pressable></View>
    <View className="mt-[16px] rounded-[18px] px-[16px] py-[16px]" style={{ backgroundColor: ThemeColors.deepGreen }}><AppText font="SR" size={13} style={{ color: "#74E6A1" }}>Total received</AppText><AppText font="SB" size={35} className="mt-[5px]" style={{ color: "white" }}>₦0</AppText><AppText font="SR" size={13} style={{ color: ThemeColors.primary }}>New account — welcome to SendAm!</AppText></View>
    <Pressable onPress={() => router.push("/settings/bank-account")} className="mt-[14px] h-[72px] flex-row items-center rounded-[18px] border-2 border-dashed px-[14px]" style={{ borderColor: ThemeColors.mist }}><View className="h-[42px] w-[42px] items-center justify-center rounded-full" style={{ backgroundColor: ThemeColors.mint }}><AppText style={{ color: ThemeColors.primary }}>▣</AppText></View><View className="ml-[12px] flex-1"><AppText font="SB" size={15} style={{ color: ThemeColors.deepGreen }}>Link your bank account</AppText><AppText font="SR" size={12} style={{ color: ThemeColors.sage }}>Required to receive payouts.</AppText></View><AppText style={{ color: ThemeColors.sage }}>›</AppText></Pressable>
    <Surface className="mt-[14px] rounded-[15px] border px-[14px] py-[15px]"><View className="flex-row justify-between"><AppText font="SB" size={17} style={{ color: ThemeColors.deepGreen }}>Complete your profile</AppText><AppText font="SR" size={12} style={{ color: ThemeColors.sage }}>1 of 5</AppText></View><View className="mt-[10px]"><ProgressBar value={20} /></View>{steps.map(step => <Pressable key={step.label} onPress={() => router.push(step.route)} className="mt-[15px] flex-row items-center"><View className="h-[22px] w-[22px] items-center justify-center rounded-full border" style={{ borderColor: step.done ? ThemeColors.primary : ThemeColors.mist, backgroundColor: step.done ? ThemeColors.primary : ThemeColors.snow }}><AppText size={11} style={{ color: "white" }}>{step.done ? "✓" : ""}</AppText></View><AppText font="SR" size={14} className="ml-[10px] flex-1" style={{ color: step.done ? ThemeColors.sage : ThemeColors.deepGreen }}>{step.label}</AppText>{!step.done ? <AppText style={{ color: ThemeColors.sage }}>›</AppText> : null}</Pressable>)}</Surface>
  </View></SafeAreaView>;
}
