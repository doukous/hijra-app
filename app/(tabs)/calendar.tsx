import Header from "@/components/calendar/header";
import { GenericDateData } from "@/modules/calendar-bridge/src/CalendarBridge.types";
import CalendarBridgeModule from "@/modules/calendar-bridge/src/CalendarBridgeModule";
import { CustomDate, daysInitials } from "@/utils/date-helpers";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  LayoutChangeEvent,
  ScrollView,
} from "react-native";
// import { usePanGesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function CalendarScreen() {
  const customDate = new CustomDate();

  const [date, setDate] = useState<GenericDateData>(
    customDate.getGenericDate(),
  );

  const [calendarTable, setCalendarTable] = useState(new Array(35).fill(null));

  const containerHeight = useSharedValue(0);

  const positionY = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    containerHeight.value = height;
  };

  const animatedStyleTop = useAnimatedStyle(() => {
    const totalHeight = positionY.value + offsetY.value;
    const halfHeight = containerHeight.value / 2;

    const value = Math.min(
      containerHeight.value,
      Math.max(halfHeight, totalHeight),
    );

    return { height: value };
  });

  const animatedStyleBottom = useAnimatedStyle(() => {
    const totalHeight = positionY.value + offsetY.value;
    const halfHeight = containerHeight.value / 2;

    const value = Math.min(halfHeight, containerHeight.value - totalHeight);

    return { height: value };
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
    <ScrollView contentContainerClassName="gap-y-2 mt-2">
      <Header
        date={date}
        toPreviousMonth={customDate.previousMonth}
        toNextMonth={customDate.nextMonth}
      />

      <View className="items-center">
        <View className="flex-row items-center justify-center gap-1 w-full">
          {daysInitials.map((value, key) => (
            <Text key={key} className="text-black w-1/8 text-center">
              {value}
            </Text>
          ))}
        </View>

        <View className=" py-2 flex-row justify-center flex-wrap gap-1">
          {calendarTable.map((value, key) => (
            <View key={key} className="h-12 w-1/8 bg-gray-200 rounded-lg">
              <Text className="text-center">{value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="w-full gap-y-8 p-4">
        <View className="items-center">
          <Text className="text-xl font-medium m-4">
            {date.monthInEnglish.toUpperCase()} - {date.monthInArabic}
          </Text>
          <Text className="mx-2">
            Muharram is the first month of the Islamic lunar year and one of the
            four sacred months in Islam. It is often associated with reflection,
            renewal, and spiritual discipline.
          </Text>
        </View>

        <View className="px-2 gap-y-2">
          <Text className="text-xl font-medium">Some events of this month</Text>
          <View className="bg-amber-300 rounded-2xl h-24"></View>
          <View className="bg-amber-300 rounded-2xl h-24"></View>
          <View className="bg-amber-300 rounded-2xl h-24"></View>
          <View className="bg-amber-300 rounded-2xl h-24"></View>
        </View>
      </View>
    </ScrollView>
  );
}
