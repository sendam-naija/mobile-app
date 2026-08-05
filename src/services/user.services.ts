import { createApi } from "@reduxjs/toolkit/query/react";
import { rawBaseQuery } from ".";

export interface Bank {
  name: string;
  code?: string;
  slug?: string;
}

interface BanksResponse {
  data: Bank[];
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: rawBaseQuery,
  endpoints: (builder) => ({
    getAllBanks: builder.query<BanksResponse, void>({
      query: () => ({
        url: "users/banks",
      }),
    }),
    validateAccount: builder.mutation({
      query: (body) => ({
        url: "users/me/settlement-account/resolve",
        method: "POST",
        body,
      }),
    }),
    setSettlementBank: builder.mutation({
      query: (body) => ({
        url: "users/me/settlement-account",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllBanksQuery,
  useValidateAccountMutation,
  useSetSettlementBankMutation,
} = userApi;
