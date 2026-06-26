package expo.modules.appwidgetandroid.data

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.icu.text.SimpleDateFormat
import android.icu.util.ULocale
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.chrono.HijrahDate
import java.time.temporal.ChronoField
import java.util.Date

class AppDate {
    val daysInitials = listOf("M", "T", "W", "T", "F", "S", "S")
    private val arLocale: ULocale = ULocale("ar_AR@calendar=islamic-umalqura")
    private val enLocale: ULocale = ULocale("en_US@calendar=islamic-umalqura")
    val todayDate: Date = Date()

    // val timeStr: String = getDateWithCustomFormat("HH : mm")
    val arMonthStr: String = getDateWithCustomFormat("MMMM", arLocale)
    val enMonthStr: String = getDateWithCustomFormat("MMMM")
    val dateStr: String = getDateWithCustomFormat()

    private val todayDateHijrah = HijrahDate.now()
    val dayNumber = todayDateHijrah.get(ChronoField.DAY_OF_MONTH)
    val firstDayOfMonth = todayDateHijrah.with(ChronoField.DAY_OF_MONTH, 1)
    val firstDayPositionInWeek = firstDayOfMonth.get(ChronoField.DAY_OF_WEEK)
    val numDaysInMonth = todayDateHijrah.lengthOfMonth()
    private val daysList = MutableList<Int?>(35) { null }

    fun getDaysList() : MutableList<Int?> {
        for (index in (1..numDaysInMonth))
            daysList[firstDayPositionInWeek + index - 2] = index

        return daysList
    }

    fun getDateWithCustomFormat(pattern: String = "d MMMM y", dateLocal: ULocale = enLocale) : String {
        val customFormat = SimpleDateFormat(pattern, dateLocal)
        return customFormat.format(todayDate)
    }
}


fun setUpAlarm(context: Context) {
    val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
    val intent = Intent(context, DateAlarmReceiver::class.java)
    val pendingIntent = PendingIntent.getBroadcast(
        context,
        0,
        intent,
        PendingIntent.FLAG_IMMUTABLE
    )

    val actualTime = LocalDateTime.now()

    var targetTime = actualTime
        .withHour(16)
        .withMinute(35)
        .withSecond(0)

    if (targetTime.isBefore(actualTime))
        targetTime = targetTime.plusDays(1)

    val timeInMilli = targetTime
        .atZone(ZoneId.systemDefault())
        .toInstant()
        .toEpochMilli()

    alarmManager.setExact(
        AlarmManager.RTC_WAKEUP,
        timeInMilli,
        pendingIntent
    )
}