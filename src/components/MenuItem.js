import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MenuItem({ item, handlePress }) {
  return (
    <TouchableOpacity
      // style={styles.button}
      onPress={handlePress}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
}
