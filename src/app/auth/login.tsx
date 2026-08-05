import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

import { ThemeColors } from "@/constant/theme";
import { BrandMark } from "@/components/auth/BrandMark";
import { AppButton } from "@/components/ui/AppButton";
import { FormAppInput } from "@/components/ui/FormAppInput";
import AppText from "@/components/ui/AppText";
import AuthTemplate from "@/template/AuthTemplate";
import useOnboarding from "@/hooks/useOnboarding";
import { handleError, handleSuccess } from "@/helper/handleResponse";
import { useDispatch } from "react-redux";
import { saveToken, saveUserData } from "@/store/userDetails";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { logIn, isLogInLoading } = useOnboarding();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await logIn(data).unwrap();

      if (res?.success) {
        dispatch(saveUserData(res?.data));
        dispatch(saveToken(res?.data?.accessToken));
        handleSuccess("Login Successful!");
        router.replace("/dashboard");
      } else {
        handleError(res?.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthTemplate showBrandSpacing>
      <BrandMark />

      <View className="mt-[52px]">
        <AppText
          font="SB"
          size={24}
          style={{ color: ThemeColors.deepGreen, lineHeight: 31 }}
        >
          Welcome back
        </AppText>

        <View className="mt-[13px] gap-[13px]">
          <FormAppInput
            control={control}
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <FormAppInput
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry
          />
        </View>

        <View className="mt-[29px]">
          <AppButton
            loading={isLogInLoading}
            title="Log In"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View className="mt-[31px] items-center">
          <AppText font="SR" size={15} style={{ color: ThemeColors.sage }}>
            Don&apos;t have an account?
          </AppText>
          <Pressable
            className="mt-[10px]"
            onPress={() => router.push("/auth/onboarding/phone")}
          >
            <AppText font="SB" size={15} style={{ color: ThemeColors.primary }}>
              Create Account
            </AppText>
          </Pressable>
        </View>
      </View>
    </AuthTemplate>
  );
}
