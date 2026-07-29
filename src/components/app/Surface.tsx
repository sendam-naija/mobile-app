import React from "react";
import { Pressable, View, type PressableProps, type ViewProps } from "react-native";

import { ThemeColors } from "@/constant/theme";

export function Surface({ style, ...props }: ViewProps) {
  return (
    <View
      {...props}
      style={[
        { borderColor: ThemeColors.mist, backgroundColor: ThemeColors.white },
        style,
      ]}
    />
  );
}

export function ActionSurface({ style, ...props }: PressableProps) {
  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      style={(state) => [
        { borderColor: ThemeColors.mist, backgroundColor: ThemeColors.white, opacity: state.pressed ? 0.72 : 1 },
        typeof style === "function" ? style(state) : style,
      ]}
    />
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <View className="h-[10px] overflow-hidden rounded-full" style={{ backgroundColor: ThemeColors.snow }}>
      <View className="h-full rounded-full" style={{ width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: ThemeColors.primary }} />
    </View>
  );
}
