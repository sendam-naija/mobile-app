import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import {
  ArrowRight,
  ArrowUp,
  Bank,
  Copy,
  Link1,
  Menu,
  Scan,
} from "iconsax-react-nativejs";

import { AppShell } from "@/components/app/AppShell";
import AppText from "@/components/ui/AppText";
import { useSelector } from "react-redux";
import initializeName from "@/helper/initializeName";

const palette = {
  ink: "#17362E",
  forest: "#214C3F",
  green: "#2F7A5D",
  cream: "#F6F3EC",
  paper: "#FFFEFA",
  primary: "#22C55E",
  softGreen: "#BDECCB",
  paleGreen: "#E3F7E9",
  sand: "#E9E1D3",
  muted: "#708079",
  white: "#FFFFFF",
};

const activities = [
  {
    initial: "T",
    title: "Dinner at Yellow Chilli",
    subtitle: "Tunde · 5 min ago",
    amount: "+₦12,500",
    color: "#DDF5E5",
  },
  {
    initial: "N",
    title: "House rent",
    subtitle: "Nkechi · 2 hrs ago",
    amount: "+₦75,000",
    color: "#CDEED8",
  },
  {
    initial: "S",
    title: "Weekend trip",
    subtitle: "Sola · Yesterday",
    amount: "+₦37,500",
    color: "#E7F4EB",
  },
];

