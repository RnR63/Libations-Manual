import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../../src/styles/theme";
import { useRouter } from "expo-router";
// import { Link } from "expo-router";

const SPIRITS: string[] = [
  "Vodka",
  "Gin",
  "Rum",
  "Tequila",
  "Mezcal",
  "Bourbon",
  "Rye",
  "Scotch",
  "Irish",
  "Japanese",
  "Misc",
];
export default function App() {
  //naviagtion buttons: TouchableOpacity
  // i would need to render a button for each spirit type
  // have them each be a toublable opacity that links to a
  // component that would populate with each corresponding spirit cocktails

  const router = useRouter();

  const handlePress = (spirit: string): void => {
    console.log(`handlePress submit for: ${spirit}`);
    router.navigate({
      pathname: "/spiritCategory",
      params: { spirit },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <Text style={styles.heading} accessibilityRole="header">
          Cocktails by Spirit
        </Text>
      </View> */}
      <StatusBar style="auto" />
      <FlatList
        data={SPIRITS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.spiritBox}
            onPress={() => {
              handlePress(item);
            }}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontFamily: FONTS.peralta,
    fontSize: SIZES.heading,
    alignSelf: "center",
    marginVertical: 4,
  },
  spiritBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    // paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 18,
  },
  text: {
    color: COLORS.text_white,
    fontFamily: FONTS.peralta,
    fontSize: SIZES.body_reg,
  },
});
