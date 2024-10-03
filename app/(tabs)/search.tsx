import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { Cocktail } from "../../src/types";
import { COLORS, FONTS, SIZES } from "../../src/styles/theme";
import CocktailsBySpiritButton from "../../src/components/cocktailsBySpiritButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export default function Search() {
  const router = useRouter();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [search, setSearch] = useState<string>("");

  const { serializedCocktails } = useLocalSearchParams<{
    serializedCocktails: string;
  }>();
  console.log("serializedCocktails in search.tsx:", !!serializedCocktails);

  const parsedList: Cocktail[] = JSON.parse(serializedCocktails);
  console.log("Cocktails in search.tsx:", parsedList[0].name);

  const filterCocktails = useMemo(() => {
    return parsedList.filter((cocktail) =>
      cocktail.name.toLowerCase().startsWith(search.toLowerCase()),
    );
  }, [search]);

  const debouncedHandleTextChange = useCallback(
    debounce((text: string) => {
      console.log("debouncedHandleTextChange");
      setSearch(text);
    }, 200),
    [],
  );

  useEffect(() => {
    if (search === "") {
      setCocktails(parsedList);
    } else {
      setCocktails(filterCocktails);
    }
  }, [search]);

  if (cocktails.length === 0) {
    return <Text style={styles.notFoundText}>No cocktails found</Text>;
  }

  return (
    <View>
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
          // <TouchableOpacity style={styles.spiritButton}>
          //   <Text>{item.name}</Text>
          // </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchContainer}
              placeholder="Search"
              onChangeText={debouncedHandleTextChange}
              clearButtonMode="while-editing"
              accessibilityLabel="Search for cocktails"
              accessibilityHint="Type to search for cocktails"
            />
          </View>
        }
        stickyHeaderIndices={[0]}
        // ListHeaderComponentStyle={styles.searchContainer}
      />
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
