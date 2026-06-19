import { TodayDateData } from "@/modules/calendar-bridge/src/CalendarBridge.types";
import CalendarBridge from "@/modules/calendar-bridge/src/CalendarBridgeModule";

export const daysInitials = ["M", "T", "W", "T", "F", "S", "D"];

export class CustomDate {
  todayDate: TodayDateData;

  constructor() {
    this.todayDate = CalendarBridge.getTodayDate();
  }

  getTodayDate() {
    return CalendarBridge.getTodayDate();
  }

  getGenericDate() {
    return CalendarBridge.getGenericDateInfos();
  }

  previousMonth() {
    CalendarBridge.setToPreviousMonth();
  }

  nextMonth() {
    CalendarBridge.setToNextMonth();
  }
}
