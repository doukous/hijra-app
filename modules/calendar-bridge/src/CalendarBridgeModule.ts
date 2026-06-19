import { NativeModule, requireNativeModule } from "expo";

import {
  CalendarBridgeModuleEvents,
  GenericDateData,
  TodayDateData,
} from "./CalendarBridge.types";

declare class CalendarBridgeModule extends NativeModule<CalendarBridgeModuleEvents> {
  getTodayDate(): TodayDateData;
  getGenericDateInfos(): GenericDateData;

  setToPreviousMonth(): void;
  setToNextMonth(): void;
}

export default requireNativeModule<CalendarBridgeModule>("CalendarBridge");
