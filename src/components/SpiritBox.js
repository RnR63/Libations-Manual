import { Text, TouchableOpacity, StyleSheet } from "react-native";

const SpiritBox = ({ item, handlePress }) => {
  return (
    <TouchableOpacity style={styles.spiritBox} onPress={handlePress}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  spiritBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "orange",
    alignContent: "center",
    justifyContent: "center",
    margin: 10
  },
});
export default SpiritBox;
