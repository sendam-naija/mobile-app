import React, { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

import { TopBar } from "@/components/app/TopBar";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { FormAppInput } from "@/components/ui/FormAppInput";
import { ThemeColors } from "@/constant/theme";
import useUsers from "@/hooks/useUsers";

interface BankAccountFormValues {
  bank: string;
  bankSearch: string;
  accountNumber: string;
}

interface SettleBankPayload {
  bankCode: string;
  accountNumber: string;
}

export default function BankAccountSettingsScreen() {
  const [open, setOpen] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [resolvedName, setResolvedName] = useState("");
  const [pendingPayload, setPendingPayload] =
    useState<SettleBankPayload | null>(null);
  const {
    banks: allBanks,
    validateAccount,
    validateAccountIsLoading,
    setSettlementBank,
    setSettlementBankIsLoading,
  } = useUsers();
  const { control, handleSubmit, setValue } = useForm<BankAccountFormValues>({
    defaultValues: {
      bank: "",
      bankSearch: "",
      accountNumber: "",
    },
  });
  const bank = useWatch({ control, name: "bank" });
  const bankSearch = useWatch({ control, name: "bankSearch" });
  const accountNumber = useWatch({ control, name: "accountNumber" });

  const filteredBanks = useMemo(() => {
    const searchTerm = bankSearch.trim().toLowerCase();

    if (!searchTerm) {
      return allBanks;
    }

    return allBanks.filter((item) =>
      item.name.toLowerCase().includes(searchTerm),
    );
  }, [allBanks, bankSearch]);

  const selectedBank = allBanks.find((item) => item.name === bank);

  const extractResolvedName = (response: unknown) => {
    const result = response as {
      data?: {
        accountName?: string;
        account_name?: string;
        name?: string;
      };
      accountName?: string;
      account_name?: string;
      name?: string;
    };

    return (
      result?.data?.accountName ??
      result?.data?.account_name ??
      result?.data?.name ??
      result?.accountName ??
      result?.account_name ??
      result?.name ??
      ""
    );
  };

  const onSubmit = async (values: BankAccountFormValues) => {
    if (!selectedBank?.code) {
      return;
    }

    const payload = {
      bankCode: selectedBank.code,
      accountNumber: values.accountNumber,
    };

    try {
      const response = await validateAccount(payload).unwrap();
      setResolvedName(extractResolvedName(response));
      setPendingPayload(payload);
      setIsConfirmVisible(true);
    } catch (error) {
      console.log("Failed to validate account", error);
    }
  };

  const continueLinking = async () => {
    if (!pendingPayload) {
      return;
    }

    try {
      await setSettlementBank(pendingPayload).unwrap();
      setIsConfirmVisible(false);
      setPendingPayload(null);
    } catch (error) {
      console.log("Failed to set settlement account", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar
        title="Bank Accounts"
        showBack
        onBackPress={() => router.back()}
      />
      <ScrollView
        className="px-[19px]"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingTop: 17, paddingBottom: 28 }}
      >
        <AppText
          font="SR"
          size={15}
          style={{ color: ThemeColors.sage, lineHeight: 21 }}
        >
          Link your bank account to receive payouts from your payment requests.
        </AppText>
        <AppText
          font="SM"
          size={14}
          className="mb-[7px] mt-[22px]"
          style={{ color: ThemeColors.deepGreen }}
        >
          Bank
        </AppText>
        <Pressable
          className="h-[57px] flex-row items-center justify-between rounded-[14px] border-2 px-[15px]"
          style={{
            borderColor: ThemeColors.primary,
            backgroundColor: ThemeColors.snow,
          }}
          onPress={() => setOpen(!open)}
        >
          <AppText font="SM" size={17} style={{ color: ThemeColors.deepGreen }}>
            {selectedBank?.name ?? "Select Bank"}
          </AppText>
          <AppText style={{ color: ThemeColors.primary }}>✓</AppText>
        </Pressable>
        {open ? (
          <View className="mt-[5px] rounded-[14px] border border-mist px-[10px] pb-[8px]">
            <FormAppInput
              control={control}
              name="bankSearch"
              placeholder="Search banks..."
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={{ marginTop: 8 }}
            />
            {filteredBanks.map((b) => (
              <Pressable
                key={b.code ?? b.name}
                className="h-[38px] flex-row items-center justify-between border-t border-mist px-[14px]"
                onPress={() => {
                  setValue("bank", b.name, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setValue("bankSearch", "", {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setOpen(false);
                }}
              >
                <AppText
                  font={b.name === bank ? "SM" : "SR"}
                  size={14}
                  style={{
                    color:
                      b.name === bank
                        ? ThemeColors.primary
                        : ThemeColors.deepGreen,
                  }}
                >
                  {b.name}
                </AppText>
                {b.name === bank ? (
                  <AppText style={{ color: ThemeColors.primary }}>✓</AppText>
                ) : null}
              </Pressable>
            ))}
            {filteredBanks.length === 0 ? (
              <View className="items-center px-[14px] py-[16px]">
                <AppText
                  font="SR"
                  size={13}
                  style={{ color: ThemeColors.sage }}
                >
                  No banks found
                </AppText>
              </View>
            ) : null}
          </View>
        ) : null}
        <AppText
          font="SM"
          size={14}
          className="mb-[7px] mt-[13px]"
          style={{ color: ThemeColors.deepGreen }}
        >
          Account Number
        </AppText>
        <FormAppInput
          control={control}
          name="accountNumber"
          keyboardType="number-pad"
          placeholder="10-digit account number"
          formatValue={(value) => value.replace(/\D/g, "").slice(0, 10)}
        />
        <View className="mt-[16px]">
          <AppButton
            title="Link Bank Account"
            disabled={!selectedBank?.code || accountNumber.length !== 10}
            loading={validateAccountIsLoading || setSettlementBankIsLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent
        visible={isConfirmVisible}
        onRequestClose={() => setIsConfirmVisible(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/40 px-[19px]"
          onPress={() => setIsConfirmVisible(false)}
        >
          <Pressable
            className="w-full rounded-[22px] bg-white px-[18px] py-[22px]"
            onPress={() => undefined}
          >
            <AppText
              font="SB"
              size={20}
              style={{ color: ThemeColors.deepGreen }}
            >
              Confirm account name
            </AppText>
            <AppText
              font="SR"
              size={14}
              className="mt-[10px]"
              style={{ color: ThemeColors.sage, lineHeight: 20 }}
            >
              Please confirm this is your name before we link the bank account.
            </AppText>
            <View
              className="mt-[18px] rounded-[16px] px-[14px] py-[16px]"
              style={{ backgroundColor: ThemeColors.snow }}
            >
              <AppText
                font="SR"
                size={12}
                style={{ color: ThemeColors.sage }}
              >
                Name on account
              </AppText>
              <AppText
                font="SB"
                size={17}
                className="mt-[4px]"
                style={{ color: ThemeColors.deepGreen }}
              >
                {resolvedName || "Account holder name unavailable"}
              </AppText>
            </View>
            <View className="mt-[18px] gap-[10px]">
              <AppButton
                title="Continue"
                onPress={continueLinking}
                loading={setSettlementBankIsLoading}
              />
              <Pressable
                className="h-[56px] items-center justify-center rounded-full border"
                style={{ borderColor: ThemeColors.mist }}
                onPress={() => setIsConfirmVisible(false)}
              >
                <AppText
                  font="SM"
                  size={16}
                  style={{ color: ThemeColors.deepGreen }}
                >
                  Dismiss
                </AppText>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
