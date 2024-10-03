import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../styles/theme";

interface Props {
  item: string;
  handlePress: () => void;
}

const CocktailsBySpiritButton: React.FC<Props> = ({ item, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.itemBox}
      onPress={handlePress}
      accessibilityLabel={`Menu item: ${item}`}
      accessibilityRole="button"
      accessibilityHint="Tap to view details"
    >
      <Text style={styles.cocktailText}>{item}</Text>
      <Text style={styles.cocktailText}>{">"}</Text>
    </TouchableOpacity>
  );
};

export default CocktailsBySpiritButton;

const styles = StyleSheet.create({
  cocktailText: {
    color: COLORS.text_white,
    fontFamily: FONTS.latoRegular,
    fontSize: SIZES.body_reg,
  },
  itemBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
