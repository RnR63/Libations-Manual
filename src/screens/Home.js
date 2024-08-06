import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  Text,
  View,
} from "react-native";
import { debounce } from "lodash";
import { COLORS, FONTS } from "../styles/theme";
import getCocktails from "../getCocktails";
import MenuItem from "../components/MenuItem";

const Home = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedHandleTextChange = useCallback(
    debounce((text) => {
      setSearch(text);
    }, 200), // Adjust the delay as needed
    []
  );


  // handling search hooks
  const fetchCocktails = useCallback(async () => {
    const fetchedList = await getCocktails();
    const filteredList = fetchedList.filter((cocktail) =>
      cocktail.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setCocktails(filteredList);
  }, [search]);

  useEffect(() => {
    fetchCocktails();
  }, [search]);

  const fetchSpirit = useCallback(async () => {
    const fetchedList = await getCocktails();
    const filteredList = fetchedList.filter((cocktail) =>
      cocktail.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setCocktails(filteredList);
  }, [search]);

  useEffect(() => {
    fetchSpirit();
  }, [search])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>Cocktails</Text>
      </View>
      <TextInput
        style={styles.searchContainer}
        placeholder="Search"
        onChangeText={debouncedHandleTextChange}
        clearButtonMode="while-editing"
      />
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <MenuItem
            item={item}
            handlePress={() => {
              navigation.navigate("CocktailPage", {
                cocktail: item,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontFamily: FONTS.peralta,
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
