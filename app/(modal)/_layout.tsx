import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ModalLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          presentation: "formSheet",
          headerShown: true,
          sheetAllowedDetents: [0.6, 1.0],
          sheetGrabberVisible: true,
        }}
      />
      <StatusBar style="auto" />
    </>
  );
}
