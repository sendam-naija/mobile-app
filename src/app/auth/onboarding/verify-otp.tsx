import React from "react";
import { Pressable, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowRight } from "iconsax-react-nativejs";
import { useForm } from "react-hook-form";

import { FormOtpInput } from "@/components/auth/FormOtpInput";
import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";
import AuthTemplate from "@/template/AuthTemplate";

interface VerifyOtpFormValues {
  code: string;
}

export default function VerifyOtpScreen() {
  const { fullName } = useLocalSearchParams<{ fullName?: string }>();
  const { control, handleSubmit } = useForm<VerifyOtpFormValues>({
    defaultValues: {
      code: "",
    },
  });

  const goToHandle = (_values?: VerifyOtpFormValues) => {
    router.push({
      pathname: "/auth/onboarding/handle",
      params: { fullName: fullName ?? "" },
    });
  };

  return (
    <AuthTemplate
      eyebrow="STEP 3 OF 4"
      title="Enter your code"
      subtitle="Sent to +234 803 123 4567"
      progress={{ currentStep: 3, totalSteps: 4 }}
      showBackButton
      onBackPress={() => router.replace("/auth/onboarding/setup")}
      primaryAction={{
        title: "Verify",
        onPress: handleSubmit(goToHandle),
      }}
    >
      <FormOtpInput control={control} name="code" />

      <View className="mt-[25px] items-center">
        <AppText font="SR" size={16} style={{ color: ThemeColors.sage }}>
          Resend in&nbsp; 0:23
        </AppText>
        <Pressable
          className="mt-[34px] flex-row items-center"
          onPress={() => goToHandle()}
        >
          <AppText font="SR" size={15} style={{ color: ThemeColors.sage }}>
            Skip for now
          </AppText>
          <ArrowRight
            color={ThemeColors.sage}
            size={16}
            variant="Linear"
            style={{ marginLeft: 4 }}
          />
        </Pressable>
      </View>
    </AuthTemplate>
  );
}
