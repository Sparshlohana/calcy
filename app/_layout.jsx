import { Stack } from "expo-router";
import "../global.css";
export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} key={"index"} />
      <Stack.Screen name="Home" options={{ headerShown: false }} key={"home"} />
    </Stack>
  );
}
