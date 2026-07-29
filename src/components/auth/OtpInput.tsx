import React, { useMemo, useRef } from "react";
import {
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from "react-native";

import { ThemeColors } from "@/constant/theme";

interface OtpInputProps {
  length?: number;
  value: string;
  onChangeText: (value: string) => void;
}

export function OtpInput({ length = 4, value, onChangeText }: OtpInputProps) {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const cleanValue = useMemo(
    () => value.replace(/\D/g, "").slice(0, length),
    [length, value],
  );
  const digits = Array.from({ length }, (_, index) => cleanValue[index] ?? "");

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const updateDigit = (index: number, text: string) => {
    const cleanText = text.replace(/\D/g, "");

    if (!cleanText) {
      const nextDigits = digits.slice();
      nextDigits[index] = "";
      onChangeText(nextDigits.join(""));
      return;
    }

    const nextDigits = digits.slice();
    cleanText
      .slice(0, length - index)
      .split("")
      .forEach((digit, digitIndex) => {
        nextDigits[index + digitIndex] = digit;
      });

    const nextValue = nextDigits.join("").slice(0, length);
    onChangeText(nextValue);

    const nextFocusIndex = Math.min(index + cleanText.length, length - 1);
    requestAnimationFrame(() => focusInput(nextFocusIndex));
  };

  const handleKeyPress = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key !== "Backspace") {
      return;
    }

    if (digits[index]) {
      const nextDigits = digits.slice();
      nextDigits[index] = "";
      onChangeText(nextDigits.join(""));
      return;
    }

    if (index > 0) {
      const nextDigits = digits.slice();
      nextDigits[index - 1] = "";
      onChangeText(nextDigits.join(""));
      requestAnimationFrame(() => focusInput(index - 1));
    }
  };

  return (
    <View className="mt-[46px] flex-row justify-center gap-3">
      {digits.map((digit, index) => {
        const isFilled = Boolean(digit);

        return (
          <View
            key={index}
            className="h-[60px] w-[60px] items-center justify-center rounded-[10px] border"
            style={{
              backgroundColor: isFilled ? ThemeColors.mint : ThemeColors.white,
              borderColor: isFilled ? ThemeColors.primary : ThemeColors.mist,
              borderWidth: isFilled ? 2 : 1.5,
            }}
          >
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              value={digit}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              inputMode="numeric"
              selectionColor={ThemeColors.primary}
              className="h-full w-full p-0 text-center"
              style={{
                color: ThemeColors.deepGreen,
                fontFamily: "SoraB",
                fontSize: 28,
                lineHeight: 34,
              }}
              onChangeText={(text) => updateDigit(index, text)}
              onKeyPress={(event) => handleKeyPress(index, event)}
            />
          </View>
        );
      })}
    </View>
  );
}
