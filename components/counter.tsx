import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function CounterScreen() {
  //naviagtion buttons: TouchableOpacity
  // i would need to render a button for each spirit type
  // have them each be a toublable opacity that links to a
  // component that would populate with each corresponding spirit cocktails
  // or would i need a screen for each spirit type.  that doesnt sound right!!!
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate("/idea")}>
        <Text style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}>
          Go to /Idea
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
  },
});
