import { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../src/styles/theme";
import { useLocalSearchParams } from "expo-router";
import { Cocktail } from "../../src/types";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import ShareButton from "../../src/components/shareButton";

const Recipe = () => {
  const [recipe, setRecipe] = useState<Cocktail | null>(null);
  const { data, value } = useLocalSearchParams<{
    data: string;
    value: string;
  }>();

  const parsedRecipe: Cocktail | null = useMemo(() => {
    return data ? JSON.parse(value) : null;
  }, [data, value]);
  console.log("in recipe.tsx");

  useEffect(() => {
    if (parsedRecipe) setRecipe(parsedRecipe);
  }, [parsedRecipe]);

  const shareRecipe = async () => {
    if (!recipe) return;

    try {
      const message = `Check out this recipe from the Libations Manual: ${recipe.name}!\n\nIngredients:\n${recipe.ingredients.join("\n")}\n\nMethod: ${recipe.method}\n\nGlassware: ${recipe.glassware}\n\nGarnish: ${recipe.garnish}`;
      const result = await Share.share({
        message: message,
        title: `${recipe.name} Recipe`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with activity type:`, result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (e) {
      console.error("Error sharing view:", e);
      Alert.alert("Error", "Failed to share the recipe. Please try again.");
    }
  };

  const listStyle = useMemo(() => {
    const ingredientCount = recipe?.ingredients?.length ?? 0;
    return {
      ...styles.list,
      maxHeight: ingredientCount > 4 ? 286 : 250,
    };
  }, [recipe?.ingredients]);

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
      <View style={styles.recipeContainer}>
        <Text style={styles.text}>
          <Text style={styles.textBold} accessibilityLabel="Cocktail_Name">
            Cocktail:{" "}
          </Text>
          {data}
        </Text>
        <FlatList
          style={[styles.list, listStyle]}
          data={recipe.ingredients}
          keyExtractor={(item) => item}
          ListHeaderComponent={
            <Text style={styles.textBold} accessibilityRole="header">
              Ingredients:
            </Text>
          }
          // renderItem={toggleScrollIndicator}
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
        {/* <Text style={styles.scrollIndicator}>
          <Entypo
            name="chevron-thin-down"
            size={24}
            color={COLORS.primary}
            accessibilityLabel="Scroll down for more ingredients"
          />
        </Text> */}
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
      <View>
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
    // borderWidth: 1,
    // borderColor: "red",
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
    // maxHeight: 250,
    // borderWidth: 1,
    // borderColor: "blue",
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
  shareContainer: {
    flexDirection: "row",
  },
});

export default Recipe;
