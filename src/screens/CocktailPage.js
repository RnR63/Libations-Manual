import { View, Text, FlatList, StyleSheet } from "react-native";


const CocktailPage = ({ route }) => {
  const { cocktail } = route.params;
  return (
    <View style={styles.container}>
      {/* <Text>Name: {cocktail.name}</Text> */}
      <FlatList
        style={styles.list}
        data={cocktail.ingredients}
        keyExtractor={(item) => item}
        ListHeaderComponent={<Text>Ingredients:</Text>}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
      />
      <Text>Method: {cocktail.method}</Text>
      <Text>Glassware: {cocktail.glassware}</Text>
      <Text>Garnish: {cocktail.garnish}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 24,
    gap: 12,
  },
  list: {
    margin: 0,
    padding: 0,
    flexGrow: 0,
  },
  listContent: {
    paddingBottom: 0,
  },
  listItem: {
    marginVertical: 0,
    marginHorizontal: 12,
    paddingVertical: 0,
  },
});

export default CocktailPage;
