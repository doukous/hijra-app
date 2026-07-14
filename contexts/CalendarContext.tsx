import { createContext, useContext, ReactNode } from "react";
import { DateType, MonthPropsType } from "@/modules/calendar-bridge/src/CalendarBridge.types";

export interface CalendarContextType {
  hijrahDate: DateType;
  monthProps: MonthPropsType;
  pickedDay: number;
  onPickedDay: (day: number) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider = ({
  children,
  value
}: {
  children: ReactNode;
  value: CalendarContextType;
}) => (
  <CalendarContext.Provider value={value}>
    {children}
  </CalendarContext.Provider>
);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
