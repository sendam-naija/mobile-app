import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import userDetailsReducer from "./userDetails";
import { onboardingApi } from "@/services/onboarding.services";

const rootReducer = combineReducers({
  user: userDetailsReducer,
  [onboardingApi.reducerPath]: onboardingApi.reducer,
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
    }).concat(onboardingApi.middleware),
});

export const persistor = persistStore(store);
