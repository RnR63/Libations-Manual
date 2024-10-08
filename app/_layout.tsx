import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import PeraltaRegular from "../assets/fonts/Peralta-Regular.ttf";
import LatoRegular from "../assets/fonts/Lato-Regular.ttf";
import LatoBold from "../assets/fonts/Lato-Bold.ttf";
import { Stack } from "expo-router";
import getCocktails from "../src/api/getCocktails";
import { Cocktail } from "../src/types";
import useStore from "../src/data/store/cocktailStore";

SplashScreen.preventAutoHideAsync();

export default function Layout(): JSX.Element {
  const [fontsLoaded, fontError]: [boolean, Error | null] = useFonts({
    "Peralta-Regular": PeraltaRegular,
    "Lato-Regular": LatoRegular,
    "Lato-Bold": LatoBold,
  });
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const cocktailsMap = new Map<string, Cocktail>();
  const setCocktails = useStore((state) => state.updateCocktails);

  useEffect(() => {
    async function prepare() {
      try {
        // Fetch cocktails
        const fetchedCocktails = await getCocktails();
        fetchedCocktails.forEach((cocktail) => {
          cocktailsMap.set(cocktail.name, cocktail);
        });
        await setCocktails(cocktailsMap);
        console.log(
          "Cocktails in Layout.tsx:",
          cocktailsMap?.get("Agave Bravo"),
        );
        await new Promise((resolve) => setTimeout(resolve, 3000)); //lengthen the splash screen time
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
          />
        </Stack>
      ) : null}
    </>
  );
}
