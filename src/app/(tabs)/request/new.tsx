import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { TickCircle } from "iconsax-react-nativejs";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

import { TopBar } from "@/components/app/TopBar";
import { ThemeColors } from "@/constant/theme";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { FormAppInput } from "@/components/ui/FormAppInput";

interface RequestFormValues {
  title: string;
  amount: string;
  description: string;
}

const formatAmount = (value: string) => {
  const digits = value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function NewRequestScreen() {
  const { control, handleSubmit } = useForm<RequestFormValues>({
    defaultValues: {
      title: "",
      amount: "",
      description: "",
    },
  });

  const onSubmit = (values: RequestFormValues) => {
    const reference = Math.random().toString(36).slice(2, 8).toUpperCase();

    router.push({
      pathname: "/request/created",
      params: {
        title: values.title.trim(),
        amount: values.amount,
        description: values.description.trim(),
        reference,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: ThemeColors.white }}>
      <TopBar title="New Request" showBack onBackPress={() => router.replace("/dashboard")} />
      <ScrollView
        className="flex-1 px-[19px]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 18, paddingBottom: 28 }}
      >
        <FormAppInput
          control={control}
          name="title"
          label="What's it for?"
          placeholder="e.g. Dinner, Rent, Event..."
          rules={{ required: true }}
        />
        <FormAppInput
          control={control}
          name="amount"
          label="Amount"
          keyboardType="number-pad"
          formatValue={formatAmount}
          maxLength={19}
          rules={{ required: true }}
          prefix={
            <AppText
              font="SB"
              size={24}
              style={{ color: ThemeColors.deepGreen, lineHeight: 32 }}
            >
              ₦
            </AppText>
          }
          style={{ fontFamily: "SoraB", fontSize: 24, lineHeight: 32 }}
          containerStyle={{ marginTop: 18 }}
        />
        <FormAppInput
          control={control}
          name="description"
          label="Description (optional)"
          placeholder="For our dinner last night..."
          containerStyle={{ marginTop: 18 }}
        />

        <Pressable
          className="mt-[18px] h-[64px] flex-row items-center rounded-[14px] border px-[14px]"
          style={{ borderColor: ThemeColors.aquaMint, backgroundColor: ThemeColors.mint }}
        >
          <TickCircle color={ThemeColors.primary} size={31} variant="Bold" />
          <View className="ml-[13px]">
            <AppText font="SB" size={15} style={{ color: ThemeColors.deepGreen }}>
              Let payer choose amount
            </AppText>
            <AppText font="SR" size={13} style={{ color: ThemeColors.sage }}>
              They enter what they want to pay
            </AppText>
          </View>
        </Pressable>

        <View className="mt-[17px]">
          <AppButton
            title="Create Request"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
