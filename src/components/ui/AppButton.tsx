import React, { useEffect, useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from "react-native";

import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

function LoadingDots() {
  const dots = useRef(
    Array.from({ length: 3 }, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animations = dots.map((dot, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 120),
          Animated.timing(dot, {
            toValue: -6,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.delay((2 - index) * 120 + 180),
        ]),
      ),
    );

    animations.forEach((animation) => animation.start());

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, [dots]);

  return (
    <View className="h-5 flex-row items-center gap-2">
      {dots.map((translateY, index) => (
        <Animated.View
          key={index}
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: ThemeColors.white,
            transform: [{ translateY }],
          }}
        />
      ))}
    </View>
  );
}

export function AppButton({
  title,
  disabled,
  style,
  loading,
  activeOpacity = 0.85,
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      activeOpacity={activeOpacity}
      disabled={isDisabled}
      className="h-[60px] w-full items-center justify-center rounded-full"
      style={[
        {
          backgroundColor: disabled ? ThemeColors.mist : ThemeColors.primary,
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <LoadingDots />
      ) : (
        <AppText font="SM" size={17} style={{ color: ThemeColors.white }}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
}

export default AppButton;
