import Header from "@/components/calendar/header";
import { GenericDateData } from "@/modules/calendar-bridge/src/CalendarBridge.types";
import CalendarBridgeModule from "@/modules/calendar-bridge/src/CalendarBridgeModule";
import { CustomDate, daysInitials } from "@/utils/date-helpers";
import { useEffect, useState } from "react";
import { View, Text, Pressable, LayoutChangeEvent } from "react-native";
import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
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

  const adjustTranslation = (translateValue: number) => {
    "worklet";
    return translateValue / 1;
  };

  const panGesture = usePanGesture({
    activeOffsetY: [-4, 4],

    onUpdate: (e) => {
      "worklet";
      positionY.value = adjustTranslation(e.translationY);
    },

    onDeactivate: (e) => {
      "worklet";
      const totalHeight = offsetY.value + adjustTranslation(e.translationY);

      if (totalHeight > (3 / 4) * containerHeight.value)
        offsetY.value = containerHeight.value - 20;
      else offsetY.value = containerHeight.value / 2;

      positionY.value = 0;
    },
  });

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
    <View className="flex-1 gap-y-2 mt-2">
      <Header
        date={date}
        toPreviousMonth={customDate.previousMonth}
        toNextMonth={customDate.nextMonth}
      />
      <View className="flex-1 w-full h-full flex-col">
        <GestureDetector gesture={panGesture}>
          <View
            onLayout={handleLayout}
            className="h-full justify-between items-center"
          >
            <View className="flex-row gap-x-0.5 rounded-xl bg-emerald-500">
              {daysInitials.map((value, key) => (
                <Text key={key} className="text-white text-center w-[13%]">
                  {value}
                </Text>
              ))}
            </View>

            <Animated.View
              style={animatedStyleTop}
              className="flex flex-row flex-wrap justify-center items-center gap-0.5 pt-1 pb-4 bg-cyan-400"
            >
              {calendarTable.map((value, key) => (
                <Animated.View
                  key={key}
                  className="bg-blue-700 rounded-lg w-[13%] h-1/6"
                >
                  <Pressable className="w-full">
                    <Text className="text-white align-middle mx-auto">
                      {value}
                    </Text>
                  </Pressable>
                </Animated.View>
              ))}
            </Animated.View>

            <Animated.View
              style={animatedStyleBottom}
              className="bg-emerald-500 w-full items-center"
            >
              <Text>Box de la date</Text>
              <Text>{`${customDate.todayDate.day} ${customDate.todayDate.monthInEnglish} ${customDate.todayDate.year} AH`}</Text>
            </Animated.View>
          </View>
        </GestureDetector>
      </View>
    </View>
  );
}
