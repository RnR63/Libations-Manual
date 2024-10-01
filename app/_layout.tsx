import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import PeraltaRegular from "../assets/fonts/Peralta-Regular.ttf";
import LatoRegular from "../assets/fonts/Lato-Regular.ttf";
import LatoBold from "../assets/fonts/Lato-Bold.ttf";
import { Stack } from "expo-router";
import getCocktails from "../src/api/getCocktails";
import { Cocktail } from "../src/types";

SplashScreen.preventAutoHideAsync();

export default function Layout(): JSX.Element {
  const [fontsLoaded, fontError]: [boolean, Error | null] = useFonts({
    "Peralta-Regular": PeraltaRegular,
    "Lato-Regular": LatoRegular,
    "Lato-Bold": LatoBold,
  });
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Fetch cocktails
        const fetchedCocktails = await getCocktails();
        setCocktails(fetchedCocktails);
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (fontError) throw fontError;

  return (
    <>
      {appIsReady && fontsLoaded ? (
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              animation: "fade",
            }}
            initialParams={{ serializedCocktails: JSON.stringify(cocktails) }}
          />
        </Stack>
      ) : null}
    </>
  );
}
