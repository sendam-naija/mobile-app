import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { router } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-nativejs";

import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";
import { ProgressBar } from "@/components/auth/ProgressBar";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthTemplateProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  progress?: {
    currentStep: number;
    totalSteps: number;
  };
  children: React.ReactNode;
  footer?: React.ReactNode;
  primaryAction?: {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
  };
  bottomLink?: React.ReactNode;
  showBrandSpacing?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export function AuthTemplate({
  eyebrow,
  title,
  subtitle,
  progress,
  children,
  footer,
  primaryAction,
  bottomLink,
  showBrandSpacing = false,
  showBackButton = false,
  onBackPress,
}: AuthTemplateProps) {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: ThemeColors.white }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 19,
            paddingBottom: 22,
          }}
        >
          <View
            className="flex-1"
            style={{ paddingTop: showBrandSpacing ? 72 : 25 }}
          >
            {showBackButton ? (
              <Pressable
                accessibilityLabel="Go back"
                accessibilityRole="button"
                className="mb-[30px] h-[40px] w-[40px] items-center justify-center rounded-full"
                style={{ backgroundColor: ThemeColors.snow }}
                onPress={handleBackPress}
              >
                <ArrowLeft2
                  color={ThemeColors.deepGreen}
                  size={22}
                  variant="Linear"
                />
              </Pressable>
            ) : !showBrandSpacing ? (
              <View className="h-[60px]" />
            ) : null}

            {progress ? (
              <View className="mb-[16px]">
                <ProgressBar
                  currentStep={progress.currentStep}
                  totalSteps={progress.totalSteps}
                />
              </View>
            ) : null}

            {eyebrow ? (
              <AppText
                font="SB"
                size={13}
                className="mb-[15px]"
                style={{ color: ThemeColors.primary, lineHeight: 18 }}
              >
                {eyebrow}
              </AppText>
            ) : null}

            {title ? (
              <AppText
                font="SB"
                size={32}
                style={{ color: ThemeColors.deepGreen, lineHeight: 40 }}
              >
                {title}
              </AppText>
            ) : null}

            {subtitle ? (
              <AppText
                font="SR"
                size={16}
                className="mt-[10px] leading-7"
                style={{ color: ThemeColors.sage }}
              >
                {subtitle}
              </AppText>
            ) : null}

            <View className="mt-[42px]">{children}</View>
            {footer}
          </View>

          {primaryAction ? (
            <View className="mt-[36px]">
              <AppButton
                title={primaryAction.title}
                disabled={primaryAction.disabled}
                onPress={primaryAction.onPress}
              />
              {bottomLink}
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default AuthTemplate;
