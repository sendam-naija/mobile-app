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
import usePayments from "@/hooks/usePayments";
import { handleError, handleSuccess } from "@/helper/handleResponse";

interface RequestFormValues {
  title: string;
  amount: string;
  description: string;
  expectedPayerName: string;
}

const formatAmount = (value: string) => {
  const digits = value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getExpiryIso = () =>
  new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

export default function NewRequestScreen() {
  const { control, handleSubmit } = useForm<RequestFormValues>({
    defaultValues: {
      title: "",
      amount: "",
      description: "",
      expectedPayerName: "",
    },
  });
  const { createPaymentRequest, createPaymentRequestIsLoading } = usePayments();

  const onSubmit = async (values: RequestFormValues) => {
    const amount = Number(values.amount.replace(/,/g, ""));

    try {
      const response = await createPaymentRequest({
        title: values.title.trim(),
        amount,
        description: values.description.trim(),
        expectedPayerName: values.expectedPayerName.trim(),
        allowMultiplePayers: false,
        expiresAt: getExpiryIso(),
      }).unwrap();

      const requestId = response.data.id;
      const requestReference = response.data.reference ?? requestId;
      const paymentUrl =
        response.data.link ?? `https://sendam.co/pay/${requestReference}`;

      handleSuccess("Payment request created");
      router.push({
        pathname: "/request/created",
        params: {
          id: requestId,
          title: response.data.title ?? values.title.trim(),
          amount: formatAmount(String(response.data.amount ?? amount)),
          description: response.data.description ?? values.description.trim(),
          expectedPayerName:
            response.data.expectedPayerName ?? values.expectedPayerName.trim(),
          reference: requestReference,
          paymentUrl,
          status: response.data.status ?? "ACTIVE",
          expiresAt: response.data.expiresAt ?? getExpiryIso(),
        },
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: ThemeColors.white }}
    >
      <TopBar
        title="New Request"
        showBack
        onBackPress={() => {
          router.replace("/dashboard");
        }}
      />
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
        <FormAppInput
          control={control}
          name="expectedPayerName"
          label="Expected payer name"
          placeholder="e.g. Tunde Kola"
          rules={{ required: true }}
          containerStyle={{ marginTop: 18 }}
        />

        <Pressable
          className="mt-[18px] h-[64px] flex-row items-center rounded-[14px] border px-[14px]"
          style={{
            borderColor: ThemeColors.aquaMint,
            backgroundColor: ThemeColors.mint,
          }}
        >
          <TickCircle color={ThemeColors.primary} size={31} variant="Bold" />
          <View className="ml-[13px]">
            <AppText
              font="SB"
              size={15}
              style={{ color: ThemeColors.deepGreen }}
            >
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
            loading={createPaymentRequestIsLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
