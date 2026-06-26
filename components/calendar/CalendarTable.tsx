import { daysInitials } from "@/utils/date-helpers";
import { View, Text } from "react-native";

export default function CalendarTable({
  calendarArray,
}: {
  calendarArray: number[];
}) {
  return (
    <View className="items-center">
      <View className="flex-row items-center justify-center gap-1 w-full">
        {daysInitials.map((value, key) => (
          <Text
            key={key}
            className="text-black w-1/8 text-center font-inter-medium"
          >
            {value}
          </Text>
        ))}
      </View>

      <View className=" py-2 flex-row justify-center flex-wrap gap-1">
        {calendarArray.map((value, key) => (
          <View key={key} className="h-12 w-1/8 bg-gray-200 rounded-lg">
            <Text className="text-center font-inter">{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
