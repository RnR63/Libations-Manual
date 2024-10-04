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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

const Recipe = () => {
  const [recipe, setRecipe] = useState<Cocktail | null>(null);
  const { data } = useLocalSearchParams<{ data: string }>();

  const parsedRecipe: Cocktail | null = useMemo(() => {
    return data ? JSON.parse(data) : null;
  }, [data]);

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
    <SafeAreaView style={styles.safeAreaContainer}>
      <View>
        <Text style={styles.heading} accessibilityRole="header">
          Dynamic cocktail name
        </Text>
      </View>
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
        <TouchableOpacity style={styles.shareContainer} onPress={shareRecipe}>
          <FontAwesome name="share" size={24} color={"black"} />
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontFamily: FONTS.peralta,
    fontSize: SIZES.heading,
    alignSelf: "center",
    marginVertical: 4,
  },
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
  shareContainer: {
    flexDirection: "row",
  },
});

export default Recipe;
