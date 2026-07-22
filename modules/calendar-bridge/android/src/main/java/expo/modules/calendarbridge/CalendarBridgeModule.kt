package expo.modules.calendarbridge

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

import java.time.chrono.HijrahDate
import java.time.temporal.ChronoField
import java.time.temporal.ChronoUnit
import java.time.format.DateTimeFormatter
import java.time.LocalDate


class MonthProps(
    @Field val length: Int = 0,
    @Field val firstDayWeekPosition: Int = 1
): Record

class Date(
    @Field val day: Int = 1,
    @Field val month: Int = 1,
    @Field val year: Int = 1,
    @Field val monthEnStr: String = ""
): Record

class DateHelper {
    companion object {
        val today = HijrahDate.now()

        val todayDate: Date
        get() = Date(
            day = today.get(ChronoField.DAY_OF_MONTH),
            month = today.get(ChronoField.MONTH_OF_YEAR),
            year = today.get(ChronoField.YEAR),
            monthEnStr = DateHelper.formatHijrahDate("MMMM", today)
        )

        fun getMonthProps(calendar: String, month: Int, year: Int): MonthProps {
            val date = if (calendar == "hijri") HijrahDate.of(year, month, 1) else LocalDate.of(year, month, 1)

            return MonthProps(
                length = date.lengthOfMonth(),
                firstDayWeekPosition = date.get(ChronoField.DAY_OF_WEEK)
            )
        }

        fun formatHijrahDate(pattern: String, date: HijrahDate): String {
            val dateFormatter = DateTimeFormatter.ofPattern(pattern)
            return date.format(dateFormatter)
        }

        fun formatGregorianDate(pattern: String, date: LocalDate): String {
            val dateFormatter = DateTimeFormatter.ofPattern(pattern)
            return date.format(dateFormatter)
        }

        fun convertGregorianToHijri(day: Int, month: Int, year: Int): Date {
            val gregorianDate = LocalDate.of(year, month, day)
            val hijrahDate = HijrahDate.from(gregorianDate)

            return Date(
                day = hijrahDate.get(ChronoField.DAY_OF_MONTH),
                month = hijrahDate.get(ChronoField.MONTH_OF_YEAR),
                year = hijrahDate.get(ChronoField.YEAR),

                monthEnStr = DateHelper.formatHijrahDate("MMMM", hijrahDate)
            )
        }

        fun convertHijriToGregorian(day: Int, month: Int, year: Int): Date {
            val hijrahDate = HijrahDate.of(year, month, day)
            val gregorianDate = LocalDate.from(hijrahDate)

            return Date(
                day = gregorianDate.get(ChronoField.DAY_OF_MONTH),
                month = gregorianDate.get(ChronoField.MONTH_OF_YEAR),
                year = gregorianDate.get(ChronoField.YEAR),

                monthEnStr = DateHelper.formatGregorianDate("MMMM", gregorianDate)
            )
        }
    }

    var hijrahDate: HijrahDate = HijrahDate.now()

    var gregorianDate: LocalDate
        get() = LocalDate.from(hijrahDate)
        set(value) {
            hijrahDate = HijrahDate.from(value)
        }

    val monthProps: MonthProps
        get() = MonthProps(
            length = hijrahDate.lengthOfMonth(),
            firstDayWeekPosition = hijrahDate
                .with(ChronoField.DAY_OF_MONTH, 1)
                .get(ChronoField.DAY_OF_WEEK)
        )

    fun setDate(day: Int, month: Int, year: Int) {
        hijrahDate = HijrahDate.of(year, month, day)
    }

    fun setToPreviousMonth() {
        hijrahDate = hijrahDate
            .minus(1, ChronoUnit.MONTHS)
            .with(ChronoField.DAY_OF_MONTH, 1)
    }

    fun setToNextMonth() {
        hijrahDate = hijrahDate
            .plus(1, ChronoUnit.MONTHS)
            .with(ChronoField.DAY_OF_MONTH, 1)
    }
}

class CalendarBridgeModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("CalendarBridge")

        Events("onDateChange")

        Property("todayDate") {
            DateHelper.todayDate
        }

        Property("gregorianDate") {
            val date = Date(
                day = genericDate.gregorianDate.get(ChronoField.DAY_OF_MONTH),
                month = genericDate.gregorianDate.get(ChronoField.MONTH_OF_YEAR),
                year = genericDate.gregorianDate.get(ChronoField.YEAR),
                monthEnStr = DateHelper
                    .formatGregorianDate("MMMM", genericDate.gregorianDate)
            )

            date
        }

        Property("hijrahDate") {
            val date = Date(
                day = genericDate.hijrahDate.get(ChronoField.DAY_OF_MONTH),
                month = genericDate.hijrahDate.get(ChronoField.MONTH_OF_YEAR),
                year = genericDate.hijrahDate.get(ChronoField.YEAR),
                monthEnStr = DateHelper
                    .formatHijrahDate("MMMM", genericDate.hijrahDate)
            )

            date
        }

        Property("monthProps") {
            genericDate.monthProps
        }

        Function("getMonthProps") {
            calendar: String, month: Int, year: Int -> DateHelper
            .getMonthProps(calendar, month, year)
        }

        Function("setDate") {
            day: Int, month: Int, year: Int ->
            genericDate.setDate(day, month, year)
            this@CalendarBridgeModule.sendEvent("onDateChange")
        }

        Function("setToPreviousMonth") {
            genericDate.setToPreviousMonth()
            this@CalendarBridgeModule.sendEvent("onDateChange")
        }

        Function("setToNextMonth") {
            genericDate.setToNextMonth()
            this@CalendarBridgeModule.sendEvent("onDateChange")
        }

        Function("convertHijriToGregorian") {
            day: Int, month: Int, year: Int -> DateHelper.convertHijriToGregorian(
                day, month, year
            )
        }

        Function("convertGregorianToHijri") {
            day: Int, month: Int, year: Int -> DateHelper.convertGregorianToHijri(
                day, month, year
            )
        }
    }

    private val genericDate = DateHelper()
}
