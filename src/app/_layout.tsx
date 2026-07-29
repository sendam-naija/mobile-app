import "../global.css";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SoraR: require("../../assets/fonts/Sora/Sora-Regular.ttf"),
    SoraB: require("../../assets/fonts/Sora/Sora-Bold.ttf"),
    SoraSB: require("../../assets/fonts/Sora/Sora-SemiBold.ttf"),
    SoraM: require("../../assets/fonts/Sora/Sora-Medium.ttf"),
    SoraL: require("../../assets/fonts/Sora/Sora-Light.ttf"),
    SoraEL: require("../../assets/fonts/Sora/Sora-ExtraLight.ttf"),
    SoraEB: require("../../assets/fonts/Sora/Sora-ExtraBold.ttf"),
    SoraT: require("../../assets/fonts/Sora/Sora-Thin.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Slot />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
