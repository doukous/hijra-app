export type CalendarBridgeModuleEvents = {
  onDateChange: (params: GenericDateData) => void;
};

export type GenericDateData = {
  numberOfDays: number;
  positionOfFirstDayInWeek: number;
  monthInArabic: string;
  monthInEnglish: string;
  year: number;
};

export type TodayDateData = {
  day: number;
  monthInArabic: string;
  monthInEnglish: string;
  year: number;
};
