import { ChevronRight } from "lucide-react-native";
import { View, Text } from "react-native";
import { DateType } from "@/modules/calendar-bridge/src/CalendarBridge.types";

export default function DateDetails({
  hijrahDate,
  gregorianDate
}: {
  hijrahDate: DateType;
  gregorianDate: DateType;
}) {
  return (
    <View className="bg-gray-100 h-full w-full p-2 rounded-2xl">
      <View className="flex-row justify-around items-center">
        <Text className="font-bold text-lg">{`${hijrahDate.day} ${hijrahDate.monthEnStr} ${hijrahDate.year}`}</Text>
        <Text>{`${gregorianDate.day} ${gregorianDate.monthEnStr} ${gregorianDate.year}`}</Text>
        <View className="bg-gray-300 rounded-full p-1">
          <ChevronRight />
        </View>
      </View>
    </View>
  );
}
