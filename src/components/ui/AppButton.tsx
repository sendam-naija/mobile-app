import React from "react";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
}

export function AppButton({
  title,
  disabled,
  style,
  activeOpacity = 0.85,
  ...props
}: AppButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={activeOpacity}
      disabled={disabled}
      className="h-[60px] w-full items-center justify-center rounded-full"
      style={[
        {
          backgroundColor: disabled ? ThemeColors.mist : ThemeColors.primary,
          opacity: disabled ? 0.4 : 1,
        },
        style,
      ]}
      {...props}
    >
      <AppText font="SM" size={17} style={{ color: ThemeColors.white }}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

export default AppButton;
