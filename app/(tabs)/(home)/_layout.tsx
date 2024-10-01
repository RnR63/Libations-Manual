import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Spirits" }} />
      <Stack.Screen
        name="spiritCategory"
        options={{
          title: "spiritCategory",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
