import { View, Text, StyleSheet } from "react-native";
import { FONTS, SIZES } from "../styles/theme";

interface HeaderTitleProps {
  spirit?: string;
  home?: boolean;
  recipe?: boolean;
  search?: boolean;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  spirit,
  home,
  recipe,
  search,
}) => {
  let titleString: string = "";
  if (home) {
    titleString = "Choose a Spirit";
  } else if (search) {
    titleString = "Search";
  } else if (spirit) {
    titleString = `${spirit} Cocktails`;
  } else {
    titleString = "Recipe";
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{titleString}</Text>
    </View>
  );
};
export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
  text: {
    fontFamily: FONTS.peralta,
    fontSize: SIZES.heading,
  },
});
