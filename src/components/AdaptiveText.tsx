import { Text, View, TextProps } from "react-native";
import { SIZES } from "../styles/theme";

type AdaptiveTextProps = TextProps & {
  minFontSize?: number;
  maxFontSize?: number;
};

const AdaptiveText: React.FC<AdaptiveTextProps> = ({
  style,
  children,
  minFontSize = 16,
  maxFontSize = SIZES.heading,
}) => {
  return (
    <View
      style={[
        style,
        {
          overflow: "hidden",
          alignContent: "center",
          borderWidth: 1,
          borderColor: "blue",
        },
      ]}
    >
      <Text
        style={[
          style,
          {
            fontSize: maxFontSize,
            lineHeight: maxFontSize * 1.2,
            flexShrink: 1,
            padding: 0,
            textAlignVertical: "center",
            alignSelf: "baseline",
            borderWidth: 1,
            borderColor: "red",
            // margin: 0,
          },
        ]}
        numberOfLines={2}
        adjustsFontSizeToFit={true}
        minimumFontScale={minFontSize / maxFontSize}
      >
        {children}
      </Text>
    </View>
  );
};

export default AdaptiveText;
