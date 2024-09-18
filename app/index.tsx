import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Link
        href="/counter"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to counter
      </Link> */}
      <Text>render spirit boxes here</Text>
      <StatusBar style="auto" />
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