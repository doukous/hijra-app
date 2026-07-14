import Calendar from "@/components/calendar";
import { useDate, todayDate } from "@/utils/date-helpers";
import { View } from "react-native";
import { CalendarProvider } from "@/contexts/CalendarContext";
import CalendarToolbar from "@/components/CalendarToolbar";
import DateDetails from "@/components/DateDetails";
import { useEffect, useRef, useState } from "react";

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
  const prevMonthRef = useRef(hijrahDate.month);
  const prevYearRef = useRef(hijrahDate.year);

  useEffect(() => {
    if (hijrahDate.month !== prevMonthRef.current || hijrahDate.year !== prevYearRef.current) {
      setPickedDay(1);
      prevMonthRef.current = hijrahDate.month;
      prevYearRef.current = hijrahDate.year;
    }
  }, [hijrahDate.month, hijrahDate.year]);

  const calendarValue = {
    hijrahDate,
    monthProps,
    pickedDay,
    onPickedDay: (value: number) => {
      setDate(value, hijrahDate.month, hijrahDate.year)
      setPickedDay(value)
    },
    onPreviousMonth: setToPreviousMonth,
    onNextMonth: setToNextMonth,
  };

  return (
    <View className="gap-y-2">
      <CalendarToolbar />

      <CalendarProvider value={calendarValue}>
        <Calendar />
      </CalendarProvider>

      <DateDetails hijrahDate={hijrahDate} gregorianDate={gregorianDate} />
    </View>
  );
}
