import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { Cocktail } from "../../src/types";
import { COLORS, FONTS, SIZES } from "../../src/styles/theme";
import CocktailsBySpiritButton from "../../src/components/cocktailsBySpiritButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import SearchBar from "../../src/components/searchBar";
import { debounce } from "lodash";

export default function Search() {
  const router = useRouter();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [search, setSearch] = useState<string>("");

  const { serializedCocktails } = useLocalSearchParams<{
    serializedCocktails: string;
  }>();
  console.log("serializedCocktails in search.tsx:", Date.now());

  const parsedList: Cocktail[] = useMemo(
    () => JSON.parse(serializedCocktails),
    [],
  );
  console.log("Cocktails in search.tsx:", parsedList[0].name, Date.now());

  const filteredCocktails = useMemo(() => {
    return parsedList.filter((cocktail) => {
      const nameWithoutThe = cocktail.name
        .replace(/^the\s+/i, "")
        .toLowerCase();
      return nameWithoutThe.includes(search.toLowerCase());
    });
  }, [search]);

  useEffect(() => {
    if (search === "") {
      setCocktails(parsedList);
    } else {
      setCocktails(filteredCocktails);
    }
  }, [search]);

  return (
    <View>
      <SearchBar search={search} setSearch={setSearch} />
      {cocktails.length === 0 ? (
        <Text style={styles.notFoundText}>No cocktails found</Text>
      ) : (
        <FlatList
          data={cocktails}
          keyExtractor={(item) => item.name} //each element in array
          renderItem={({ item }) => (
            <CocktailsBySpiritButton
              item={item.name}
              handlePress={(): void => {
                router.navigate({
                  pathname: "/recipe",
                  params: {
                    data: JSON.stringify(item),
                  },
                });
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
