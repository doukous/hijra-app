import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, View, Text } from "react-native";

export default function Header(month: string) {
  return (
    <View className="flex-row items-center gap-x-6">
      <Pressable>
        <ChevronLeft />
      </Pressable>
      <Text className="text-xl">{month}</Text>
      <Pressable>
        <ChevronRight />
      </Pressable>
    </View>
  );
}
