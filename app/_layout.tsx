import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useState } from "react";
import { useFonts } from "expo-font";
import PeraltaRegular from "../assets/fonts/Peralta-Regular.ttf";
import LatoRegular from "../assets/fonts/Lato-Regular.ttf";
import LatoBold from "../assets/fonts/Lato-Bold.ttf";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs, Stack } from "expo-router";
import { COLORS } from "../styles/theme";

export default function Layout(): JSX.Element {
  const [fontsLoaded, _]: [boolean, Error | null] = useFonts({
    "Peralta-Regular": PeraltaRegular,
    "Lato-Regular": LatoRegular,
    "Lato-Bold": LatoBold,
  });
  const [loading, setLoading] = useState(true);

  const loadSplashScreen = useCallback(async (): Promise<void> => {
    if (fontsLoaded) {
      await new Promise<void>((resolve) => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
      setLoading(false);
    }
  }, [fontsLoaded]);

  useEffect((): void => {
    loadSplashScreen();
  }, [loadSplashScreen]);

  useEffect(() => {
    if (!loading && !fontsLoaded) {
      console.error("Fonts not loaded");
    }
  }, [loading, fontsLoaded]);

  // if (error) {
  //   console.error(error);
  // }
  // if (!fontsLoaded) {
  //   console.error("Fonts not loaded");
  // }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
}
