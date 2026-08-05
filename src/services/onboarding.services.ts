import { createApi } from "@reduxjs/toolkit/query/react";
import { rawBaseQuery } from ".";

export const onboardingApi = createApi({
  reducerPath: "onboarding",
  baseQuery: rawBaseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
    }),
    logIn: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    otpRequest: builder.mutation({
      query: (body) => ({
        url: "auth/otp/request",
        method: "POST",
        body,
      }),
    }),
    otpVerify: builder.mutation({
      query: (body) => ({
        url: "auth/otp/verify",
        method: "POST",
        body,
      }),
    }),
    tokenRotation: builder.mutation({
      query: (body) => ({
        url: "auth/refresh",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useOtpRequestMutation,
  useOtpVerifyMutation,
  useTokenRotationMutation,
} = onboardingApi;
