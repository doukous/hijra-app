import { DateType } from "@/modules/calendar-bridge/src/CalendarBridge.types";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, View, Text } from "react-native";

export default function CalendarHeader({
    hijrahDate,
    toPreviousMonth,
    toNextMonth,
  }:
  {
    hijrahDate: DateType;
    toPreviousMonth: () => void;
    toNextMonth: () => void;
  }
) {
  return (
    <View className="w-full flex-row items-center justify-between px-4">
      <Pressable
        onPress={toPreviousMonth}
      >
        <ChevronLeft />
      </Pressable>

      <Text className="w-2/5 font-montserrat-semibold text-lg">
        {hijrahDate.monthEnStr}
      </Text>

      <Text className="font-montserrat-medium text-lg">{hijrahDate.year}</Text>

      <Pressable
        onPress={toNextMonth}
      >
        <ChevronRight />
      </Pressable>
    </View>
  );
}
