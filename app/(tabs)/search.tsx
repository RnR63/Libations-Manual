import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Search() {
  const params = useLocalSearchParams<{ serializedCocktails: string }>();
  console.log("params in search.tsx:", params);
  
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}>
        this is where you can search for all cocktails
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
