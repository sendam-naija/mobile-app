import React from "react";
import { Pressable, View } from "react-native";

import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";

interface HandleSuggestionsProps {
  suggestions: string[];
  onSelect?: (value: string) => void;
}

export function HandleSuggestions({
  suggestions,
  onSelect,
}: HandleSuggestionsProps) {
  return (
    <View className="mt-[30px] flex-row flex-wrap gap-[10px]">
      {suggestions.map((suggestion) => (
        <Pressable
          key={suggestion}
          className="h-[38px] justify-center rounded-full border px-[17px]"
          style={{
            backgroundColor: ThemeColors.mint,
            borderColor: ThemeColors.aquaMint,
          }}
          onPress={() => onSelect?.(suggestion)}
        >
          <AppText font="SSB" size={14} style={{ color: ThemeColors.primary }}>
            {suggestion}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}
