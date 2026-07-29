import React, { useState } from "react";
import { Alert, Pressable, ScrollView, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { File, Paths } from "expo-file-system";
import { router, useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import {
  Copy,
  Link1,
  MessageCircle,
  More,
  Scan,
  TickCircle,
  Whatsapp,
} from "iconsax-react-nativejs";
import { SafeAreaView } from "react-native-safe-area-context";

import { QrPreview } from "@/components/app/QrPreview";
import { TopBar } from "@/components/app/TopBar";
import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";

export default function RequestCreatedScreen() {
  const [copied, setCopied] = useState(false);
  const params = useLocalSearchParams<{
    title?: string;
    amount?: string;
    description?: string;
    reference?: string;
  }>();
  const title = params.title || "Payment request";
  const amount = params.amount || "0";
  const description = params.description?.trim();
  const reference = params.reference || "REQUEST";
  const paymentUrl = `https://sendam.co/pay/${reference}`;

  const copyPaymentLink = async () => {
    try {
      await Clipboard.setStringAsync(paymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      Alert.alert("Unable to copy", "Please try copying the payment link again.");
    }
  };

  const shareRequest = async () => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Sharing unavailable", "Sharing is not supported on this device.");
        return;
      }

      const shareText = [
        title,
        `Amount: ₦${amount}`,
        description,
        `Pay here: ${paymentUrl}`,
      ]
        .filter(Boolean)
        .join("\n");
      const shareFile = new File(Paths.cache, `sendam-${reference}.txt`);
      shareFile.write(shareText);

      await Sharing.shareAsync(shareFile.uri, {
        dialogTitle: `Share ${title}`,
        mimeType: "text/plain",
        UTI: "public.plain-text",
      });
    } catch {
      Alert.alert("Unable to share", "Please try sharing the request again.");
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: ThemeColors.white }}>
      <TopBar title="Payment Link Ready" showBack onBackPress={() => router.replace("/request/new")} />
      <ScrollView
        className="flex-1 px-[19px]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: 28 }}
      >
        <View className="items-center">
          <View
            className="h-[77px] w-[77px] items-center justify-center rounded-full"
            style={{ backgroundColor: ThemeColors.mint }}
          >
            <TickCircle color={ThemeColors.primary} size={38} variant="Bold" />
          </View>
          <AppText
            font="SB"
            size={21}
            className="mt-[23px]"
            style={{ color: ThemeColors.deepGreen }}
          >
            {title}
          </AppText>
          <AppText
            font="SB"
            size={36}
            className="mt-[8px]"
            style={{ color: ThemeColors.primary, lineHeight: 42 }}
          >
            ₦{amount}
          </AppText>
          {description ? (
            <AppText
              font="SR"
              size={14}
              className="mt-[8px] text-center"
              style={{ color: ThemeColors.sage }}
            >
              {description}
            </AppText>
          ) : null}
        </View>

        <View className="mt-[16px] flex-row items-center">
          <View
            className="h-[53px] flex-1 justify-center rounded-[12px] border px-[12px]"
            style={{ borderColor: ThemeColors.mist, backgroundColor: ThemeColors.snow }}
          >
            <AppText font="SR" size={14} style={{ color: ThemeColors.deepGreen }}>
              {paymentUrl.replace("https://", "")}
            </AppText>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Copy payment link"
            className="ml-[9px] h-[43px] w-[43px] items-center justify-center rounded-[11px]"
            style={{ backgroundColor: ThemeColors.mint }}
            onPress={copyPaymentLink}
          >
            <Copy color={ThemeColors.primary} size={20} variant="Linear" />
          </Pressable>
        </View>

        <View className="mt-[16px] flex-row justify-around">
          <ShareAction label="WhatsApp" Icon={Whatsapp} onPress={shareRequest} />
          <ShareAction
            label={copied ? "Copied" : "Copy Link"}
            Icon={Link1}
            onPress={copyPaymentLink}
          />
          <ShareAction label="QR Code" Icon={Scan} onPress={shareRequest} />
          <ShareAction label="More" Icon={More} onPress={shareRequest} />
        </View>

        <AppText
          font="SB"
          size={16}
          className="mt-[18px]"
          style={{ color: ThemeColors.deepGreen }}
        >
          QR Code
        </AppText>
        <View className="mt-[14px] items-center">
          <QrPreview value={paymentUrl} />
        </View>

        <Pressable
          className="mt-[22px] h-[56px] items-center justify-center rounded-full border"
          style={{ borderColor: ThemeColors.mist }}
          onPress={() => router.push("/dashboard")}
        >
          <AppText font="SR" size={16} style={{ color: ThemeColors.deepGreen }}>
            Back to Home
          </AppText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function ShareAction({
  label,
  Icon,
  onPress,
}: {
  label: string;
  Icon: typeof MessageCircle;
  onPress: () => void | Promise<void>;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className="items-center"
      onPress={onPress}
    >
      <View
        className="h-[58px] w-[58px] items-center justify-center rounded-full"
        style={{ backgroundColor: ThemeColors.mint }}
      >
        <Icon color={ThemeColors.primary} size={25} variant="Linear" />
      </View>
      <AppText
        font="SR"
        size={12}
        className="mt-[9px]"
        style={{ color: ThemeColors.sage }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}
