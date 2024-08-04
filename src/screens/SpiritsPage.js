import { View, Text, FlatList, StyleSheet } from "react-native";
import { FONTS } from "../styles/theme";

const SpiritsPage = ({ route }) => {
  const { cocktail } = route.params;
  // console.log("spirit is", spirit);
  return (
    <View>
      <FlatList
        data={cocktail}
        keyExtractor={(item) => item}
        ListHeaderComponent={
          <Text style={styles.text}>{cocktail} Cocktails</Text>
        }
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <Text>{cocktail}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.peralta,
    fontSize: 16,
  },
});

export default SpiritsPage;
