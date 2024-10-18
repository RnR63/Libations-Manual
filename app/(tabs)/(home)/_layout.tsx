import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../../src/styles/theme";
import Entypo from "@expo/vector-icons/Entypo";
import HeaderTitle from "../../../src/components/headerTitle";

export default function Layout(): JSX.Element {
  const router = useRouter();
  const { spirit } = useGlobalSearchParams<{
    spirit: string;
  }>();

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
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, right: 20 }}
              onPress={() => router.back()}
            >
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
