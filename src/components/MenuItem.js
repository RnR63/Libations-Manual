import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../styles/theme";

const MenuItem = ({ item, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.cocktailText}>{item.name}</Text>
    </TouchableOpacity>
  );
};
export default MenuItem;
const styles = StyleSheet.create({});
