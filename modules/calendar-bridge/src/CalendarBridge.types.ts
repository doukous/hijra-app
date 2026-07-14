export type CalendarBridgeModuleEvents = {
  onDateChange: () => void;
};

export type MonthPropsType = {
  length: number;
  firstDayWeekPosition: number
}

export type DateType = {
  day: number;
  month: number;
  year: number;

  monthEnStr: string
};
