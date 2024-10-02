import { View, FlatList, TextInput, StyleSheet } from "react-native";
import { FONTS, COLORS, SIZES } from "../../../src/styles/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { debounce } from "lodash";
import { useCallback, useState, useMemo } from "react";
import { Cocktail } from "../../../src/types";
import CocktailsBySpirit from "../../../src/components/cocktailsBySpirit";

const SpiritCategory: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const { spirit, data } = useLocalSearchParams<{
    spirit: string;
    data: string;
  }>();

  const dataArr: Cocktail[] = JSON.parse(data);
  console.log(`\n spiritCategory: ${spirit}\n`, "dataArr: ", dataArr[0].name);

  const filterCocktails = (spirit: string): string => {
    const filterArr = dataArr.filter((cocktail) => cocktail.spirit === spirit);
    return JSON.stringify(filterArr);
  };

  // const filterListMemo: Cocktail[] = useMemo(() => {
  //   return cocktails.filter((cocktail) =>
  //     cocktail.name.toLowerCase().startsWith(search.toLowerCase()),
  //   );
  // }, [search]);

  const debouncedHandleTextChange = useCallback(
    debounce((text: string) => {
      setSearch(text);
    }, 200),
    [],
  );

  return (
    <View>
      <FlatList
        data={dataArr}
        keyExtractor={(item) => item.name} //each element in array
        renderItem={({ item }) => (
          <CocktailsBySpirit
            item={item.name}
            handlePress={(): void => {
              router.navigate({
                pathname: "/spiritCategory",
                params: { spirit: item.name, data: filterCocktails(item.name) },
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
