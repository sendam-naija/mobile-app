import React from "react";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

import { FormAppInput } from "@/components/ui/FormAppInput";
import AuthTemplate from "@/template/AuthTemplate";

interface SetupFormValues {
  fullName: string;
  password: string;
}

export default function SetupScreen() {
  const { control, handleSubmit } = useForm<SetupFormValues>({
    defaultValues: {
      fullName: "",
      password: "",
    },
  });

  const onSubmit = (values: SetupFormValues) => {
    router.push({
      pathname: "/auth/onboarding/verify-otp",
      params: { fullName: values.fullName.trim() },
    });
  };

  return (
    <AuthTemplate
      eyebrow="STEP 2 OF 4"
      title="Set up your account"
      subtitle="Creating for +234 803 123 4567"
      progress={{ currentStep: 2, totalSteps: 4 }}
      showBackButton
      onBackPress={() => router.replace("/auth/onboarding/phone")}
      primaryAction={{
        title: "Create Account",
        onPress: handleSubmit(onSubmit),
      }}
    >
      <FormAppInput
        control={control}
        name="fullName"
        label="Your full name"
        placeholder="e.g. Chiamaka Okafor"
        autoCapitalize="words"
      />
      <FormAppInput
        control={control}
        name="password"
        label="Password"
        placeholder="Min. 8 characters"
        secureTextEntry
        containerStyle={{ marginTop: 17 }}
      />
    </AuthTemplate>
  );
}
