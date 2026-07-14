import { daysInitials } from "@/utils/date-helpers";
import { View, Text, Pressable } from "react-native";

export default function CalendarTable({
  calendarArray,
  pickedDay,
  onDayPressed
}: {
    calendarArray: number[];
    pickedDay: number;
    onDayPressed: (day: number) => void
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
        {calendarArray.map((value, key) => (value !== null ?
          (
            pickedDay === value ?
            <Pressable onPress={() => onDayPressed(value)} key={key} className="h-14 w-1/8 bg-gray-500 rounded-md">
              <Text className="text-center text-white font-inter">{value}</Text>
            </Pressable>
            :
            <Pressable onPress={() => onDayPressed(value)} key={key} className="h-14 w-1/8 bg-gray-100 rounded-md">
              <Text className="text-center font-inter">{value}</Text>
            </Pressable>
          )
          :
          <View key={key} className="h-12 w-1/8" />
        ))}
      </View>
    </View>
  );
}
