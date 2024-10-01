import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useState } from "react";
import { useFonts } from "expo-font";
import PeraltaRegular from "../assets/fonts/Peralta-Regular.ttf";
import LatoRegular from "../assets/fonts/Lato-Regular.ttf";
import LatoBold from "../assets/fonts/Lato-Bold.ttf";
import { Stack } from "expo-router";
import getCocktails from "../src/api/getCocktails";
import { Cocktail } from "../src/types";
import { View } from "react-native";

export default function Layout(): JSX.Element {
  const [fontsLoaded]: [boolean, Error | null] = useFonts({
    "Peralta-Regular": PeraltaRegular,
    "Lato-Regular": LatoRegular,
    "Lato-Bold": LatoBold,
  });
  const [appIsReady, setAppIsReady] = useState(true);
  // const [loading, setLoading] = useState(true);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  // useEffect((): void => {
  //   getCocktails().then((data) => {
  //     setCocktails(data);
  //   });
  // }, []);

  // const loadSplashScreen = useCallback(async (): Promise<void> => {
  //   if (fontsLoaded && cocktails.length > 0) {
  //     await new Promise<void>((resolve) => setTimeout(resolve, 3000));
  //     await SplashScreen.hideAsync();
  //     setLoading(false);
  //   }
  // }, [fontsLoaded, cocktails]);

  // useEffect((): void => {
  //   loadSplashScreen();
  // }, [loadSplashScreen]);

  // useEffect((): void => {
  //   if (!loading && !fontsLoaded) {
  //     console.error("Fonts not loaded");
  //   }
  //   if (!loading && cocktails.length === 0) {
  //     console.error("Cocktails not loaded");
  //   }
  // }, [loading, fontsLoaded, cocktails]);

  // console.log("cocktails is loaded:", cocktails[0]);
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Fetch cocktails
        const fetchedCocktails = await getCocktails();
        setCocktails(fetchedCocktails);

        // Wait for fonts to load
        await new Promise<void>((resolve) => {
          if (fontsLoaded) {
            resolve();
          } else {
            const interval = setInterval(() => {
              if (fontsLoaded) {
                clearInterval(interval);
                resolve();
              }
            }, 100);
          }
        });

        // Add a 3-second delay
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    console.error("App is not ready");
  }

  return (
<<<<<<< HEAD
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack>
=======
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, animation: "fade" }}
          // pass initial params here
          initialParams={{ cocktails }}
        />
      </Stack>
    </View>
>>>>>>> f8c54045a2c1524767db1701af1441e330fe566a
  );
}
