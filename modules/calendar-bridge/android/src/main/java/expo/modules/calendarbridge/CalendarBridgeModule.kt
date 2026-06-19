package expo.modules.calendarbridge

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

import androidx.core.os.bundleOf
import android.os.Bundle
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.chrono.HijrahDate
import java.time.temporal.ChronoField
import java.time.temporal.ChronoUnit
import java.util.Date
import java.time.format.DateTimeFormatter
import java.util.Locale

class CalendarBridgeModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("CalendarBridge")

        Events("onDateChange")

        Function("getTodayDate") {
            return@Function getTodayDateData()
        }

        Function("getGenericDateInfos") {
            return@Function getGenericDateData()
        }

        Function("setToPreviousMonth") {
            genericDate = genericDate.minus(1, ChronoUnit.MONTHS)
            this@CalendarBridgeModule.sendEvent("onDateChange", getGenericDateData())
        }

        Function("setToNextMonth") {
            genericDate = genericDate.plus(1, ChronoUnit.MONTHS)
            this@CalendarBridgeModule.sendEvent("onDateChange", getGenericDateData())
        }
    }

    private val todayDate = HijrahDate.now()
    private var genericDate = HijrahDate.now().with(ChronoField.DAY_OF_MONTH, 1)

    private fun getDateWithCustomFormat(date: HijrahDate, pattern: String = "d MMMM y", locale: String = "en") : String {
        val formatter = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.forLanguageTag(locale))
        return formatter.format(date)
    }

    private fun getTodayDateData() : Bundle {
        return bundleOf(
            "day" to getDateWithCustomFormat(todayDate, "d").toInt(),
            "monthInArabic" to getDateWithCustomFormat(todayDate, "MMMM", "ar"),
            "monthInEnglish" to getDateWithCustomFormat(todayDate, "MMMM"),
            "year" to getDateWithCustomFormat(todayDate, "y").toInt()
        )
    }

    private fun getLengthOfMonth() : Int {
        return genericDate.lengthOfMonth()
    }

    private fun getPositionOfFirstDayInWeek() : Int {
        return genericDate.get(ChronoField.DAY_OF_WEEK)
    }

    private fun getGenericDateData() : Bundle {
        return bundleOf(
            "numberOfDays" to getLengthOfMonth(),
            "positionOfFirstDayInWeek" to getPositionOfFirstDayInWeek(),
            "monthInArabic" to getDateWithCustomFormat(genericDate, "MMMM", "ar"),
            "monthInEnglish" to getDateWithCustomFormat(genericDate, "MMMM"),
            "year" to getDateWithCustomFormat(genericDate, "y").toInt()
        )
    }
}
