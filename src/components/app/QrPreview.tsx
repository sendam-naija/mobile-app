import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { ThemeColors } from "@/constant/theme";

interface QrPreviewProps {
  value: string;
}

export function QrPreview({ value }: QrPreviewProps) {
  return (
    <View
      className="h-[148px] w-[148px] items-center justify-center rounded-[10px] border"
      style={{ borderColor: ThemeColors.mist, backgroundColor: ThemeColors.snow }}
    >
      <QRCode
        value={value}
        size={124}
        color={ThemeColors.deepGreen}
        backgroundColor={ThemeColors.snow}
      />
    </View>
  );
}
