import React from "react";
import { View } from "react-native";

import { ThemeColors } from "@/constant/theme";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <View className="flex-row gap-[8px]">
      {Array.from({ length: totalSteps }, (_, index) => {
        const isComplete = index < currentStep;

        return (
          <View
            key={index}
            className="h-[4px] flex-1 rounded-full"
            style={{
              backgroundColor: isComplete ? ThemeColors.primary : ThemeColors.mist,
            }}
          />
        );
      })}
    </View>
  );
}
