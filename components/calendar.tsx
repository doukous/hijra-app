import CalendarTable from "./calendarTable";
import Header from "./calendarHeader";
import { useCalendar } from "@/contexts/CalendarContext";
import { TOTAL_DAYS } from "@/utils/constants";
import { MonthPropsType } from "@/modules/calendar-bridge/src/CalendarBridge.types";

const buildArrayMonth = (monthProps: MonthPropsType) => {
  const table = new Array(TOTAL_DAYS).fill(null);

  for (let index = 0; index < monthProps.length; index++)
    table[index + monthProps.firstDayWeekPosition - 1] = index + 1;

  return table;
};

export default function Calendar() {
  const {
    hijrahDate,
    pickedDay,
    onPickedDay,
    monthProps,
    onPreviousMonth,
    onNextMonth
  } = useCalendar();

  const onPrevMonthFn = () => {
    onPickedDay(1)
    onPreviousMonth()
  }

  const onNextMonthFn = () => {
    onPickedDay(1)
    onNextMonth()
  }

  return (
    <>
      <Header
        hijrahDate={hijrahDate}
        toNextMonth={onNextMonthFn}
        toPreviousMonth={onPrevMonthFn}
      />

      <CalendarTable
        calendarArray={buildArrayMonth(monthProps)}
        pickedDay={pickedDay}
        onDayPressed={(value) => onPickedDay(value)}
      />
    </>
  )
}
