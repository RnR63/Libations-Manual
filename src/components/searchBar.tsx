import { StyleSheet, TextInput, View } from "react-native";
import { SIZES, COLORS } from "../styles/theme";
import { useCallback, useState, useRef, useEffect } from "react";
import { debounce } from "lodash";

interface Props {
  search: string;
  setSearch: (search: string) => void;
}

const SearchBar: React.FC<Props> = ({ search, setSearch }) => {
  const inputRef = useRef<TextInput>(null);
  // const [localSearch, setLocalSearch] = useState(search);

  const debouncedHandleTextChange = useCallback(
    debounce((text: string) => {
      console.log("debouncedHandleTextChange");
      setSearch(text);
    }, 200),
    [setSearch],
  );

  const handleTextChange = (text: string) => {
    // setLocalSearch(text);
    debouncedHandleTextChange(text);
  };

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

  // to not have search focused, not helpful when going from recipe back to search tab
  // useEffect(() => {
  //   setLocalSearch(search);
  // }, [search]);

  return (
    <View>
      <TextInput
        // ref={inputRef}
        style={styles.searchContainer}
        placeholder="Search"
        onChangeText={handleTextChange}
        clearButtonMode="while-editing"
        accessibilityLabel="Search for cocktails"
        accessibilityHint="Type to search for cocktails"
        // value={localSearch}
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
