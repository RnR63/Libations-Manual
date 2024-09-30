import { Stack } from "expo-router";
import { FONTS } from "../../../styles/theme";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Spirits",
        }}
      />
    </Stack>
  );
}
