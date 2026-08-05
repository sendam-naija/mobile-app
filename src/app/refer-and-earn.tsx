import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TopBar } from "@/components/app/TopBar";
import { Surface } from "@/components/app/Surface";
import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";

export default function ReferralRewardsScreen() {
  const [copied, setCopied] = useState(false); const link = "https://sendam.co/r/CHIAMAKA";
  const copy = async () => { await Clipboard.setStringAsync(link); setCopied(true); };
  return <SafeAreaView className="flex-1 bg-white"><TopBar title="Refer & Earn" showBack onBackPress={() => router.back()} /><ScrollView className="px-[19px]" contentContainerStyle={{ paddingTop: 16, paddingBottom: 28 }}>
    <View className="rounded-[22px] px-[19px] py-[17px]" style={{ backgroundColor: ThemeColors.deepGreen }}><AppText font="SB" size={11} style={{ color: "white" }}>FOR EVERY FRIEND WHO JOINS</AppText><View className="mt-[17px] flex-row items-center justify-around"><View className="items-center"><AppText font="SB" size={43} style={{ color: "white" }}>₦500</AppText><AppText font="SR" size={14} style={{ color: "white" }}>for you</AppText></View><View className="h-[68px] w-[2px] bg-white" /><View className="items-center"><AppText font="SB" size={43} style={{ color: "white" }}>₦500</AppText><AppText font="SR" size={14} style={{ color: "white" }}>for them</AppText></View></View></View>
    <View className="mt-[13px] flex-row gap-[12px]"><Surface className="flex-1 items-center rounded-[15px] border py-[13px]" style={{ backgroundColor: ThemeColors.snow }}><AppText font="SB" size={29} style={{ color: ThemeColors.deepGreen }}>0</AppText><AppText font="SR" size={11} style={{ color: ThemeColors.sage }}>Friends joined</AppText></Surface><Surface className="flex-1 items-center rounded-[15px] border py-[13px]" style={{ backgroundColor: ThemeColors.snow }}><AppText font="SB" size={29} style={{ color: ThemeColors.primary }}>₦0</AppText><AppText font="SR" size={11} style={{ color: ThemeColors.sage }}>Total earned</AppText></Surface></View>
    <Surface className="mt-[14px] h-[60px] flex-row items-center rounded-[15px] border px-[16px]" style={{ backgroundColor: ThemeColors.snow }}><AppText font="SB" size={24} className="flex-1" style={{ color: ThemeColors.deepGreen }}>CHIAMAKA</AppText><Pressable onPress={copy} className="rounded-full px-[25px] py-[9px]" style={{ backgroundColor: ThemeColors.mint }}><AppText font="SB" size={14} style={{ color: ThemeColors.primary }}>{copied ? "Copied" : "Copy"}</AppText></Pressable></Surface>
    <View className="mt-[14px] flex-row gap-[12px]"><Pressable className="h-[60px] flex-1 items-center justify-center rounded-[14px]" style={{ backgroundColor: ThemeColors.primary }} onPress={() => Share.share({ message: link })}><AppText font="SB" size={14} style={{ color: "white" }}>Share link</AppText></Pressable><Pressable onPress={copy} className="h-[60px] flex-1 items-center justify-center rounded-[14px] border border-mist"><AppText font="SR" size={14} style={{ color: ThemeColors.deepGreen }}>Copy link</AppText></Pressable></View>
    {["Share your link|Send to friends on WhatsApp or Instagram.", "They sign up|Friend joins SendAm and makes their first request.", "You both earn ₦500|Credited when they complete their first request."].map((x, i) => { const [title, note] = x.split("|"); return <View key={title} className="mt-[17px] flex-row"><View className="h-[34px] w-[34px] items-center justify-center rounded-full" style={{ backgroundColor: ThemeColors.deepGreen }}><AppText font="SB" size={14} style={{ color: "white" }}>{i + 1}</AppText></View><View className="ml-[12px] flex-1"><AppText font="SB" size={14} style={{ color: ThemeColors.deepGreen }}>{title}</AppText><AppText font="SR" size={12} className="mt-[4px]" style={{ color: ThemeColors.sage }}>{note}</AppText></View></View>; })}
  </ScrollView></SafeAreaView>;
}
