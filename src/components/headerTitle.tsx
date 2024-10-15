import { View, Text, StyleSheet } from "react-native";
import { FONTS, SIZES } from "../styles/theme";

interface HeaderTitleProps {
  spirit?: string;
  home?: boolean;
  recipe?: string;
  search?: boolean;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  spirit,
  home,
  recipe,
  search,
}) => {
  // extract the possible props
  //declre an empty string variable
  let titleString: string = "";
  console.log(
    "\nhome: ",
    home,
    "\nsearch: ",
    search,
    "\nspirit: ",
    spirit,
    "\nsearch: ",
    search,
    "\nrecipe: ",
    recipe,
  );
  if (home) {
    console.log("in home condition");
    titleString = "Choose a Spirit";
  } else if (search) {
    console.log("in search condition");
    titleString = "Search";
  } else if (spirit) {
    console.log("in default condition");
    titleString = `${spirit} Cocktails`;
  } else {
    console.log("in recipe condition");
    if (recipe) {
      titleString = recipe;
    } else {
      titleString = "Recipe";
    }
  }
  // make a conditional to determine the text to display
  // display the string varibale
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{titleString}</Text>
    </View>
  );
};
export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: "red",
    margin: 0,
    padding: 0,
  },
  text: {
    fontFamily: FONTS.peralta,
    fontSize: SIZES.heading,
  },
});
