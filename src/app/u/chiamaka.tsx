import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Avatar } from "@/components/app/Avatar";
import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";

export default function PublicHandleScreen() {
  return <SafeAreaView className="flex-1" style={{ backgroundColor: ThemeColors.deepGreen }}><ScrollView contentContainerStyle={{ flexGrow: 1, padding: 19, paddingTop: 72, paddingBottom: 28 }}>
    <View className="rounded-[24px] bg-white px-[19px] pb-[27px] pt-[18px]"><View className="flex-row items-center justify-between"><View className="flex-row items-center"><View className="h-[30px] w-[30px] items-center justify-center rounded-[8px]" style={{ backgroundColor: ThemeColors.deepGreen }}><AppText font="SB" size={14} style={{ color: "white" }}>S</AppText></View><AppText font="SB" size={17} className="ml-[8px]" style={{ color: ThemeColors.deepGreen }}>SendAm</AppText></View><AppText font="SM" size={13} style={{ color: ThemeColors.primary }}>✓ Verified</AppText></View>
      <View className="mt-[20px] items-center"><Avatar initial="C" size={98} dark /><AppText font="SB" size={25} className="mt-[14px]" style={{ color: ThemeColors.deepGreen }}>@chiamaka</AppText><AppText font="SR" size={14} style={{ color: ThemeColors.sage }}>SendAm user</AppText></View>
      <View className="mt-[12px] border-t border-mist pt-[13px]"><View className="rounded-[15px] px-[16px] py-[16px]" style={{ backgroundColor: ThemeColors.snow }}><AppText font="SB" size={16} style={{ color: ThemeColors.deepGreen }}>Want to pay @chiamaka?</AppText><AppText font="SR" size={13} className="mt-[5px]" style={{ color: ThemeColors.sage, lineHeight: 18 }}>Ask them to send you a payment link directly on WhatsApp.</AppText></View></View>
    </View>
    <View className="mt-[20px] rounded-[20px] bg-white px-[19px] pb-[10px] pt-[67px]"><AppText font="SR" size={12} style={{ color: "#62DF91" }}>Share on WhatsApp. Free forever.</AppText><Pressable onPress={() => router.push("/auth/onboarding/phone")} className="mt-[5px] h-[28px] items-center justify-center rounded-full" style={{ backgroundColor: ThemeColors.primary }}><AppText font="SB" size={13} style={{ color: "white" }}>Get your free SendAm link →</AppText></Pressable></View>
    <AppText font="SR" size={12} className="mt-auto pt-[40px] text-center" style={{ color: ThemeColors.sage }}>Powered by SendAm 🌍</AppText>
  </ScrollView></SafeAreaView>;
}
