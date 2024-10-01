// import { useEffect, useCallback } from "react";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs, useLocalSearchParams } from "expo-router";
import { Cocktail } from "../../src/types";
import { COLORS } from "../../src/styles/theme";

export default function Layout(): JSX.Element {
  const { serializedCocktails } = useLocalSearchParams<{ serializedCocktails: string }>();
  // const params = useLocalSearchParams<{ serializedCocktails: string }>();
  let cocktails: Cocktail[] = [];

  if (serializedCocktails) {
    try {
      cocktails = JSON.parse(serializedCocktails);
      // console.log("Cocktails after parsing in tabs layout", cocktails[0]);
    } catch (error) {
      console.error("Error parsing cocktails:", error);
    }
  }

  console.log("Cocktails in tabs layout", cocktails[9].name);

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
        // initialParams={{ cocktails }}
        // initialParams={{ serializedCocktails }}
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

    // <>
    //   {cocktails.length > 0 ? (
    //     <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.primary }}>
    //       <Tabs.Screen
    //         name="(home)"
    //         options={{
    //           title: "Home",
    //           headerShown: false,
    //           tabBarShowLabel: false,
    //           tabBarIcon: ({ color, size }) => (
    //             <Entypo name="home" size={size} color={color} />
    //           ),
    //         }}
    //         // initialParams={{ serializedCocktails: JSON.stringify(cocktails) }}
    //       />
    //       <Tabs.Screen
    //         name="search"
    //         options={{
    //           title: "Search",
    //           tabBarShowLabel: false,
    //           tabBarIcon: ({ color, size }) => (
    //             <Feather name="search" size={size} color={color} />
    //           ),
    //         }}
    //       />
    //       <Tabs.Screen
    //         name="recipe"
    //         options={{
    //           title: "Current Recipe",
    //           tabBarShowLabel: false,
    //           tabBarIcon: ({ color, size }) => (
    //             <Entypo name="list" size={size} color={color} />
    //           ),
    //         }}
    //       />
    //     </Tabs>
    //   ) : null}
    // </>
  );
}
