import React from "react";
import { View } from "react-native";

import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";

export function Avatar({ initial, size = 48, dark = false }: { initial: string; size?: number; dark?: boolean }) {
  return (
    <View
      className="items-center justify-center rounded-full"
      style={{ width: size, height: size, backgroundColor: dark ? ThemeColors.deepGreen : ThemeColors.mint }}
    >
      <AppText font="SB" size={Math.round(size * 0.34)} style={{ color: dark ? ThemeColors.white : ThemeColors.sage }}>
        {initial}
      </AppText>
    </View>
  );
}
