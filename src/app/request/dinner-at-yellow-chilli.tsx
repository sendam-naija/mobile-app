import React, { useState } from "react";
import { Pressable, Share, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Surface } from "@/components/app/Surface";
import { TopBar } from "@/components/app/TopBar";
import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";

export default function PaymentRequestDetailScreen() {
  const [active, setActive] = useState(true);
  const link = "https://sendam.co/pay/DX9K2A";
  const actions = [
    {
      icon: "💬",
      label: "WhatsApp",
      action: () =>
        Share.share({ message: `Dinner at Yellow Chilli — ₦12,500\n${link}` }),
    },
    {
      icon: "🔗",
      label: "Copy Link",
      action: () => Clipboard.setStringAsync(link),
    },
    { icon: "▣", label: "QR Code", action: () => {} },
    {
      icon: "•••",
      label: "More",
      action: () => Share.share({ message: link }),
    },
  ];
  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar
        title="Request"
        showBack
        onBackPress={() => router.back()}
      />
      <View className="flex-1 px-[19px] pt-[16px]">
        <Surface className="rounded-[15px] border px-[16px] py-[14px]">
          <View className="flex-row justify-between">
            <AppText
              font="SB"
              size={18}
              style={{ color: ThemeColors.deepGreen }}
            >
              Dinner at Yellow Chilli
            </AppText>
            <View
              className="rounded-full px-[25px] py-[8px]"
              style={{ backgroundColor: ThemeColors.mint }}
            >
              <AppText
                font="SB"
                size={12}
                style={{ color: ThemeColors.primary }}
              >
                {active ? "Active" : "Cancelled"}
              </AppText>
            </View>
          </View>
          <AppText
            font="SB"
            size={34}
            className="mt-[8px]"
            style={{ color: ThemeColors.primary }}
          >
            ₦12,500
          </AppText>
          <AppText
            font="SR"
            size={12}
            className="mt-[6px]"
            style={{ color: ThemeColors.sage }}
          >
            Created 5 Jun 2026
          </AppText>
        </Surface>
        <Pressable
          onPress={() => Clipboard.setStringAsync(link)}
          className="mt-[14px] h-[55px] flex-row items-center rounded-[14px] px-[14px]"
          style={{ backgroundColor: ThemeColors.snow }}
        >
          <AppText
            font="SR"
            size={13}
            className="flex-1"
            style={{ color: ThemeColors.deepGreen }}
          >
            sendam.co/pay/DX9K2A
          </AppText>
          <AppText style={{ color: ThemeColors.primary }}>▣</AppText>
        </Pressable>
        <View className="mt-[14px] flex-row justify-between">
          {actions.map((a) => (
            <Pressable
              key={a.label}
              className="items-center"
              onPress={a.action}
            >
              <View
                className="h-[58px] w-[58px] items-center justify-center rounded-full"
                style={{ backgroundColor: ThemeColors.mint }}
              >
                <AppText size={22} style={{ color: ThemeColors.primary }}>
                  {a.icon}
                </AppText>
              </View>
              <AppText
                font="SR"
                size={11}
                className="mt-[7px]"
                style={{ color: ThemeColors.sage }}
              >
                {a.label}
              </AppText>
            </Pressable>
          ))}
        </View>
        {active ? (
          <>
            <Pressable
              onPress={() =>
                Share.share({
                  message: `Reminder: Dinner at Yellow Chilli — ${link}`,
                })
              }
              className="mt-[14px] h-[58px] items-center justify-center rounded-[14px] border"
              style={{ borderColor: "#F59E0B", backgroundColor: "#FFFBEB" }}
            >
              <AppText font="SR" size={15} style={{ color: "#F59E0B" }}>
                Send WhatsApp reminder to payer
              </AppText>
            </Pressable>
            <Pressable
              onPress={() => setActive(false)}
              className="mt-[14px] h-[58px] items-center justify-center rounded-[14px] border border-mist"
            >
              <AppText font="SR" size={15} style={{ color: ThemeColors.sage }}>
                Cancel this request
              </AppText>
            </Pressable>
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
