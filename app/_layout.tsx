import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, createContext } from "react";
import { useFonts } from "expo-font";
import PeraltaRegular from "../assets/fonts/Peralta-Regular.ttf";
import LatoRegular from "../assets/fonts/Lato-Regular.ttf";
import LatoBold from "../assets/fonts/Lato-Bold.ttf";
import { Stack } from "expo-router";
import getCocktails from "../src/api/getCocktails";
import { Cocktail, CocktailsMapType } from "../src/types";

SplashScreen.preventAutoHideAsync();

export const cocktailProvider = createContext<CocktailsMapType>(null);

export default function Layout(): JSX.Element {
  const [fontsLoaded, fontError]: [boolean, Error | null] = useFonts({
    "Peralta-Regular": PeraltaRegular,
    "Lato-Regular": LatoRegular,
    "Lato-Bold": LatoBold,
  });
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [cocktailsContext, setCocktailsContext] =
    useState<CocktailsMapType>(null);
  const cocktailsMap = new Map<string, Cocktail>();

  useEffect(() => {
    async function prepare() {
      try {
        if (!cocktailsContext) {
          // Fetch cocktails
          const fetchedCocktails = await getCocktails();
          fetchedCocktails.forEach((cocktail) => {
            cocktailsMap.set(cocktail.name, cocktail);
          });
          await setCocktailsContext(cocktailsMap);
          console.log(
            "Cocktails in Layout.tsx:",
            cocktailsMap?.get("Agave Bravo"),
          );
          await new Promise((resolve) => setTimeout(resolve, 3000)); //lengthen the splash screen time
        }
      } catch (e) {
        console.error(e);
        throw e;
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [cocktailsContext]);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (fontError) throw fontError;

  return (
    <cocktailProvider.Provider value={cocktailsContext}>
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
    </cocktailProvider.Provider>
  );
}
