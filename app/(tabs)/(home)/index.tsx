import { FlatList, StyleSheet, Text, View } from "react-native";
// import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../../src/styles/theme";
import { useRouter } from "expo-router";
import { Store } from "../../../src/types";
import CocktailsBySpiritButton from "../../../src/components/cocktailsBySpiritButton";
import useStore from "../../../src/data/store/cocktailStore";

const SPIRITS: string[] = [
  "Vodka",
  "Gin",
  "Rum",
  "Tequila",
  "Mezcal",
  "Bourbon",
  "Rye",
  "Scotch",
  "Irish",
  "Japanese",
  "Misc",
];
export default function App(): JSX.Element {
  const router = useRouter();

  const cocktails = useStore((state: Store) => state.cocktails);
  console.log("Cocktails in index.tsx:", cocktails?.get("agave bravo"));

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading} accessibilityRole="header">
          Choose a Spirit
        </Text>
      </View>
      <FlatList
        data={SPIRITS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CocktailsBySpiritButton
            item={item}
            handlePress={(): void => {
              router.navigate({
                pathname: "/spiritCategory",
                params: { spirit: item },
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontFamily: FONTS.peralta,
    fontSize: SIZES.heading,
    alignSelf: "center",
    marginVertical: 4,
  },
  spiritBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 18,
  },
  text: {
    color: COLORS.text_white,
    fontFamily: FONTS.peralta,
    fontSize: SIZES.body_reg,
  },
});
