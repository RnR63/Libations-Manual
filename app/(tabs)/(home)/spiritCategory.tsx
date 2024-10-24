import CocktailsBySpiritButton from "../../../src/components/cocktailsBySpiritButton";
import SearchBar from "../../../src/components/searchBar";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { FONTS, COLORS, SIZES } from "../../../src/styles/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useMemo, useState } from "react";
import { CocktailsMapType } from "../../../src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { cocktailProvider } from "../../_layout";

const SpiritCategory: React.FC = () => {
  const router = useRouter();
  const cocktails = useContext<CocktailsMapType>(cocktailProvider);
  const [localCocktails, setLocalCocktails] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const { spirit } = useLocalSearchParams<{
    spirit: string;
  }>();

  const singleSpiritList: string[] = useMemo(() => {
    const tempList: string[] = [];
    cocktails?.forEach((value, key) => {
      if (value.spirit === spirit) {
        tempList.push(key);
      }
    });
    return tempList;
  }, []);

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
        from: "spiritCategory",
        spirit: spirit,
      },
    });
  };

  useEffect(() => {
    if (search === "") {
      setLocalCocktails(singleSpiritList);
    } else {
      setLocalCocktails(filterCocktails);
    }
  }, [search]);

  return (
    <SafeAreaView edges={["right", "left"]} style={styles.container}>
      <View>
        <SearchBar search={search} setSearch={setSearch} />
        {!cocktails || localCocktails.length === 0 ? (
          <Text style={styles.notFoundText}>No cocktails found</Text>
        ) : (
          <FlatList
            data={localCocktails}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <CocktailsBySpiritButton
                item={item}
                handlePress={(): void => {
                  handleSelect(item);
                }}
              />
            )}
            ListFooterComponent={<View style={styles.listFooter} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listFooter: {
    height: 100,
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
