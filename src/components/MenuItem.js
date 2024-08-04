import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../styles/theme";

export default function MenuItem({ item, handlePress, itemSize }) {
  return (
    <TouchableOpacity
      style={[styles.cocktailBox, { width: itemSize, height: itemSize }]}
      onPress={handlePress}
    >
      <Text style={styles.cocktailText}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cocktailBox: {
    shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: COLORS.text_white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  cocktailText: {
    fontFamily: FONTS.peralta,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.text_dark,
    padding: 5,
  },
});
