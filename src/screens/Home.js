import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from "react-native";
import { debounce } from "lodash";
import { COLORS, FONTS } from "../styles/theme";
import getCocktails from "../getCocktails";
import MenuItem from "../components/MenuItem";
import SpiritBox from "../components/SpiritBox";

const SPIRIT_TYPES = ["Vodka", "Gin", "Rum", "Tequila", "Mezcal", "Whiskey", "Misc"];
// const windowWidth = Dimensions.get('window').width;
// const itemSize = (windowWidth - 50) / 3;

const Home = ({ navigation }) => {
  // const [spirits, setSpiritBox] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedHandleTextChange = useCallback(
    debounce((text) => {
      setSearch(text);
      console.log(text);
    }, 200), // Adjust the delay as needed
    []
  );

  // const fetchCocktailsBySpirit = useCallback(async () => {
  //   const fetchedList = await getCocktails();
  //   const filteredListBySpirit = fetchedList.filter((spirits) =>
  //     spirits.spirit
  //   );
  //   setSpiritBox(filteredListBySpirit);
  // }, []);

  // useEffect(() => {
  //   fetchCocktailsBySpirit();
  // }, []);

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
        <Text style={styles.heading}>Cocktails</Text>
      </View>
      <View>{/* <Text>A | B | C .... Z | #</Text> */}</View>
      <TextInput
        style={styles.searchContainer}
        placeholder="Search"
        onChangeText={debouncedHandleTextChange}
      />
      <FlatList
        numColumns={3}
        data={SPIRIT_TYPES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <SpiritBox
            item={item}
            handlePress={() => {
              navigation.navigate("SpiritsPage", {
                cocktail: item,
              });
            }} // this will navigate to all cocktails with that same spirit
          />
        )}
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
