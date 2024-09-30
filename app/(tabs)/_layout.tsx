import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import PeraltaRegular from "../../assets/fonts/Peralta-Regular.ttf";
import LatoRegular from "../../assets/fonts/Lato-Regular.ttf";
import LatoBold from "../../assets/fonts/Lato-Bold.ttf";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import { COLORS } from "../../src/styles/theme";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Layout(): JSX.Element {
  // const [fontsLoaded, error]: [boolean, Error | null] = useFonts({
  //   "Peralta-Regular": PeraltaRegular,
  //   "Lato-Regular": LatoRegular,
  //   "Lato-Bold": LatoBold,
  // });
  // if (error) {
  //   console.error(error);
  // }
  // if (!fontsLoaded) {
  //   console.error("Fonts not loaded");
  // }

  // const loadSplashScreen: () => Promise<void> =
  //   useCallback(async (): Promise<void> => {
  //     if (fontsLoaded) {
  //       await new Promise<void>((resolve) => setTimeout(resolve, 3000));
  //       await SplashScreen.hideAsync();
  //     }
  //   }, [fontsLoaded]);

  // useEffect((): void => {
  //   loadSplashScreen();
  // }, [loadSplashScreen]);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.primary }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          title: "Current Recipe",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
