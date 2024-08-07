import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../styles/theme";

const MenuItem = ({ item, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.itemBox}
      onPress={handlePress}
      accessibilityLabel={`Menu item: ${item.name}`}
      accessibilityRole="button"
      accessibilityHint="Tap to view details"
    >
      <Text style={styles.cocktailText}>{item.name}</Text>
    </TouchableOpacity>
  );
};
export default MenuItem;
const styles = StyleSheet.create({
  cocktailText: {
    color: COLORS.text_white,
    fontFamily: FONTS.latoBold,

  },
  itemBox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  }
});
