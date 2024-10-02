import { Stack, useLocalSearchParams } from "expo-router";
// import { Cocktail } from "../../../src/types";

export default function Layout() {
  const { serializedCocktails } = useLocalSearchParams<{
    serializedCocktails: string;
  }>();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
        initialParams={{ serializedCocktails }}
      />
      <Stack.Screen
        name="spiritCategory"
        options={{
          title: "spiritCategory",
          headerBackTitle: "Back",
        }}
        initialParams={{ serializedCocktails }}
      />
    </Stack>
  );
}
