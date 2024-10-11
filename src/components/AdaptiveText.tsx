import { Text, View, TextProps } from "react-native";

type AdaptiveTextProps = TextProps & {
  minFontSize?: number;
  maxFontSize?: number;
};

const AdaptiveText: React.FC<AdaptiveTextProps> = ({
  style,
  children,
  minFontSize = 16,
  maxFontSize = 32,
}) => {
  return (
    <View style={[style, { overflow: "hidden" }]}>
      <Text
        style={[
          style,
          {
            // borderColor: 'blue',
            // borderWidth: 1,
            fontSize: maxFontSize,
            lineHeight: maxFontSize * 1.2,
            flexShrink: 1,
            padding: 0,
            textAlignVertical: "center",
            alignSelf: "baseline",
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
