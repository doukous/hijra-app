import CalendarTable from "@/components/calendar/CalendarTable";
import Header from "@/components/calendar/header";
import { GenericDateData } from "@/modules/calendar-bridge/src/CalendarBridge.types";
import CalendarBridgeModule from "@/modules/calendar-bridge/src/CalendarBridgeModule";
import { CustomDate, daysInitials } from "@/utils/date-helpers";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

export default function CalendarScreen() {
  const customDate = new CustomDate();

  const [date, setDate] = useState<GenericDateData>(
    customDate.getGenericDate(),
  );

  const [calendarTable, setCalendarTable] = useState(new Array(35).fill(null));

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-y-2 mt-2"
    >
      <Header
        date={date}
        toPreviousMonth={customDate.previousMonth}
        toNextMonth={customDate.nextMonth}
      />

      <CalendarTable calendarArray={calendarTable} />

      <View className="w-full gap-y-8 p-4">
        <View className="items-center">
          <Text className="text-xl font-montserrat-medium m-4">
            {date.monthInEnglish.toUpperCase()} - {date.monthInArabic}
          </Text>
          <Text className="mx-2 font-inter">
            Muharram is the first month of the Islamic lunar year and one of the
            four sacred months in Islam. It is often associated with reflection,
            renewal, and spiritual discipline.
          </Text>
        </View>

        <View className="px-2 gap-y-2">
          <Text className="text-xl font-montserrat-medium">
            Some events of this month
          </Text>
          <View className="bg-amber-300 rounded-2xl h-24"></View>
          <View className="bg-amber-300 rounded-2xl h-24"></View>
          <View className="bg-amber-300 rounded-2xl h-24"></View>
        </View>
      </View>
    </ScrollView>
  );
}
