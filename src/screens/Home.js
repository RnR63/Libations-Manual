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
import { COLORS, FONTS, SIZES } from "../styles/theme";
import getCocktails from "../getCocktails";
import MenuItem from "../components/MenuItem";

const Home = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedHandleTextChange = useCallback(
    debounce((text) => {
      setSearch(text);
    }, 200),
    []
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading} accessibilityRole="header">
          Cocktails
        </Text>
      </View>
      <TextInput
        style={styles.searchContainer}
        placeholder="Search"
        onChangeText={debouncedHandleTextChange}
        clearButtonMode="while-editing"
        accessibilityLabel="Search for cocktails"
        accessibilityHint="Type to search for cocktails"
      />

      {cocktails.length > 0 ? (
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
              accessibilityLabel={`View details for ${item.name}`}
              accessibilityRole="button"
            />
          )}
        />
      ) : (
        <Text style={styles.notFoundText}>No drinks found</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontFamily: FONTS.peralta,
    fontSize: SIZES.heading,
    alignSelf: "center",
    marginVertical: 4,
  },
  searchContainer: {
    flexDirection: "row",
    fontSize: SIZES.body_reg,
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 16,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  notFoundText: {
    fontFamily: FONTS.latoRegular,
    fontSize: SIZES.body_reg,
    alignSelf: "center",
    marginTop: 24,
  }
});
export default Home;
