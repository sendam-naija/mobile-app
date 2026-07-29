import React, { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { TopBar } from "@/components/app/TopBar";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { ThemeColors } from "@/constant/theme";

const banks = ["GTBank", "Access Bank", "Zenith Bank"];
export default function BankAccountSettingsScreen() {
  const [bank, setBank] = useState("GTBank"); const [account, setAccount] = useState(""); const [open, setOpen] = useState(true);
  return <SafeAreaView className="flex-1 bg-white"><TopBar title="Bank Accounts" showBack onBackPress={() => router.replace("/profile")} /><ScrollView className="px-[19px]" keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingTop: 17, paddingBottom: 28 }}>
    <AppText font="SR" size={15} style={{ color: ThemeColors.sage, lineHeight: 21 }}>Link your bank account to receive payouts from your payment requests.</AppText>
    <AppText font="SM" size={14} className="mb-[7px] mt-[22px]" style={{ color: ThemeColors.deepGreen }}>Bank</AppText><Pressable className="h-[57px] flex-row items-center justify-between rounded-[14px] border-2 px-[15px]" style={{ borderColor: ThemeColors.primary, backgroundColor: ThemeColors.snow }} onPress={() => setOpen(!open)}><AppText font="SB" size={17} style={{ color: ThemeColors.deepGreen }}>{bank}</AppText><AppText style={{ color: ThemeColors.primary }}>✓</AppText></Pressable>
    {open ? <View className="mt-[5px] rounded-[14px] border border-mist px-[10px] pb-[8px]"><TextInput placeholder="Search banks..." placeholderTextColor={ThemeColors.sage} className="my-[8px] h-[40px] rounded-[10px] px-[14px] font-SR" style={{ backgroundColor: ThemeColors.snow }} />{banks.map(b => <Pressable key={b} className="h-[38px] flex-row items-center justify-between border-t border-mist px-[14px]" onPress={() => { setBank(b); setOpen(false); }}><AppText font={b === bank ? "SB" : "SR"} size={14} style={{ color: b === bank ? ThemeColors.primary : ThemeColors.deepGreen }}>{b}</AppText>{b === bank ? <AppText style={{ color: ThemeColors.primary }}>✓</AppText> : null}</Pressable>)}</View> : null}
    <AppText font="SM" size={14} className="mb-[7px] mt-[13px]" style={{ color: ThemeColors.deepGreen }}>Account Number</AppText><TextInput value={account} onChangeText={v => setAccount(v.replace(/\D/g, "").slice(0, 10))} keyboardType="number-pad" placeholder="10-digit account number" placeholderTextColor={ThemeColors.sage} className="h-[58px] rounded-[14px] border border-mist px-[15px] font-SR text-[16px]" style={{ backgroundColor: ThemeColors.snow, color: ThemeColors.deepGreen }} />
    <View className="mt-[14px] flex-row rounded-[14px] border px-[14px] py-[12px]" style={{ borderColor: ThemeColors.aquaMint, backgroundColor: ThemeColors.mint }}><AppText>ℹ️</AppText><AppText font="SR" size={12} className="ml-[10px]" style={{ color: ThemeColors.primary }}>Payouts go to this account.{"\n"}Secured by Paystack.</AppText></View><View className="mt-[16px]"><AppButton title="Link Bank Account" disabled={account.length !== 10} /></View>
  </ScrollView></SafeAreaView>;
}
