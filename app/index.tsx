import Calendar from "@/components/calendar";
import { useDate, todayDate } from "@/utils/date-helpers";
import { Link } from "expo-router";
import { ArrowLeftRight, ChevronRight, Plus, Settings } from "lucide-react-native";
import { useState } from "react";
import { View, Text } from "react-native";

export default function CalendarScreen() {
  const {
    gregorianDate,
    hijrahDate,
    monthProps,
    setDate,
    setToNextMonth,
    setToPreviousMonth,

  } = useDate()
  const [pickedDay, setPickedDay] = useState(todayDate.day)


  return (
    <View className="gap-y-2">
      <View className="flex-row justify-end items-center px-2 my-2 gap-x-4">
        <Link href="/settings" className="mr-auto">
          <Settings strokeWidth={1.5} />
        </Link>

        <Link href="/conversion">
          <ArrowLeftRight size={20} />
        </Link>

        <Plus strokeWidth={1.8} />
        <Text className="border-2 rounded-lg px-1 text-center font-bold">{ todayDate.day }</Text>
      </View>

      <Calendar
        hijrahDate={hijrahDate}
        monthProps={monthProps}
        pickedDay={pickedDay}
        onPickedDay={
          (value) => {
            setDate(value, hijrahDate.month, hijrahDate.year)
            setPickedDay(value)
          }
        }
        onPreviousMonthFn={setToPreviousMonth}
        onNextMonthFn={setToNextMonth}
      />

      <View className="bg-gray-100 h-full w-full p-2 rounded-2xl">
        <View className="flex-row justify-around items-center">
          <Text className="font-bold text-lg">{ `${hijrahDate.day} ${hijrahDate.monthEnStr} ${hijrahDate.year}` }</Text>
          <Text>{ `${gregorianDate.day} ${gregorianDate.monthEnStr} ${gregorianDate.year}` }</Text>
          <View className="bg-gray-300 rounded-full p-1">
            <ChevronRight />
          </View>
        </View>

      </View>
    </View>
  );
}
