import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { Global, Lock1 } from "iconsax-react-nativejs";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";
import { FormAppInput } from "@/components/ui/FormAppInput";

interface PayFormValues {
  name: string;
  email: string;
}

export default function PublicPayScreen() {
  const { control, handleSubmit } = useForm<PayFormValues>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (_values: PayFormValues) => {
    router.push("/pay/success");
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: ThemeColors.deepGreen }}
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 19,
          paddingTop: 84,
          paddingBottom: 27,
        }}
      >
        <View
          className="rounded-[22px] px-[19px] pb-[63px] pt-[18px]"
          style={{ backgroundColor: ThemeColors.white }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View
                className="h-[34px] w-[34px] items-center justify-center rounded-[8px]"
                style={{ backgroundColor: ThemeColors.deepGreen }}
              >
                <AppText font="SB" size={15} style={{ color: ThemeColors.white }}>
                  S
                </AppText>
              </View>
              <AppText
                font="SB"
                size={17}
                className="ml-[8px]"
                style={{ color: ThemeColors.deepGreen }}
              >
                SendAm
              </AppText>
            </View>
            <View className="flex-row items-center">
              <Lock1 color={ThemeColors.sage} size={15} variant="Bold" />
              <AppText
                font="SR"
                size={13}
                className="ml-[5px]"
                style={{ color: ThemeColors.sage }}
              >
                Secure
              </AppText>
            </View>
          </View>

          <View className="mt-[34px] items-center">
            <View
              className="h-[77px] w-[77px] items-center justify-center rounded-full"
              style={{ backgroundColor: ThemeColors.deepGreen }}
            >
              <AppText font="SB" size={22} style={{ color: ThemeColors.white }}>
                TK
              </AppText>
            </View>
            <AppText
              font="SR"
              size={16}
              className="mt-[16px]"
              style={{ color: ThemeColors.forest }}
            >
              Tunde Kola is requesting
            </AppText>
            <AppText
              font="SB"
              size={47}
              className="mt-[11px]"
              style={{ color: ThemeColors.deepGreen, lineHeight: 52 }}
            >
              ₦5,000
            </AppText>
            <AppText font="SR" size={16} style={{ color: ThemeColors.sage }}>
              Dinner at Yellow Chilli
            </AppText>
          </View>

          <View className="my-[31px] h-[1px] bg-mist" />

          <FormAppInput
            control={control}
            name="name"
            placeholder="Your name (optional)"
          />
          <FormAppInput
            control={control}
            name="email"
            placeholder="Email address  (for receipt)"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={{ marginTop: 13 }}
          />

          <Pressable
            className="mt-[22px] h-[60px] items-center justify-center rounded-[13px]"
            style={{ backgroundColor: ThemeColors.deepGreen }}
            onPress={handleSubmit(onSubmit)}
          >
            <AppText font="SB" size={17} style={{ color: ThemeColors.white }}>
              Pay with bank transfer
            </AppText>
          </Pressable>
          <Pressable
            className="mt-[10px] h-[51px] items-center justify-center rounded-[13px] border"
            style={{ borderColor: ThemeColors.mist }}
            onPress={handleSubmit(onSubmit)}
          >
            <AppText font="SB" size={16} style={{ color: ThemeColors.deepGreen }}>
              Pay with card
            </AppText>
          </Pressable>
        </View>

        <View className="mt-auto items-center pt-[56px]">
          <View className="flex-row items-center">
            <AppText font="SR" size={12} style={{ color: ThemeColors.sage }}>
              Powered by SendAm
            </AppText>
            <Global
              color={ThemeColors.sage}
              size={13}
              variant="Linear"
              style={{ marginLeft: 4 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

