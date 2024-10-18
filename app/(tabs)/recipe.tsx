import { useState, useMemo, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Share, ScrollView } from "react-native";
import { COLORS, FONTS, SIZES } from "../../src/styles/theme";
import { useLocalSearchParams } from "expo-router";
import { Cocktail } from "../../src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import ShareButton from "../../src/components/shareButton";
import IngredientsList from "../../src/components/ingredientsList";

const Recipe = () => {
  const [recipe, setRecipe] = useState<Cocktail | null>(null);
  const { data, value } = useLocalSearchParams<{
    data: string;
    value: string;
  }>();

  const parsedRecipe: Cocktail | null = useMemo(() => {
    return data ? JSON.parse(value) : null;
  }, [data, value]);

  useEffect(() => {
    if (parsedRecipe) setRecipe(parsedRecipe);
  }, [parsedRecipe]);

  const shareRecipe = async () => {
    if (!recipe) return;

    try {
      const message = `Check out this recipe from the Libations Manual: ${recipe.name}!\n\nIngredients:\n${recipe.ingredients.join("\n")}\n\nMethod: ${recipe.method}\n\nGlassware: ${recipe.glassware}\n\nGarnish: ${recipe.garnish}`;
      await Share.share({
        message: message,
        title: `${recipe.name} Recipe`,
      });
    } catch (e) {
      console.error("Error sharing view:", e);
      Alert.alert("Error", "Failed to share the recipe. Please try again.");
    }
  };

  if (!data) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Please select a drink from the Home or Search Tabs
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error with recipe</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.safeAreaContainer}>
      <ScrollView
        style={styles.recipeContainer}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.text}>
          <Text style={styles.textBold} accessibilityLabel="Cocktail_Name">
            Cocktail:{" "}
          </Text>
          {data}
        </Text>
        <IngredientsList ingredients={recipe.ingredients} />
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
      </ScrollView>
      <View style={styles.horizontalLine} />
      <View style={styles.shareContainer}>
        <ShareButton item={data} handlePress={shareRecipe} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 16,
  },
  heading: {
    fontFamily: FONTS.peralta,
    fontSize: SIZES.heading,
    alignSelf: "center",
    marginVertical: 4,
  },
  recipeContainer: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  scrollViewContent: {
    justifyContent: "flex-start",
    padding: 20,
    gap: 28,
  },
  errorContainer: {
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: "center",
    padding: 28,
    gap: 28,
  },
  errorText: {
    fontFamily: FONTS.latoRegular,
    fontSize: SIZES.body_reg,
    textAlign: "center",
  },
  list: {
    margin: 0,
    padding: 0,
    flexGrow: 0,
  },
  scrollIndicator: {
    borderWidth: 1,
    borderColor: "red",
    alignSelf: "flex-end",
  },
  listItem: {
    marginVertical: 12,
    marginHorizontal: 12,
    paddingVertical: 0,
  },
  separator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: FONTS.latoRegular,
    fontSize: SIZES.body_reg,
  },
  textBold: {
    fontFamily: FONTS.latoBold,
    fontSize: SIZES.body_bold,
  },
  horizontalLine: {
    borderBottomColor: "rgba(255, 255, 255, 0.4)",
    borderBottomWidth: 1,
    marginVertical: 10,
    shadowColor: COLORS.text_dark,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.9,
    shadowRadius: 4.4,
    elevation: 3,
  },
  shareContainer: {
    padding: 0,
    backgroundColor: COLORS.background,
    elevation: 3,
  },
});

export default Recipe;
