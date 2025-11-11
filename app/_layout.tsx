import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import PeraltaRegular from "../assets/fonts/Peralta-Regular.ttf";
import LatoRegular from "../assets/fonts/Lato-Regular.ttf";
import LatoBold from "../assets/fonts/Lato-Bold.ttf";
import { Stack } from "expo-router";
import {
  CocktailProvider,
  useCocktailContext,
} from "../src/context/CocktailContext";

SplashScreen.preventAutoHideAsync();

export default function Layout(): JSX.Element {
  const [fontsLoaded, fontError]: [boolean, Error | null] = useFonts({
    "Peralta-Regular": PeraltaRegular,
    "Lato-Regular": LatoRegular,
    "Lato-Bold": LatoBold,
  });

  if (fontError) throw fontError;

  return (
    <CocktailProvider>
      <AppContent fontsLoaded={fontsLoaded} />
    </CocktailProvider>
  );
}

function AppContent({ fontsLoaded }: { fontsLoaded: boolean }) {
  const { cocktails, isLoading } = useCocktailContext();

  useEffect(() => {
    if (fontsLoaded && cocktails) {
      SplashScreen.hideAsync();
    }
  }, [cocktails, fontsLoaded]);

  return !isLoading && fontsLoaded ? (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack>
  ) : null;
}
