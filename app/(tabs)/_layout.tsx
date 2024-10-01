import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import PeraltaRegular from "../../assets/fonts/Peralta-Regular.ttf";
import LatoRegular from "../../assets/fonts/Lato-Regular.ttf";
import LatoBold from "../../assets/fonts/Lato-Bold.ttf";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs, UnknownOutputParams, useLocalSearchParams } from "expo-router";
import { Cocktail } from "../../src/types";
import { COLORS } from "../../src/styles/theme";
// import cocktails from "../../src/data/cocktails";

export default function Layout(): JSX.Element {
  const params = useLocalSearchParams<{ serializedCocktails: string }>();
  let cocktails: Cocktail[] = [];

  if (params.serializedCocktails) {
    try {
      cocktails = JSON.parse(params.serializedCocktails);
    } catch (error) {
      console.error("Error parsing cocktails:", error);
    }
  }

  console.log("Cocktails in tabs layout", cocktails[29].name);

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
        initialParams={{ serializedCocktails: JSON.stringify(cocktails) }}
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
