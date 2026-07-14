import { Link } from "expo-router";
import { ArrowLeftRight, Plus, Settings } from "lucide-react-native";
import { View, Text } from "react-native";
import { todayDate } from "@/utils/date-helpers";

export default function CalendarToolbar() {
  return (
    <View className="flex-row justify-end items-center px-2 my-2 gap-x-4">
      <Link href="/settings" className="mr-auto">
        <Settings strokeWidth={1.5} />
      </Link>

      <Link href="/conversion">
        <ArrowLeftRight size={20} />
      </Link>

      <Plus strokeWidth={1.8} />
      <Text className="border-2 rounded-lg px-1 text-center font-bold">{todayDate.day}</Text>
    </View>
  );
}
