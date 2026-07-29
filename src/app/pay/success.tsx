import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight, TickCircle } from "iconsax-react-nativejs";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";

export default function PaymentSuccessScreen() {
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: ThemeColors.deepGreen }}
    >
      <ScrollView
        className="flex-1 px-[19px]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 86, paddingBottom: 32 }}
      >
        <View className="items-center">
          <View
            className="h-[86px] w-[86px] items-center justify-center rounded-full"
            style={{ backgroundColor: ThemeColors.primary }}
          >
            <TickCircle color={ThemeColors.white} size={48} variant="Bold" />
          </View>
          <AppText
            font="SB"
            size={26}
            className="mt-[26px]"
            style={{ color: ThemeColors.white }}
          >
            Payment sent!
          </AppText>
          <AppText
            font="SR"
            size={15}
            className="mt-[8px]"
            style={{ color: "#74E6A1" }}
          >
            +234 803... has been notified
          </AppText>
        </View>

        <View
          className="mt-[30px] rounded-[19px] px-[16px] pb-[13px] pt-[16px]"
          style={{ backgroundColor: ThemeColors.white }}
        >
          <View className="flex-row justify-between">
            <AppText font="SB" size={11} style={{ color: "#9AA6B2" }}>
              RECEIPT
            </AppText>
            <AppText font="SR" size={12} style={{ color: "#9AA6B2" }}>
              5 Jun 2026, 10:44
            </AppText>
          </View>
          <AppText
            font="SB"
            size={34}
            className="mt-[13px]"
            style={{ color: ThemeColors.deepGreen, lineHeight: 39 }}
          >
            ₦5,000
          </AppText>
          <AppText font="SR" size={14} style={{ color: ThemeColors.sage }}>
            Dinner at Yellow Chilli
          </AppText>
          <AppText
            font="SB"
            size={15}
            className="mt-[5px]"
            style={{ color: ThemeColors.deepGreen }}
          >
            To: Tunde Kola
          </AppText>
          <View className="mt-[11px] h-[1px] bg-mist" />
          <View className="mt-[10px] flex-row items-center justify-between">
            <AppText font="SR" size={12} style={{ color: "#9AA6B2" }}>
              Ref: SA-TX-9F3K2
            </AppText>
            <Pressable
              className="h-[30px] justify-center rounded-full px-[24px]"
              style={{ backgroundColor: ThemeColors.mint }}
            >
              <AppText font="SB" size={12} style={{ color: ThemeColors.primary }}>
                Copy ref
              </AppText>
            </Pressable>
          </View>
          <Pressable
            className="mt-[13px] h-[24px] items-center justify-center rounded-full"
            style={{ backgroundColor: ThemeColors.primary }}
          >
            <AppText font="SB" size={11} style={{ color: ThemeColors.white }}>
              Share receipt on WhatsApp
            </AppText>
          </Pressable>
        </View>

        <Pressable
          className="mt-[24px] h-[60px] items-center justify-center rounded-full"
          style={{ backgroundColor: ThemeColors.white }}
          onPress={() => router.push("/dashboard")}
        >
          <AppText font="SB" size={18} style={{ color: ThemeColors.deepGreen }}>
            Done
          </AppText>
        </Pressable>

        <View
          className="mt-[17px] h-[48px] rounded-full"
          style={{ backgroundColor: ThemeColors.white }}
        />

        <View
          className="mt-[20px] rounded-[18px] px-[16px] pb-[11px] pt-[70px]"
          style={{ backgroundColor: ThemeColors.white }}
        >
          <AppText font="SR" size={13} style={{ color: "#74E6A1" }}>
            Free forever.
          </AppText>
          <Pressable
            className="mt-[7px] h-[25px] flex-row items-center justify-center rounded-full"
            style={{ backgroundColor: ThemeColors.primary }}
            onPress={() => router.push("/auth/onboarding/phone")}
          >
            <AppText font="SB" size={13} style={{ color: ThemeColors.white }}>
              Get your free SendAm link
            </AppText>
            <ArrowRight
              color={ThemeColors.white}
              size={15}
              variant="Linear"
              style={{ marginLeft: 5 }}
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

