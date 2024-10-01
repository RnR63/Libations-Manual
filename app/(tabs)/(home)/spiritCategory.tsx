import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { FONTS, COLORS } from "../../../src/styles/theme";
import { useLocalSearchParams } from "expo-router";

// interface Cocktail {
//   name: string;
//   spirit: string;
//   ingredients: string[];
//   method: string;
//   glassware: string;
//   garnish: string;
// }

const SpiritCategory: React.FC = () => {
  const { spirit } = useLocalSearchParams<{ spirit: string }>();
  console.log(`spiritCategory: ${spirit}`);
  // const cocktailData: Cocktail[] = JSON.parse()

  return (
    <View>
      <FlatList
        data={tempArray}
        keyExtractor={(item) => item.name} //each element in array
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.spiritButton}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchBar}>
              <TextInput placeholder="Search" />
            </TouchableOpacity>
          </View>
        }
        stickyHeaderIndices={[0]}
        // ListHeaderComponentStyle={styles.searchContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: COLORS.background,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 10,
    padding: 10,
  },
  spiritButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
});
export default SpiritCategory;
