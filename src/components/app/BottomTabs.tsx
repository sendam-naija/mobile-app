import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
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
  const insets = useSafeAreaInsets();

  const handleTabPress = (routeName: TabRouteName) => {
    if (onTabPress) {
      onTabPress(routeName);
      return;
    }

    router.push(`/${routeName}`);
  };

  return (
    <View
      className="px-[14px] pt-[8px]"
      style={{
        backgroundColor: ThemeColors.white,
        paddingBottom: Math.max(insets.bottom, 10),
      }}
    >
      <View
        className="h-[76px] flex-row items-center rounded-[28px] border px-[8px]"
        style={{
          backgroundColor: ThemeColors.white,
          borderColor: "#EEF2EF",
          shadowColor: ThemeColors.deepGreen,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 10,
        }}
      >
        {tabs.slice(0, 2).map(({ routeName, ...tab }) => (
          <TabButton
            key={routeName}
            active={active === routeName}
            onPress={() => handleTabPress(routeName)}
            {...tab}
          />
        ))}

        <View className="flex-1 items-center">
          <View
            className="-mt-[31px] h-[66px] w-[66px] items-center justify-center rounded-full border-[5px]"
            style={{
              backgroundColor: ThemeColors.primary,
              borderColor: ThemeColors.white,
              shadowColor: ThemeColors.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.25,
              shadowRadius: 10,
              elevation: 8,
            }}
          >
            <Pressable
              accessibilityLabel="Create request"
              accessibilityRole="button"
              hitSlop={8}
              className="h-[56px] w-[56px] items-center justify-center rounded-full"
              style={({ pressed }) => ({
                backgroundColor: "transparent",
                opacity: pressed ? 0.82 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              })}
              onPress={() => router.push("/request/new")}
            >
              <View
                className="absolute h-[3px] w-[24px] rounded-full"
                style={{ backgroundColor: ThemeColors.white }}
              />
              <View
                className="absolute h-[24px] w-[3px] rounded-full"
                style={{ backgroundColor: ThemeColors.white }}
              />
            </Pressable>
          </View>
          <AppText
            font="SM"
            size={10}
            className="mt-[2px]"
            style={{ color: ThemeColors.deepGreen, lineHeight: 13 }}
          >
            Request
          </AppText>
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
  const color = active ? ThemeColors.primary : "#839189";

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      hitSlop={6}
      className="flex-1 items-center justify-center"
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.65 : 1,
        transform: [{ scale: pressed ? 0.96 : 1 }],
      })}
    >
      <View
        className="h-[34px] min-w-[44px] items-center justify-center rounded-full px-[10px]"
        style={{
          backgroundColor: active ? ThemeColors.mint : "transparent",
        }}
      >
        <Icon color={color} size={22} variant={active ? "Bold" : "Linear"} />
      </View>
      <AppText
        font={active ? "SM" : "SR"}
        size={10}
        className="mt-[2px]"
        style={{ color, lineHeight: 13 }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}
