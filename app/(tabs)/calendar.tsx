import { todayDate } from "@/utils/date-helpers";
import { strCapitalize } from "@/utils/str-helpers";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";

export default function CalendarScreen() {
  const month = strCapitalize(
    todayDate.toLocaleString("fr-FR", {
      month: "long",
      calendar: "islamic",
    }),
  );

  const arrayMonth = new Array(35).fill(null);

  return (
    <View className="flex-1 items-center m-1">
      <View className="flex-row items-center gap-x-6">
        <Pressable>
          <ChevronLeft />
        </Pressable>
        <Text className="text-xl">{month}</Text>
        <Pressable>
          <ChevronRight />
        </Pressable>
      </View>
      <View className="w-68 m-auto items-center justify-center flex-row flex-wrap gap-x-2 gap-y-4">
        {arrayMonth.map((value, key) => (
          <View key={key} className="bg-blue-700 size-8"></View>
        ))}
      </View>
    </View>
  );
}
