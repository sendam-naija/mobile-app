import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASEURL = "https://sendam.onrender.com/api/v1/";

type RootState = {
  user?: {
    token?: string | null;
  };
};

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASEURL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const token = (getState() as RootState).user?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
