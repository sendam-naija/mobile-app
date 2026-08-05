import {
  useGetAllBanksQuery,
  useSetSettlementBankMutation,
  useValidateAccountMutation,
} from "@/services/user.services";

const useUsers = () => {
  const {
    data: banks,
    isLoading: bankIsLoading,
    isError: bankIsError,
    error: bankError,
    refetch: bankRefetch,
  } = useGetAllBanksQuery();

  const [validateAccount, { isLoading: validateAccountIsLoading }] =
    useValidateAccountMutation();

  const [setSettlementBank, { isLoading: setSettlementBankIsLoading }] =
    useSetSettlementBankMutation();
  return {
    banks: banks?.data ?? [],
    bankIsLoading,
    bankIsError,
    bankError,
    bankRefetch,
    setSettlementBank,
    setSettlementBankIsLoading,
    validateAccount,
    validateAccountIsLoading,
  };
};

export default useUsers;
