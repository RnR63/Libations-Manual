import { StyleSheet, TextInput, View } from "react-native";
import { SIZES, COLORS } from "../styles/theme";
import { useCallback } from "react";
import { debounce } from "lodash";

interface Props {
  search: string;
  setSearch: (search: string) => void;
}

const SearchBar: React.FC<Props> = ({ search, setSearch }) => {
  const debouncedHandleTextChange = useCallback(
    debounce((text: string) => {
      setSearch(text);
    }, 200),
    [setSearch],
  );

  const handleTextChange = (text: string) => {
    debouncedHandleTextChange(text);
  };

  return (
    <View>
      <TextInput
        style={styles.searchContainer}
        placeholder="Search"
        onChangeText={handleTextChange}
        clearButtonMode="while-editing"
        accessibilityLabel="Search for cocktails"
        accessibilityHint="Type to search for cocktails"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
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
});
