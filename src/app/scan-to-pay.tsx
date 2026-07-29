import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { TopBar } from "@/components/app/TopBar";
import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";

export default function QrPaymentScannerScreen() {
  const [mode, setMode] = useState<"scan" | "qr">("scan");
  return <SafeAreaView className="flex-1 bg-white"><TopBar title="Scan" showBack onBackPress={() => router.replace("/dashboard")} /><View className="flex-1 px-[19px] pt-[16px]">
    <View className="h-[52px] flex-row rounded-full p-[2px]" style={{ backgroundColor: ThemeColors.snow }}>{[(["scan", "Scan to Pay"] as const), (["qr", "Show my QR"] as const)].map(([id, label]) => <Pressable key={id} onPress={() => setMode(id)} className="flex-1 items-center justify-center rounded-full" style={{ backgroundColor: mode === id ? ThemeColors.white : "transparent" }}><AppText font="SB" size={15} style={{ color: mode === id ? ThemeColors.deepGreen : ThemeColors.sage }}>{label}</AppText></Pressable>)}</View>
    {mode === "scan" ? <><View className="mt-[14px] h-[414px] overflow-hidden rounded-[18px] bg-black"><View className="absolute left-[24px] top-[24px] h-[34px] w-[34px] border-l-[4px] border-t-[4px]" style={{ borderColor: ThemeColors.primary }} /><View className="absolute right-[24px] top-[24px] h-[34px] w-[34px] border-r-[4px] border-t-[4px]" style={{ borderColor: ThemeColors.primary }} /><View className="absolute bottom-[24px] left-[24px] h-[34px] w-[34px] border-b-[4px] border-l-[4px]" style={{ borderColor: ThemeColors.primary }} /><View className="absolute bottom-[24px] right-[24px] h-[34px] w-[34px] border-b-[4px] border-r-[4px]" style={{ borderColor: ThemeColors.primary }} /><View className="absolute top-1/2 h-[2px] w-full" style={{ backgroundColor: ThemeColors.primary }} /><AppText className="mt-[198px] text-center" size={12} style={{ color: ThemeColors.primary }}>Scanning...</AppText></View><AppText font="SR" size={14} className="mt-[23px] text-center" style={{ color: ThemeColors.sage }}>Point your camera at a SendAm QR code</AppText><AppText font="SR" size={14} className="mt-[20px] text-center" style={{ color: ThemeColors.sage }}>— or —</AppText><Pressable className="mt-[20px] h-[55px] items-center justify-center rounded-full border border-mist"><AppText font="SR" size={15} style={{ color: ThemeColors.deepGreen }}>Upload QR from gallery</AppText></Pressable></> : <View className="mt-[55px] items-center"><View className="h-[230px] w-[230px] items-center justify-center rounded-[22px] border-[12px]" style={{ borderColor: ThemeColors.deepGreen }}><AppText font="SB" size={34} style={{ color: ThemeColors.deepGreen }}>SENDAM</AppText><AppText font="SR" size={13} style={{ color: ThemeColors.sage }}>@chiamaka</AppText></View><AppText font="SB" size={19} className="mt-[25px]" style={{ color: ThemeColors.deepGreen }}>Let someone scan to pay you</AppText></View>}
  </View></SafeAreaView>;
}
