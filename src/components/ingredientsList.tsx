import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../styles/theme";

type IngredientsListProps = {
  ingredients: string[];
};

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  return (
    <View>
      <Text style={styles.textBold}>Ingredients:</Text>
      <View style={styles.itemListContainer}>
        {ingredients.map((ingredient, index, array) => (
          <View
            key={index}
            style={[
              styles.itemTextContainer,
              index !== 0 && styles.itemTextContainerWithBorder,
              index === array.length - 1 && styles.itemTextContainerLastChild,
            ]}
          >
            <Text style={styles.text}>{ingredient}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default IngredientsList;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.latoRegular,
    fontSize: SIZES.body_reg,
  },
  textBold: {
    fontFamily: FONTS.latoBold,
    fontSize: SIZES.body_bold,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
  },
  itemListContainer: {
    marginTop: 8,
  },
  itemTextContainer: {
    paddingLeft: 16,
    paddingVertical: 12,
  },
  itemTextContainerLastChild: {
    paddingLeft: 16,
    paddingTop: 12,
    paddingBottom: 0,
  },
  itemTextContainerWithBorder: {
    borderTopWidth: 1,
    borderColor: COLORS.primary,
  },
});
