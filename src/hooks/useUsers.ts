import {
  useGetAllBanksQuery,
  useSetSettlementBankMutation,
} from "@/services/user.services";

const useUsers = () => {
  const {
    data: banks,
    isLoading: bankIsLoading,
    isError: bankIsError,
    error: bankError,
    refetch: bankRefetch,
  } = useGetAllBanksQuery();

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
  };
};

export default useUsers;
