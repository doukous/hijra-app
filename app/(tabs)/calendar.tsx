import { GenericDateData } from "@/modules/calendar-bridge/src/CalendarBridge.types";
import CalendarBridgeModule from "@/modules/calendar-bridge/src/CalendarBridgeModule";
import { CustomDate, daysInitials } from "@/utils/date-helpers";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Directions, useFlingGesture } from "react-native-gesture-handler";
import { GestureDetector } from "react-native-gesture-handler/lib/typescript/handlers/gestures/GestureDetector";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

export default function CalendarScreen() {
  const customDate = new CustomDate();

  const [date, setDate] = useState<GenericDateData>(
    customDate.getGenericDate(),
  );

  const [isdateSectionToggled, toggleDateSection] = useState<boolean>(false);
  const [calendarTable, setCalendarTable] = useState(new Array(35).fill(null));

  const position = useSharedValue(0);

  const flingGesture = useFlingGesture({
    direction: Directions.UP,
    onActivate: () => {
      position.value = withTiming(position.value + 10, { duration: 100 });
    },
  });

  useEffect(() => {
    const table = buildArrayMonth();
    setCalendarTable(table);
  }, [date]);

  useEffect(() => {
    buildArrayMonth();

    const listener = CalendarBridgeModule.addListener(
      "onDateChange",
      (date) => {
        setDate(date);
        buildArrayMonth();
      },
    );

    return () => listener.remove();
  }, []);

  const buildArrayMonth = () => {
    const table = new Array(42).fill(null);
    for (let index = 0; index < date.numberOfDays; index++)
      table[index + date.positionOfFirstDayInWeek - 1] = index + 1;

    return table;
  };

  return (
    <View className="flex-1 items-center justify-around">
      <GestureDetector gesture={flingGesture}>
        <View className="w-full flex-row items-center justify-between gap-x-8 px-4">
          <Pressable
            className="bg-blue-400 p-2 rounded-xl"
            onPress={() => customDate.previousMonth()}
          >
            <ChevronLeft />
          </Pressable>

          <Text className="w-2/5">
            {date.monthInEnglish.toUpperCase()} - {date.monthInArabic}
          </Text>

          <Text>{date.year} AH</Text>

          <Pressable
            className="bg-blue-400 p-2 rounded-xl"
            onPress={() => customDate.nextMonth()}
          >
            <ChevronRight />
          </Pressable>
        </View>

        <View className="gap-y-2">
          <View className="flex flex-row flex-wrap justify-start w-full bg-emerald-500">
            {daysInitials.map((value, key) => (
              <Text key={key} className="text-white m-auto">
                {value}
              </Text>
            ))}
          </View>

          <Animated.View className="flex flex-row flex-wrap justify-start w-full bg-amber-400">
            {calendarTable.map((value, key) => (
              <Pressable
                key={key}
                className="bg-blue-700 w-[14.28%]"
                onPress={() => toggleDateSection(true)}
              >
                <Text className="text-white m-auto">{value}</Text>
              </Pressable>
            ))}
          </Animated.View>
        </View>

        {isdateSectionToggled && (
          <Animated.View className="h-1/3 w-full bg-emerald-400">
            <Text>Date</Text>
          </Animated.View>
        )}
      </GestureDetector>
    </View>
  );
}
