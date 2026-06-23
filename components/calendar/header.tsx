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
    <View className="w-full flex-row items-center justify-between gap-x-8 px-4">
      <Pressable
        className="bg-blue-400 p-2 rounded-xl"
        onPress={toPreviousMonth}
      >
        <ChevronLeft />
      </Pressable>

      <Text className="w-2/5">
        {date.monthInEnglish.toUpperCase()} - {date.monthInArabic}
      </Text>

      <Text>{date.year} AH</Text>

      <Pressable className="bg-blue-400 p-2 rounded-xl" onPress={toNextMonth}>
        <ChevronRight />
      </Pressable>
    </View>
  );
}
