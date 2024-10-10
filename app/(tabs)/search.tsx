import { useRouter } from "expo-router";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Store } from "../../src/types";
import { COLORS, FONTS, SIZES } from "../../src/styles/theme";
import CocktailsBySpiritButton from "../../src/components/cocktailsBySpiritButton";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "../../src/components/searchBar";
import useStore from "../../src/data/store/cocktailStore";

export default function Search() {
  const router = useRouter();
  const cocktails = useStore((state: Store) => state.cocktails);
  const [localCocktails, setLocalCocktails] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  // console.log("Cocktails in search.tsx:", parsedList[0].name, Date.now());
  const listNames = useMemo(
    () => (cocktails ? Array.from(cocktails.keys()) : []),
    [cocktails],
  );

  const filteredCocktails = useMemo(() => {
    return listNames.filter((cocktail) => {
      return cocktail.toLowerCase().includes(search.toLowerCase());
    });
  }, [search]);

  const handleSelect = (item: string) => {
    const value = cocktails?.get(item);
    router.navigate({
      pathname: "/recipe",
      params: {
        data: item,
        value: JSON.stringify(value),
      },
    });
  };

  useEffect(() => {
    if (search === "") {
      setLocalCocktails(listNames);
    } else {
      setLocalCocktails(filteredCocktails);
    }
  }, [search]);

  return (
    <View style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} />
      {!cocktails || localCocktails.length === 0 ? (
        <Text style={styles.notFoundText}>No cocktails found</Text>
      ) : (
        <FlatList
          data={localCocktails}
          keyExtractor={(item) => item} //each element in array
          renderItem={({ item }) => (
            <CocktailsBySpiritButton
              item={item}
              handlePress={(): void => {
                handleSelect(item);
              }}
            />
          )}
        />
      )}
    </View>
  );
}

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
  },
});
