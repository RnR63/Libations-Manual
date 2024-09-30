import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useState } from "react";
import { useFonts } from "expo-font";
import PeraltaRegular from "../assets/fonts/Peralta-Regular.ttf";
import LatoRegular from "../assets/fonts/Lato-Regular.ttf";
import LatoBold from "../assets/fonts/Lato-Bold.ttf";
import { Tabs, Stack } from "expo-router";
import { COLORS } from "../src/styles/theme";
import getCocktails from "../src/api/getCocktails";

interface Cocktail {
  name: string;
  spirit: string;
  ingredients: string[];
  method: string;
  glassware: string;
  garnish: string;
}

export default function Layout(): JSX.Element {
  const [fontsLoaded, _]: [boolean, Error | null] = useFonts({
    "Peralta-Regular": PeraltaRegular,
    "Lato-Regular": LatoRegular,
    "Lato-Bold": LatoBold,
  });
  const [loading, setLoading] = useState(true);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect((): void => {
    getCocktails().then((data) => {
      setCocktails(data);
    });
  }, []);

  const loadSplashScreen = useCallback(async (): Promise<void> => {
    if (fontsLoaded && cocktails.length > 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
      setLoading(false);
    }
  }, [fontsLoaded, cocktails]);

  useEffect((): void => {
    loadSplashScreen();
  }, [loadSplashScreen]);

  useEffect((): void => {
    if (!loading && !fontsLoaded) {
      console.error("Fonts not loaded");
    }
  }, [loading, fontsLoaded]);

  console.log("cocktails is loaded:", cocktails[0]);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
}
