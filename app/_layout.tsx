import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { COLORS, FONTS, SIZES } from "../styles/theme";

export default function Layout() {
  return (
    <>
      <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.primary }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="search" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="recipe"
          options={{
            title: "Current Recipe",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Entypo name="list" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      {/* <Stack>
        <Stack.Screen name="items" options={{ title: "Cocktails by Spirit" }} />
        <Stack.Screen name="counter" options={{ title: "Counter" }} />
        <Stack.Screen name="idea" options={{ title: "Idea" }} />
      </Stack> */}
    </>
  );
}
