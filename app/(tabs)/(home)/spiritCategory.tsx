import { View, FlatList, StyleSheet, Text } from "react-native";
import { FONTS, COLORS, SIZES } from "../../../src/styles/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Store } from "../../../src/types";
import CocktailsBySpiritButton from "../../../src/components/cocktailsBySpiritButton";
import useStore from "../../../src/data/store/cocktailStore";
import SearchBar from "../../../src/components/searchBar";

const SpiritCategory: React.FC = () => {
  const router = useRouter();
  const cocktails = useStore((state: Store) => state.cocktails);
  const [localCocktails, setLocalCocktails] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const { spirit } = useLocalSearchParams<{
    spirit: string;
  }>();

  // filtering by spirit
  const singleSpiritList: string[] = useMemo(() => {
    const tempList: string[] = [];
    cocktails?.forEach((value, key) => {
      if (value.spirit === spirit) {
        tempList.push(key);
      }
    });
    return tempList;
  }, []);

  // filter same spirit cocktails by search
  const filterCocktails = useMemo(() => {
    return singleSpiritList.filter((cocktail) =>
      cocktail.toLowerCase().includes(search.toLowerCase()),
    );
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
      setLocalCocktails(singleSpiritList);
    } else {
      console.log("search is: ", search);
      setLocalCocktails(filterCocktails);
    }
  }, [search]);

  return (
    <View>
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
  },
});
export default SpiritCategory;
