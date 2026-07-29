import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

import { ThemeColors } from "@/constant/theme";
import { FormAppInput } from "@/components/ui/FormAppInput";
import AppText from "@/components/ui/AppText";
import AuthTemplate from "@/template/AuthTemplate";

function NigeriaFlag() {
  return (
    <View className="h-[9px] w-[13px] flex-row overflow-hidden rounded-[1px]">
      <View className="flex-1" style={{ backgroundColor: ThemeColors.forest }} />
      <View className="flex-1" style={{ backgroundColor: ThemeColors.white }} />
      <View className="flex-1" style={{ backgroundColor: ThemeColors.forest }} />
    </View>
  );
}

interface PhoneFormValues {
  phone: string;
}

export default function PhoneScreen() {
  const { control, handleSubmit } = useForm<PhoneFormValues>({
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = (_values: PhoneFormValues) => {
    router.push("/auth/onboarding/setup");
  };

  return (
    <AuthTemplate
      eyebrow="STEP 1 OF 4"
      title={"What's your\nphone number?"}
      subtitle="We'll send a verification code to confirm."
      progress={{ currentStep: 1, totalSteps: 4 }}
      showBackButton
      onBackPress={() => router.replace("/auth/login")}
      primaryAction={{
        title: "Continue",
        onPress: handleSubmit(onSubmit),
      }}
    >
      <FormAppInput
        control={control}
        name="phone"
        keyboardType="phone-pad"
        placeholder="801 234 5678"
        prefix={
          <View className="flex-row items-center">
            <NigeriaFlag />
            <AppText
              font="SB"
              size={15}
              className="ml-[6px]"
              style={{ color: ThemeColors.deepGreen }}
            >
              +234
            </AppText>
            <View
              className="ml-[20px] h-[31px] w-[1px]"
              style={{ backgroundColor: ThemeColors.mist }}
            />
          </View>
        }
      />

      <AppText
        font="SR"
        size={14}
        className="mt-[25px]"
        style={{ color: ThemeColors.sage, lineHeight: 20 }}
      >
        By continuing you agree to SendAm&apos;s Terms and Privacy Policy.
      </AppText>
    </AuthTemplate>
  );
}