export default function DashboardScreen() {
  const { userDetails } = useSelector((state: any) => state?.user);
  console.log({ userDetails });
  return (
    <AppShell
      withBottomTabs={false}
      contentClassName="pt-[12px]"
      backgroundColor={palette.white}
    >
      <View className="flex-row items-center justify-between">
        <View>
          <AppText font="SR" size={13} style={{ color: palette.muted }}>
            Sunday, 19 July
          </AppText>
          <AppText
            font="SM"
            size={22}
            className="mt-[3px]"
            style={{ color: palette.ink, lineHeight: 29 }}
          >
            Good morning, {userDetails?.firstName}
          </AppText>
        </View>

        <Pressable
          accessibilityLabel="Open profile"
          className="h-[46px] w-[46px] items-center justify-center rounded-full border"
          style={{ backgroundColor: palette.sand, borderColor: palette.paper }}
          onPress={() => router.push("/profile")}
        >
          <AppText font="SM" size={15} style={{ color: palette.ink }}>
            {initializeName(
              `${userDetails?.firstName}  ${userDetails?.lastName}`,
            )}
          </AppText>
        </Pressable>
      </View>

      <View
        className="mt-[25px] overflow-hidden rounded-[28px] px-[22px] pb-[21px] pt-[22px]"
        style={{ backgroundColor: palette.forest }}
      >
        <View
          className="absolute -right-[52px] -top-[62px] h-[170px] w-[170px] rounded-full"
          style={{ backgroundColor: "#2D5D4E" }}
        />
        <View
          className="absolute -bottom-[58px] right-[45px] h-[115px] w-[115px] rounded-full"
          style={{ backgroundColor: palette.primary, opacity: 0.88 }}
        />

        <View className="flex-row items-center justify-between">
          <AppText font="SR" size={13} style={{ color: "#C5D5CF" }}>
            Total received
          </AppText>
          <View
            className="rounded-full px-[10px] py-[5px]"
            style={{ backgroundColor: "rgba(255,255,255,0.09)" }}
          >
            <AppText font="SR" size={11} style={{ color: palette.softGreen }}>
              This month
            </AppText>
          </View>
        </View>

        <AppText
          font="SM"
          size={36}
          className="mt-[15px]"
          style={{ color: palette.white, lineHeight: 43, letterSpacing: -1.2 }}
        >
          ₦28,500
        </AppText>
        <AppText
          font="SR"
          size={12}
          className="mt-[3px]"
          style={{ color: palette.softGreen }}
        >
          3 payments settled
        </AppText>

        <Pressable
          className="mt-[25px] h-[46px] flex-row items-center justify-center rounded-full"
          style={{ backgroundColor: palette.primary }}
          onPress={() => router.push("/request/new")}
        >
          <ArrowUp color={palette.white} size={18} variant="Linear" />
          <AppText
            font="SM"
            size={14}
            className="ml-[8px]"
            style={{ color: palette.white }}
          >
            Request money
          </AppText>
        </Pressable>
      </View>

      <View className="mt-[15px] flex-row gap-[12px]">
        <QuickAction
          label="Scan to pay"
          caption="Use a QR code"
          Icon={Scan}
          color={palette.softGreen}
          onPress={() => router.push("/scan-to-pay")}
        />
        <QuickAction
          label="Activity"
          caption="View all payments"
          Icon={Menu}
          color={palette.paleGreen}
          onPress={() => router.push("/activity")}
        />
      </View>

      <View
        className="mt-[15px] rounded-[21px] border px-[16px] py-[15px]"
        style={{ backgroundColor: palette.paper, borderColor: palette.sand }}
      >
        <View className="flex-row items-center">
          <View
            className="h-[39px] w-[39px] items-center justify-center rounded-full"
            style={{ backgroundColor: palette.cream }}
          >
            <Link1 color={palette.green} size={18} variant="Linear" />
          </View>
          <View className="ml-[12px] flex-1">
            <AppText font="SR" size={11} style={{ color: palette.muted }}>
              Your payment link
            </AppText>
            <AppText
              font="SM"
              size={14}
              className="mt-[2px]"
              style={{ color: palette.ink }}
            >
              sendam.co/@chiamaka
            </AppText>
          </View>
          <Pressable
            accessibilityLabel="Copy payment link"
            className="h-[38px] w-[38px] items-center justify-center rounded-full"
            style={{ backgroundColor: palette.cream }}
          >
            <Copy color={palette.ink} size={17} variant="Linear" />
          </Pressable>
        </View>
      </View>

      <Pressable
        className="mt-[15px] flex-row items-center rounded-[21px] px-[17px] py-[16px]"
        style={{ backgroundColor: palette.paleGreen }}
        onPress={() => router.push("/settings/bank-account")}
      >
        <View
          className="h-[42px] w-[42px] items-center justify-center rounded-full"
          style={{ backgroundColor: palette.primary }}
        >
          <Bank color={palette.white} size={20} variant="Bulk" />
        </View>
        <View className="ml-[13px] flex-1">
          <AppText font="SM" size={14} style={{ color: palette.ink }}>
            Connect your bank account
          </AppText>
          <AppText
            font="SR"
            size={11}
            className="mt-[3px]"
            style={{ color: palette.muted }}
          >
            Set up where your payments land
          </AppText>
        </View>
        <ArrowRight color={palette.ink} size={18} variant="Linear" />
      </Pressable>

      <View className="mt-[27px] flex-row items-end justify-between">
        <View>
          <AppText font="SM" size={19} style={{ color: palette.ink }}>
            Recent activity
          </AppText>
          <AppText
            font="SR"
            size={12}
            className="mt-[4px]"
            style={{ color: palette.muted }}
          >
            Your latest incoming payments
          </AppText>
        </View>
        <Pressable onPress={() => router.push("/activity")}>
          <AppText font="SM" size={12} style={{ color: palette.green }}>
            View all
          </AppText>
        </Pressable>
      </View>

      <View className="mt-[13px] mb-[8px]">
        {activities.map((item, index) => (
          <View
            key={item.title}
            className="flex-row items-center py-[13px]"
            style={
              index
                ? { borderTopWidth: 1, borderTopColor: palette.sand }
                : undefined
            }
          >
            <View
              className="h-[43px] w-[43px] items-center justify-center rounded-[15px]"
              style={{ backgroundColor: item.color }}
            >
              <AppText font="SM" size={14} style={{ color: palette.ink }}>
                {item.initial}
              </AppText>
            </View>
            <View className="ml-[12px] flex-1">
              <AppText
                font="SM"
                size={13}
                style={{ color: palette.ink }}
                numberOfLines={1}
              >
                {item.title}
              </AppText>
              <AppText
                font="SR"
                size={11}
                className="mt-[4px]"
                style={{ color: palette.muted }}
              >
                {item.subtitle}
              </AppText>
            </View>
            <AppText font="SM" size={13} style={{ color: palette.green }}>
              {item.amount}
            </AppText>
          </View>
        ))}
      </View>
    </AppShell>
  );
}

function QuickAction({
  label,
  caption,
  Icon,
  color,
  onPress,
}: {
  label: string;
  caption: string;
  Icon: typeof Scan;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      className="flex-1 rounded-[21px] px-[15px] py-[15px]"
      style={{ backgroundColor: color }}
      onPress={onPress}
    >
      <View className="flex-row items-start justify-between">
        <View
          className="h-[36px] w-[36px] items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.42)" }}
        >
          <Icon color={palette.ink} size={18} variant="Linear" />
        </View>
        <ArrowRight color={palette.ink} size={16} variant="Linear" />
      </View>
      <AppText
        font="SM"
        size={13}
        className="mt-[15px]"
        style={{ color: palette.ink }}
      >
        {label}
      </AppText>
      <AppText
        font="SR"
        size={10}
        className="mt-[3px]"
        style={{ color: "#50645D" }}
      >
        {caption}
      </AppText>
    </Pressable>
  );
}
