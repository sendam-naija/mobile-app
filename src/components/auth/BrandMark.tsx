import React from "react";
import { View } from "react-native";

import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";

export function BrandMark() {
  return (
    <View className="items-center">
      <View
        className="h-[46px] w-[46px] items-center justify-center rounded-[13px]"
        style={{ backgroundColor: ThemeColors.primary }}
      >
        <AppText font="SB" size={24} style={{ color: ThemeColors.white }}>
          S
        </AppText>
      </View>
      <AppText
        font="SB"
        size={24}
        className="mt-[18px]"
        style={{ color: ThemeColors.deepGreen, lineHeight: 30 }}
      >
        SendAm
      </AppText>
      <AppText
        font="SR"
        size={16}
        className="mt-[8px]"
        style={{ color: ThemeColors.sage, lineHeight: 22 }}
      >
        Send a link. Get paid.
      </AppText>
    </View>
  );
}
