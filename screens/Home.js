import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { debounce } from "lodash";
import getCocktails from "../getCocktails";
import { COLORS, FONTS } from "../styles/theme";

const Home = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedHandleTextChange = useCallback(
    debounce((text) => {
      setSearch(text);
      console.log(text);
    }, 200), // Adjust the delay as needed
    [],
  );

  const fetchCocktails = useCallback(async () => {
    const fetchedList = await getCocktails();
    const filteredList = fetchedList.filter((cocktail) =>
      cocktail.name.toLowerCase().startsWith(search.toLowerCase()),
    );
    setCocktails(filteredList);
  }, [search]);

  useEffect(() => {
    fetchCocktails();
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>Cocktails</Text>
      </View>
      <View>
        <Text>A | B | C .... Z | #</Text>
      </View>
      <TextInput
        style={styles.searchContainer}
        placeholder="Search"
        onChangeText={debouncedHandleTextChange}
      />
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
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
export default Home;
