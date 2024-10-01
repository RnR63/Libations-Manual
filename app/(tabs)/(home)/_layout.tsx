import { Stack, useLocalSearchParams } from "expo-router";
import { Cocktail } from '../../../src/types';

export default function Layout() {
  const { serializedCocktails } = useLocalSearchParams<{
    serializedCocktails: string;
  }>();
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
  // const router = useRouter();
  // const newRouter = router();
  // console.log("serialized Cocktails in index.tsx:", serializedCocktails);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Spirits" }}
        initialParams={{ serializedCocktails: JSON.stringify(cocktails) }}
      />
      <Stack.Screen
        name="spiritCategory"
        options={{
          title: "spiritCategory",
          headerBackTitle: "Back",
        }}
        initialParams={{ serializedCocktails: JSON.stringify(cocktails) }}
      />
    </Stack>
  );
}
