import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import getCocktails from "../getCocktails";
import { COLORS, FONTS } from "../styles/theme";

const Home = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = useCallback(async () => {
    const fetchedList = await getCocktails();
    setCocktails(fetchedList);
  }, []);

  useEffect(() => {
    fetchCocktails();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>Cocktails</Text>
      </View>
      <View>
        <Text>A | B | C .... Z | #</Text>
      </View>
      <FlatList
        data={cocktails}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("CocktailModal", {
                cocktail: item,
              });
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
  },
  container: {
    flex: 1,
  },
  heading: {
    font: FONTS.regular,
    fontSize: 32,
    alignSelf: "center",
  },
});
export default Home;
