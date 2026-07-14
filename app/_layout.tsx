import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "@/global.css";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          marginTop: insets.top,
          marginBottom: insets.bottom,
          backgroundColor: "white"
        }
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="settings" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
