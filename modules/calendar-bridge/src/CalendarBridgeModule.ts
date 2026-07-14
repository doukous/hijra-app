import { NativeModule, requireNativeModule } from "expo";

import {
  CalendarBridgeModuleEvents,
  DateType,
  MonthPropsType
} from "./CalendarBridge.types";

declare class CalendarBridgeModule extends NativeModule<CalendarBridgeModuleEvents> {
  todayDate: DateType;
  hijrahDate: DateType;
  gregorianDate: DateType;
  monthProps: MonthPropsType;

  setDate(day: number, month: number, year: number): void;
  setToPreviousMonth(): void;
  setToNextMonth(): void;
  convertGregorianToHijri(day: number, month: number, year: number): DateType;
  convertHijriToGregorian(day: number, month: number, year: number): DateType;
}

export default requireNativeModule<CalendarBridgeModule>("CalendarBridge");
