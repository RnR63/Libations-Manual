import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../styles/theme";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Props {
  item: string;
  handlePress: () => void;
}

const ShareButton: React.FC<Props> = ({ item, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.itemBox}
      onPress={handlePress}
      accessibilityLabel={`Menu item: ${item}`}
      accessibilityRole="button"
      accessibilityHint="Tap to view details"
    >
      <FontAwesome name="share" size={18} color={COLORS.text_white} />
      <Text style={styles.cocktailText}>Share</Text>
      {/* <Text style={styles.cocktailText}>{">"}</Text> */}
    </TouchableOpacity>
  );
};

export default ShareButton;

const styles = StyleSheet.create({
  cocktailText: {
    color: COLORS.text_white,
    fontFamily: FONTS.latoRegular,
    fontSize: SIZES.body_reg,
  },
  itemBox: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
