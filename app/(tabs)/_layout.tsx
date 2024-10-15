// import { useEffect, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs, useGlobalSearchParams, useRouter } from "expo-router";
import { COLORS } from "../../src/styles/theme";
import { useCallback } from "react";
import HeaderTitle from "../../src/components/headerTitle";

export default function Layout(): JSX.Element {
  const router = useRouter();
  console.log("in tabs layout");

  const { data, from, spirit } = useGlobalSearchParams<{
    data: string;
    from: string;
    spirit: string;
  }>();

  // console.log("from: ", from, "data: ", data, "spirit: ", spirit);

  const handleBack = useCallback(() => {
    if (from === "search") {
      router.navigate({
        pathname: "/search",
        params: { spirit: spirit },
      });
    } else if (from === "spiritCategory") {
      router.navigate({
        pathname: "/spiritCategory",
        params: { spirit: spirit },
      });
    } else {
      router.back();
    }
  }, [from]);

  const toggleBack = () => {
    return (
      <TouchableOpacity onPress={() => handleBack()}>
        <Entypo name="chevron-thin-left" size={18} color={COLORS.primary} />
      </TouchableOpacity>
    );
  };

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
          headerTitle: () => <HeaderTitle search={true} />,
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          title: "Current Recipe",
          headerTitle: () => <HeaderTitle recipe={data} />,
          headerShadowVisible: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="list" size={22} color={color} />
          ),
          headerLeft:
            from === "search" || from === "spiritCategory"
              ? toggleBack
              : undefined,
        }}
      />
    </Tabs>
  );
}
