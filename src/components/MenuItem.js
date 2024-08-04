import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../styles/theme";

export default function MenuItem({ item, handlePress }) {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.cocktailText}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
