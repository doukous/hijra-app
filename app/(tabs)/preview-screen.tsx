"use no memo";

import { View } from "react-native";
import { WidgetPreview } from "react-native-android-widget";
import TestWidget from "@/widgets/test-widget";

export default function PreviewScreen() {
  const size = {
    width: 300,
    height: 120,
  };

  return (
    <View className="flex-1 justify-center items-center">
      <WidgetPreview
        renderWidget={({ width, height }) => <TestWidget />}
        width={size.width}
        height={size.height}
      />
    </View>
  );
}
