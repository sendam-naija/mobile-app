import { createApi } from "@reduxjs/toolkit/query/react";

import { rawBaseQuery } from ".";

export interface PaymentRequest {
  id: string;
  reference?: string;
  title?: string;
  amount?: number;
  currency?: string;
  description?: string;
  expectedPayerName?: string;
  allowMultiplePayers?: boolean;
  status?: string;
  expiresAt?: string;
  link?: string;
  createdAt?: string;
  [key: string]: unknown;
}

export interface CreatePaymentRequestPayload {
  title: string;
  amount: number;
  description: string;
  expectedPayerName: string;
  allowMultiplePayers: boolean;
  expiresAt: string;
}

interface PaymentRequestsResponse {
  data: PaymentRequest[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

interface PaymentRequestResponse {
  data: PaymentRequest;
}

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: rawBaseQuery,
  endpoints: (builder) => ({
    createPaymentRequest: builder.mutation<
      PaymentRequestResponse,
      CreatePaymentRequestPayload
    >({
      query: (body) => ({
        url: "payment-requests",
        method: "POST",
        body,
      }),
    }),
    getPaymentRequests: builder.query<
      PaymentRequestsResponse,
      { status?: string; page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: "payment-requests",
        params: params ?? undefined,
      }),
    }),
    getPaymentRequest: builder.query<PaymentRequestResponse, string>({
      query: (id) => ({
        url: `payment-requests/${id}`,
      }),
    }),
    cancelPaymentRequest: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `payment-requests/${id}/cancel`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreatePaymentRequestMutation,
  useGetPaymentRequestsQuery,
  useGetPaymentRequestQuery,
  useCancelPaymentRequestMutation,
} = paymentApi;
