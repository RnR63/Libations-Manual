import { Text, View } from "react-native";
// import { FONTS } from "../../../styles/theme";
import { useLocalSearchParams } from "expo-router";

const SpiritCategory: React.FC = () => {
  const { spirit } = useLocalSearchParams<{ spirit: string }>();
  console.log(`spiritCategory: ${spirit}`);

  return (
    <View>
      <Text>{spirit}</Text>
    </View>
  );
};

export default SpiritCategory;
