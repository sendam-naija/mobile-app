import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import userDetailsReducer from "./userDetails";
import { onboardingApi } from "@/services/onboarding.services";
import { paymentApi } from "@/services/payment.services";
import { userApi } from "@/services/user.services";

const rootReducer = combineReducers({
  user: userDetailsReducer,
  [onboardingApi.reducerPath]: onboardingApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      })
      .concat(onboardingApi.middleware)
      .concat(paymentApi.middleware)
      .concat(userApi.middleware),
});

export const persistor = persistStore(store);
