import React, { useState } from "react";
import {
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";

import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";

export interface AppInputProps extends TextInputProps {
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export function AppInput({
  label,
  prefix,
  suffix,
  containerStyle,
  style,
  onFocus,
  onBlur,
  placeholderTextColor = ThemeColors.sage,
  ...inputProps
}: AppInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus: NonNullable<TextInputProps["onFocus"]> = (event) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur: NonNullable<TextInputProps["onBlur"]> = (event) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={containerStyle}>
      {label ? (
        <AppText
          font="SM"
          size={15}
          className="mb-[8px]"
          style={{ color: ThemeColors.forest }}
        >
          {label}
        </AppText>
      ) : null}

      <View
        className="h-[60px] flex-row items-center rounded-[14px] border px-[14px]"
        style={{
          backgroundColor: ThemeColors.snow,
          borderColor: isFocused ? ThemeColors.primary : ThemeColors.mist,
          borderWidth: isFocused ? 2 : 1,
        }}
      >
        {prefix ? <View className="mr-[12px]">{prefix}</View> : null}

        <TextInput
          className="min-w-0 flex-1 p-0"
          placeholderTextColor={placeholderTextColor}
          selectionColor={ThemeColors.primary}
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={[
            {
              color: ThemeColors.deepGreen,
              fontFamily: "SoraR",
              fontSize: 16,
              lineHeight: 21,
            },
            style,
          ]}
          {...inputProps}
        />

        {suffix ? <View className="ml-[12px]">{suffix}</View> : null}
      </View>
    </View>
  );
}

export default AppInput;
