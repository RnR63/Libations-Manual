import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Cocktail } from "../../src/types";

export default function Search() {
  const { serializedCocktails } = useLocalSearchParams<{
    serializedCocktails: string;
  }>();
  console.log("serializedCocktails in search.tsx:", !!serializedCocktails);

  const cocktails: Cocktail[] = JSON.parse(serializedCocktails);
  console.log("Cocktails in search.tsx:", cocktails[0].name);

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
