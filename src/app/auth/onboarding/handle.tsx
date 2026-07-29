import React, { useEffect, useMemo } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { TickCircle } from "iconsax-react-nativejs";
import { router, useLocalSearchParams } from "expo-router";
import { useForm, useWatch } from "react-hook-form";

import { HandleSuggestions } from "@/components/auth/HandleSuggestions";
import { ThemeColors } from "@/constant/theme";
import { FormAppInput } from "@/components/ui/FormAppInput";
import AppText from "@/components/ui/AppText";
import AuthTemplate from "@/template/AuthTemplate";

function cleanHandlePart(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 18);
}

function getNameParts(fullName?: string) {
  const parts = (fullName ?? "")
    .trim()
    .split(/\s+/)
    .map(cleanHandlePart)
    .filter(Boolean);

  return {
    firstName: parts[0] ?? "sendam",
    lastName: parts.length > 1 ? parts[parts.length - 1] : "",
  };
}

function buildHandleSuggestions(fullName?: string) {
  const { firstName, lastName } = getNameParts(fullName);
  const initial = lastName ? lastName[0] : "";
  const randomTwoDigits = () => Math.floor(10 + Math.random() * 90).toString();
  const rawSuggestions = [
    firstName,
    lastName ? `${firstName}.${lastName}` : `${firstName}.pay`,
    lastName ? `${firstName}${initial}` : `${firstName}link`,
    lastName ? `${firstName}${lastName}` : `${firstName}${randomTwoDigits()}`,
    `${firstName}${randomTwoDigits()}`,
    lastName
      ? `${firstName}.${initial}${randomTwoDigits()}`
      : `${firstName}.co`,
  ];

  return Array.from(new Set(rawSuggestions))
    .slice(0, 4)
    .map((suggestion) => `@${suggestion}`);
}

interface HandleFormValues {
  handle: string;
}

export default function HandleScreen() {
  const { fullName } = useLocalSearchParams<{ fullName?: string }>();
  const suggestions = useMemo(
    () => buildHandleSuggestions(fullName),
    [fullName],
  );
  const initialHandle = useMemo(
    () => suggestions[0]?.replace("@", "") ?? "sendam",
    [suggestions],
  );
  const { control, reset, setValue } = useForm<HandleFormValues>({
    defaultValues: {
      handle: initialHandle,
    },
  });
  const handle = useWatch({ control, name: "handle" }) ?? "";

  useEffect(() => {
    reset({ handle: initialHandle });
  }, [initialHandle, reset]);

  return (
    <AuthTemplate
      eyebrow="FINAL STEP"
      title={"Claim your\nSendAm handle"}
      subtitle="Your permanent payment link. Share it anywhere."
      progress={{ currentStep: 4, totalSteps: 4 }}
      showBackButton
      onBackPress={() => router.replace({
        pathname: "/auth/onboarding/verify-otp",
        params: { fullName: fullName ?? "" },
      })}
      primaryAction={{ title: `Claim @${handle || initialHandle}` }}
      bottomLink={
        <TouchableOpacity
          onPress={() => router.push("/dashboard")}
          className="mt-[15px] items-center"
        >
          <AppText font="SR" size={15} style={{ color: ThemeColors.sage }}>
            I&apos;ll do this later
          </AppText>
        </TouchableOpacity>
      }
    >
      <FormAppInput
        control={control}
        name="handle"
        autoCapitalize="none"
        prefix={
          <AppText font="SB" size={15} style={{ color: ThemeColors.sage }}>
            sendam.co/@
          </AppText>
        }
        suffix={
          <View
            className="h-[28px] w-[28px] items-center justify-center rounded-full"
            style={{ backgroundColor: ThemeColors.mint }}
          >
            <TickCircle color={ThemeColors.primary} size={18} variant="Bold" />
          </View>
        }
        style={{
          fontFamily: "SoraB",
          color: ThemeColors.deepGreen,
          textAlign: "center",
        }}
      />

      <AppText
        font="SR"
        size={15}
        className="mt-[24px]"
        style={{ color: ThemeColors.primary }}
      >
        @{handle || initialHandle} is available
      </AppText>

      <HandleSuggestions
        suggestions={suggestions}
        onSelect={(suggestion) =>
          setValue("handle", suggestion.replace("@", ""), {
            shouldDirty: true,
            shouldTouch: true,
          })
        }
      />
    </AuthTemplate>
  );
}
