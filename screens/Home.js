import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Home = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate("CocktailModal");
      }}
    >
      <Text>Daddys home bitch!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
  },
});
export default Home;
