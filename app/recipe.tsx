import { View, Text, StyleSheet } from "react-native";

export default function Recipe() {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}>
        current recipe here, with sharable functionality
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
