import React, { useCallback } from "react";
import { Pressable, View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { AppShell } from "@/components/app/AppShell";
import { Avatar } from "@/components/app/Avatar";
import { Surface } from "@/components/app/Surface";
import { TopBar } from "@/components/app/TopBar";
import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";
import usePayments from "@/hooks/usePayments";

function formatCurrency(amount?: number) {
  return `₦${(amount ?? 0).toLocaleString("en-NG")}`;
}

function getSectionTitle(createdAt?: string) {
  if (!createdAt) return "OLDER";

  const date = new Date(createdAt);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (sameDay) return "TODAY";
  if (isYesterday) return "YESTERDAY";
  return "OLDER";
}

function getTimeLabel(createdAt?: string) {
  if (!createdAt) return "";

  return new Date(createdAt).toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ActivityFeedScreen() {
  const { paymentRequests, paymentRequestsRefetch } = usePayments();
  useFocusEffect(
    useCallback(() => {
      void paymentRequestsRefetch();
    }, [paymentRequestsRefetch]),
  );
  const groupedSections = [...paymentRequests]
    .sort(
      (left, right) =>
        new Date(right.createdAt || 0).getTime() -
        new Date(left.createdAt || 0).getTime(),
    )
    .reduce<
      Array<{
        title: string;
        rows: Array<{
          id: string;
          initial: string;
          name: string;
          note: string;
          reference: string;
          link: string;
          amount: string;
          time: string;
          status: string;
        }>;
      }>
    >((sections, item) => {
      const title = getSectionTitle(item.createdAt as string);
      const section = sections.find((entry) => entry.title === title);
      const row = {
        id: item.id,
        reference: item.reference || item.id,
        link: item.link || `https://sendam.co/pay/${item.reference || item.id}`,
        initial: (item.expectedPayerName || item.title || "R")
          .trim()
          .charAt(0)
          .toUpperCase(),
        name: item.expectedPayerName || "Unassigned payer",
        note: item.title || "Payment request",
        amount: formatCurrency(item.amount),
        time: getTimeLabel(item.createdAt as string),
        status: String(item.status || "ACTIVE"),
      };

      if (section) {
        section.rows.push(row);
      } else {
        sections.push({ title, rows: [row] });
      }

      return sections;
    }, []);

  return (
    <AppShell withBottomTabs={false} contentClassName="px-0">
      <TopBar title="Activity" />
      <View className="pt-[17px]">
        {groupedSections.length ? (
          groupedSections.map((section, s) => (
            <View key={section.title} className={s ? "mt-[17px]" : ""}>
              <AppText font="SB" size={12} style={{ color: ThemeColors.sage }}>
                {section.title}
              </AppText>
              <Surface className="mt-[11px] rounded-[15px] border px-4">
                {section.rows.map((row, i) => (
                  <Pressable
                    key={row.id}
                    className={`h-[74px] flex-row items-center ${i ? "border-t border-mist" : ""}`}
                    onPress={() =>
                      router.push({
                        pathname: "/request/created",
                        params: {
                          id: row.id,
                          title: row.note,
                          amount: row.amount.replace("₦", ""),
                          description: "",
                          expectedPayerName: row.name,
                          reference: row.reference,
                          paymentUrl: row.link,
                          status: row.status,
                        },
                      })
                    }
                  >
                    <Avatar initial={row.initial} size={43} />
                    <View className="ml-[12px] flex-1">
                      <AppText
                        font="SSB"
                        size={14}
                        style={{ color: ThemeColors.deepGreen }}
                      >
                        {row.name}
                      </AppText>
                      <AppText
                        font="SR"
                        size={12}
                        style={{ color: ThemeColors.sage }}
                      >
                        {row.note}
                      </AppText>
                    </View>
                    <View className="items-end">
                      <AppText
                        font="SB"
                        size={15}
                        style={{ color: ThemeColors.primary }}
                      >
                        {row.amount}
                      </AppText>
                      <AppText
                        font="SR"
                        size={10}
                        style={{ color: ThemeColors.sage }}
                      >
                        {row.time}
                      </AppText>
                    </View>
                  </Pressable>
                ))}
              </Surface>
            </View>
          ))
        ) : (
          <View className="px-[19px]">
            <AppText font="SR" size={12} style={{ color: ThemeColors.sage }}>
              No payment requests yet.
            </AppText>
          </View>
        )}
      </View>
    </AppShell>
  );
}
