import { View, Text, FlatList, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../styles/theme";

const CocktailPage = ({ route }) => {
  const { cocktail } = route.params;
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={cocktail.ingredients}
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
        {cocktail.method}
      </Text>
      <Text style={styles.text} accessibilityLabel="Glassware">
        <Text style={styles.textBold}>Glassware: </Text>
        {cocktail.glassware}
      </Text>
      <Text style={styles.text} accessibilityLabel="Garnish">
        <Text style={styles.textBold}>Garnish: </Text>
        {cocktail.garnish}
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
    borderBottomWidth: 1,      // Bottom border width
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

export default CocktailPage;
