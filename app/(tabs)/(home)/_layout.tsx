import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { Dimensions, TextStyle, TouchableOpacity } from "react-native";
import { FONTS, SIZES, COLORS } from "../../../src/styles/theme";
import AdaptiveText from "../../../src/components/AdaptiveText";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useRef } from "react";
import HeaderTitle from "../../../src/components/headerTitle";

type HeaderTitleStyle = Pick<
  TextStyle,
  | "fontFamily"
  | "fontSize"
  | "color"
  | "fontWeight"
  | "paddingTop"
  | "margin"
  | "borderWidth"
  | "borderColor"
>;
// type HeaderTitleStyle = Pick<TextStyle, "fontFamily" | "fontSize"> & {
//   textAlign?: "center" | "left" | "right" | "baseline";
//   paddingTop?: number;
//   margin?: number;
//   borderWidth?: number;
//   borderColor?: string;
// };

export default function Layout(): JSX.Element {
  const router = useRouter();
  const { spirit } = useGlobalSearchParams<{
    spirit: string;
  }>();
  console.log("spirit in home layout is", spirit);
  console.log("in home layout");
  const screenWidth = Dimensions.get("window").width;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <HeaderTitle home={true} />,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="spiritCategory"
        options={{
          headerTitle: () => <HeaderTitle spirit={spirit} />,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo
                name="chevron-thin-left"
                size={18}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
