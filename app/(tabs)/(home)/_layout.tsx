import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { FONTS, SIZES, COLORS } from "../../../src/styles/theme";
import AdaptiveText from "../../../src/components/AdaptiveText";
import Entypo from "@expo/vector-icons/Entypo";

export default function Layout() {
  const router = useRouter();
  // const { spirit } = useGlobalSearchParams<{
  //   spirit: string;
  // }>();

  // console.log("spirit in home layout is", spirit);
  console.log("in home layout");

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="spiritCategory"
        options={{
          // headerShown: false,
          // title: `${spirit} Cocktails`,
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
