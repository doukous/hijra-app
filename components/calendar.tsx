import CalendarTable from "./calendarTable";
import { useEffect, useState } from "react";
import Header from "./calendarHeader";
import { DateType, MonthPropsType } from "@/modules/calendar-bridge/src/CalendarBridge.types";

export default function Calendar(
  {
    hijrahDate,
    pickedDay,
    onPickedDay: setPickedDay,
    monthProps,
    onPreviousMonthFn,
    onNextMonthFn
  }:
  {
    hijrahDate: DateType,
    monthProps: MonthPropsType,
    pickedDay: number,
    onPickedDay: (day: number) => void,
    onPreviousMonthFn: () => void,
    onNextMonthFn: () => void
  }) {
  const [calendarTable, setCalendarTable] = useState(new Array(35).fill(null));

  useEffect(() => {
    const table = buildArrayMonth();
    setCalendarTable(table);
  }, [hijrahDate]);

  const onPrevMonth = () => {
    setPickedDay(1)
    onPreviousMonthFn()
  }

  const onNextMonth = () => {
    setPickedDay(1)
    onNextMonthFn()
  }

  const buildArrayMonth = () => {
    const table = new Array(42).fill(null);

    for (let index = 0; index < monthProps.length; index++)
      table[index + monthProps.firstDayWeekPosition - 1] = index + 1;

    return table;
  };

  return (
    <>
      <Header
        hijrahDate={hijrahDate}
        toNextMonth={onNextMonth}
        toPreviousMonth={onPrevMonth}
      />

      <CalendarTable
        calendarArray={calendarTable}
        pickedDay={pickedDay}
        onDayPressed={(value) => setPickedDay(value)}
      />
    </>
  )
}
