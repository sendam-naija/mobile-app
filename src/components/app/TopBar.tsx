import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-nativejs";

import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
}

export function TopBar({ title, showBack = false, onBackPress }: TopBarProps) {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View
      className="h-[74px] flex-row items-center justify-center border-b"
      style={{
        borderColor: ThemeColors.mist,
        backgroundColor: ThemeColors.white,
      }}
    >
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-[19px] h-[40px] w-[40px] items-center justify-center"
          onPress={handleBack}
        >
          <ArrowLeft2
            color={ThemeColors.deepGreen}
            size={22}
            variant="Linear"
          />
        </Pressable>
      ) : null}

      <AppText font="SB" size={19} style={{ color: ThemeColors.deepGreen }}>
        {title}
      </AppText>
    </View>
  );
}
