import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import {
  Add,
  Home,
  Menu,
  People,
  ProfileCircle,
  type Icon,
} from "iconsax-react-nativejs";

import { ThemeColors } from "@/constant/theme";
import AppText from "@/components/ui/AppText";

type TabRouteName = "dashboard" | "groups" | "activity" | "profile";

const tabs: Array<{
  routeName: TabRouteName;
  label: string;
  Icon: Icon;
}> = [
  { routeName: "dashboard", label: "Home", Icon: Home },
  { routeName: "groups", label: "Groups", Icon: People },
  { routeName: "activity", label: "Activity", Icon: Menu },
  { routeName: "profile", label: "Profile", Icon: ProfileCircle },
];

interface BottomTabsProps {
  active?: TabRouteName;
  onTabPress?: (routeName: TabRouteName) => void;
}

export function BottomTabs({ active = "dashboard", onTabPress }: BottomTabsProps) {
  const handleTabPress = (routeName: TabRouteName) => {
    if (onTabPress) {
      onTabPress(routeName);
      return;
    }

    router.push(`/${routeName}`);
  };

  return (
    <View
      className="h-[84px] flex-row items-start border-t px-[24px] pt-[10px]"
      style={{ backgroundColor: ThemeColors.white, borderColor: ThemeColors.mist }}
    >
      <View className="absolute left-[30px] top-[1px] h-[3px] w-[16px] rounded-full bg-primary" />

      {tabs.slice(0, 2).map(({ routeName, ...tab }) => (
        <TabButton
          key={routeName}
          active={active === routeName}
          onPress={() => handleTabPress(routeName)}
          {...tab}
        />
      ))}

      <View className="w-[82px] items-center">
        <Pressable
          accessibilityLabel="Create request"
          accessibilityRole="button"
          className="-mt-[29px] h-[68px] w-[68px] items-center justify-center rounded-full"
          style={{ backgroundColor: ThemeColors.primary }}
          onPress={() => router.push("/request/new")}
        >
          <Add color={ThemeColors.white} size={42} variant="Linear" />
        </Pressable>
      </View>

      {tabs.slice(2).map(({ routeName, ...tab }) => (
        <TabButton
          key={routeName}
          active={active === routeName}
          onPress={() => handleTabPress(routeName)}
          {...tab}
        />
      ))}
    </View>
  );
}

interface AppTabBarProps {
  state: {
    index: number;
    routes: Array<{ key: string; name: string }>;
  };
  navigation: {
    emit: (options: {
      type: "tabPress";
      target?: string;
      canPreventDefault: true;
    }) => { defaultPrevented: boolean };
    navigate: (routeName: string) => void;
  };
}

export function AppTabBar({ state, navigation }: AppTabBarProps) {
  const currentRouteName = state.routes[state.index]?.name;
  const activeRoute = tabs.some((tab) => tab.routeName === currentRouteName)
    ? (currentRouteName as TabRouteName)
    : "dashboard";

  return (
    <BottomTabs
      active={activeRoute}
      onTabPress={(routeName) => {
        const event = navigation.emit({
          type: "tabPress",
          target: state.routes.find((route) => route.name === routeName)?.key,
          canPreventDefault: true,
        });

        if (!event.defaultPrevented) {
          navigation.navigate(routeName);
        }
      }}
    />
  );
}

function TabButton({
  active,
  label,
  Icon,
  onPress,
}: {
  active: boolean;
  label: string;
  Icon: Icon;
  onPress?: () => void;
}) {
  const color = active ? ThemeColors.primary : ThemeColors.sage;

  return (
    <Pressable className="flex-1 items-center" onPress={onPress}>
      <Icon color={color} size={22} variant={active ? "Bold" : "Linear"} />
      <AppText
        font="SR"
        size={11}
        className="mt-[7px]"
        style={{ color, lineHeight: 15 }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}
