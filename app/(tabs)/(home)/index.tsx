import { FlatList, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../../src/styles/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Cocktail } from "../../../src/types";
import CocktailsBySpirit from "../../../src/components/cocktailsBySpirit";

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
  const { serializedCocktails } = useLocalSearchParams<{
    serializedCocktails: string;
  }>();
  // console.log("serializedCocktails in index.tsx:", !!serializedCocktails);

  const cocktails: Cocktail[] = JSON.parse(serializedCocktails);
  console.log("Cocktails in index.tsx:", cocktails[1].name);

  const filterCocktails = (spirit: string): string => {
    const filterArr = cocktails.filter(
      (cocktail) => cocktail.spirit === spirit,
    );
    return JSON.stringify(filterArr);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading} accessibilityRole="header">
          Choose a Spirit
        </Text>
      </View>
      <StatusBar style="auto" />
      <FlatList
        data={SPIRITS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CocktailsBySpirit
            item={item}
            handlePress={(): void => {
              router.navigate({
                pathname: "/spiritCategory",
                params: { spirit: item, data: filterCocktails(item) },
              });
            }}
          />
          // <TouchableOpacity
          //   style={styles.spiritBox}
          //   onPress={() => {
          //     handlePress(item);
          //   }}
          // >
          //   <Text style={styles.text}>{item}</Text>
          // </TouchableOpacity>
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
    // paddingHorizontal: 16,
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
