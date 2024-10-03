import { View, Text, FlatList, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../src/styles/theme";
import { useLocalSearchParams } from "expo-router";
import { useState, useMemo, useEffect } from "react";
import { Cocktail } from "../../src/types";

const Recipe = () => {
  const [recipe, setRecipe] = useState<Cocktail | null>(null);

  const { data } = useLocalSearchParams<{
    data: string;
  }>();

  const parsedRecipe: Cocktail | null = useMemo(() => {
    return data ? JSON.parse(data) : null;
  }, [data]);

  useEffect(() => {
    if (parsedRecipe) setRecipe(parsedRecipe);
  }, [parsedRecipe]);

  if (!data) {
    return (
      <Text style={styles.text}>
        Please select a drink from the Home or Search Tabs
      </Text>
    );
  }

  if (!recipe) {
    return <Text style={styles.text}>Error with Recipe</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={recipe.ingredients}
        keyExtractor={(item) => item}
        ListHeaderComponent={
          <Text style={styles.textBold} accessibilityRole="header">
            Ingredients:
          </Text>
        }
        renderItem={({ item }) => (
          <Text
            style={[styles.text, styles.listItem]}
            accessibilityLabel={`Ingredient: ${item}`}
          >
            {item}
          </Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Text style={styles.text}>
        <Text style={styles.textBold} accessibilityLabel="Method">
          Method:{" "}
        </Text>
        {recipe.method}
      </Text>
      <Text style={styles.text} accessibilityLabel="Glassware">
        <Text style={styles.textBold}>Glassware: </Text>
        {recipe.glassware}
      </Text>
      <Text style={styles.text} accessibilityLabel="Garnish">
        <Text style={styles.textBold}>Garnish: </Text>
        {recipe.garnish}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: "flex-start",
    padding: 28,
    gap: 28,
  },
  list: {
    margin: 0,
    padding: 0,
    flexGrow: 0,
  },
  listItem: {
    marginVertical: 12,
    marginHorizontal: 12,
    paddingVertical: 0,
  },
  separator: {
    borderBottomColor: COLORS.primary, // Bottom border color
    borderBottomWidth: 1, // Bottom border width
  },
  text: {
    fontFamily: FONTS.latoRegular,
    fontSize: SIZES.body_reg,
  },
  textBold: {
    fontFamily: FONTS.latoBold,
    fontSize: SIZES.body_bold,
  },
});

export default Recipe;
