import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../styles/theme";
import Entypo from "@expo/vector-icons/Entypo";

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
      <Entypo name="chevron-thin-right" size={18} color={COLORS.text_white} />
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
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
