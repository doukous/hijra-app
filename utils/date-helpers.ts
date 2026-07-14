import { DateType } from "@/modules/calendar-bridge/src/CalendarBridge.types";
import CalendarBridge from "@/modules/calendar-bridge/src/CalendarBridgeModule";
import { useEffect, useState } from "react";

export const daysInitials = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


class DateHelper {
  get hijrahDate() {
    return CalendarBridge.hijrahDate
  }

  get gregorianDate() {
    return CalendarBridge.gregorianDate
  }

  get monthProps() {
    return CalendarBridge.monthProps
  }

  setDate(day: number, month: number, year: number) {
    CalendarBridge.setDate(day, month, year)
  }

  setPreviousMonth() {
    CalendarBridge.setToPreviousMonth()
  }

  setNextMonth() {
    CalendarBridge.setToNextMonth()
  }


  static convertToHijri(day: number, month: number, year: number): DateType {
    return CalendarBridge.convertGregorianToHijri(day, month, year)
  }

  static convertToGregorian(day: number, month: number, year: number): DateType {
    return CalendarBridge.convertHijriToGregorian(day, month, year)
  }
}

export const todayDate = CalendarBridge.todayDate

export const useDate = () => {
  const date = new DateHelper()

  const [hijrahDate, setHijraDate] = useState(date.hijrahDate)
  const [gregorianDate, setGregorianDate] = useState(date.gregorianDate)
  const [monthProps, setMonthProps] = useState(date.monthProps)

  useEffect(() => {
    const listener = CalendarBridge.addListener(
      "onDateChange",
      () => {
        setGregorianDate(date.gregorianDate)
        setHijraDate(date.hijrahDate)
        setMonthProps(date.monthProps)
    })

    return () => listener.remove()
  }, [])

  const setToPreviousMonth = () => {
    date.setPreviousMonth()
  }

  const setDate = (day: number, month: number, year: number) => {
    date.setDate(day, month, year)
  }

  const setToNextMonth = () => {
    date.setNextMonth()
  }

  const convertToHijri = (day: number, month: number, year: number) => {
    return DateHelper.convertToHijri(day, month, year)
  }

  const convertToGregorian = (day: number, month: number, year: number) => {
    return DateHelper.convertToGregorian(day, month, year)
  }
  return {
    hijrahDate,
    gregorianDate,
    monthProps,
    setDate,
    setToNextMonth,
    setToPreviousMonth,
    convertToGregorian,
    convertToHijri
  }
}
