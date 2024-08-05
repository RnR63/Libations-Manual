import { View, Text, FlatList, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../styles/theme";

const CocktailPage = ({ route }) => {
  const { cocktail } = route.params;
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={cocktail.ingredients}
        keyExtractor={(item) => item}
        ListHeaderComponent={<Text style={styles.textBold}>Ingredients:</Text>}
        renderItem={({ item }) => (
          <Text style={[styles.text, styles.listItem]}>{item}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
          <Text style={styles.text}>
        <Text style={styles.textBold}>Method: </Text>
        {cocktail.method}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.textBold}>Glassware: </Text>
        {cocktail.glassware}
      </Text>
      <Text style={styles.text}>
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
    padding: 24,
    gap: 24,
  },
  list: {
    margin: 0,
    padding: 0,
    flexGrow: 0,
    // borderColor: "#1c11c1",
    // borderWidth: 1,
  },
  listItem: {
    marginVertical: 8,
    marginHorizontal: 12,
    paddingVertical: 0,

  },
  separator: {
    borderBottomColor: COLORS.primary, // Bottom border color
    borderBottomWidth: 1,      // Bottom border width
  },
  text: {
    fontFamily: FONTS.latoRegular,
    fontSize: 16,
  },
  textBold: {
    fontFamily: FONTS.latoBold,
    fontSize: 20,
  },
});

export default CocktailPage;
