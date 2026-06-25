import { CustomDate } from "@/utils/date-helpers";
import { View, Text, ScrollView } from "react-native";

export default function HomeScreen() {
  const customDate = new CustomDate();
  const todayDate = customDate.getTodayDate();

  return (
    <ScrollView contentContainerClassName="p-2 gap-y-8">
      <Text className="font-bold text-4xl mt-4">Hi Mohamed 👋</Text>

      <View className="gap-y-4">
        <Text className="text-2xl font-medium">Today</Text>
        <View className="items-center justify-center p-2 bg-linear-to-br bg-emerald-500 via-green-500 to-teal-500 rounded-2xl h-24">
          <Text className="text-white font-medium text-xl">
            {`${todayDate.day} ${todayDate.monthInEnglish} ${todayDate.year} AH`}
          </Text>
          <Text className="text-white font-medium text-xl">
            {todayDate.monthInArabic}
          </Text>
        </View>
      </View>

      <View>
        <Text className="text-2xl font-medium my-4">
          Some events at this date
        </Text>
        <View className="gap-y-4">
          <View className="w-full h-24 rounded-2xl bg-amber-400"></View>
          <View className="w-full h-24 rounded-2xl bg-amber-400"></View>
          <View className="w-full h-24 rounded-2xl bg-amber-400"></View>
        </View>
      </View>

      <View className="gap-y-2">
        <Text className="text-xl font-medium">
          Good duas to make on this day
        </Text>
        <View className="bg-amber-300 rounded-2xl h-24"></View>
        <View className="bg-amber-300 rounded-2xl h-24"></View>
        <View className="bg-amber-300 rounded-2xl h-24"></View>
        <View className="bg-amber-300 rounded-2xl h-24"></View>
      </View>
    </ScrollView>
  );
}
