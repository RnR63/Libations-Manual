// import { useEffect, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs, useGlobalSearchParams, useRouter } from "expo-router";
import { COLORS, SIZES, FONTS } from "../../src/styles/theme";
import { useCallback } from "react";

export default function Layout(): JSX.Element {
  const router = useRouter();
  console.log("in tabs layout");

  const { data, from } = useGlobalSearchParams<{
    data: string;
    from: string;
  }>();

  // console.log("from: ", from);

  const handleBack = useCallback(() => {
    if (from === "search") {
      router.navigate({
        pathname: "/search",
      });
    } else {
      router.navigate({
        pathname: "/spiritCategory",
        // params: { spirit: data },
      });
    }
  }, [from]);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.primary }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Fontisto name="search" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          title: "Current Recipe",
          // headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="list" size={22} color={color} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => handleBack()}>
              <Entypo
                name="chevron-thin-left"
                size={18}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
