import { GenericDateData } from "@/modules/calendar-bridge/src/CalendarBridge.types";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, View, Text } from "react-native";

export default function Header({
  date,
  toPreviousMonth,
  toNextMonth,
}: {
  toPreviousMonth: () => void;
  toNextMonth: () => void;
  date: GenericDateData;
}) {
  return (
    <View className="w-full flex-row items-center justify-between px-4">
      <Pressable
        className="border-2 border-gray-600 p-2 rounded-full"
        onPress={toPreviousMonth}
      >
        <ChevronLeft />
      </Pressable>

      <Text className="w-2/5 font-semibold text-lg">
        {date.monthInEnglish.toUpperCase()}
      </Text>

      <Text className="font-semibold text-lg">{date.year} AH</Text>

      <Pressable
        className="border-2 border-gray-600 p-2 rounded-full"
        onPress={toNextMonth}
      >
        <ChevronRight />
      </Pressable>
    </View>
  );
}
