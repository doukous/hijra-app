package expo.modules.appwidgetandroid.GeneralCalendar

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.cornerRadius
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.color.ColorProvider
import androidx.glance.layout.Alignment
import androidx.glance.layout.Column
import androidx.glance.layout.Row
import androidx.glance.layout.Spacer
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.fillMaxWidth
import androidx.glance.layout.height
import androidx.glance.layout.size
import androidx.glance.layout.width
import androidx.glance.text.Text
import androidx.glance.text.TextAlign
import androidx.glance.text.TextStyle
import expo.modules.appwidgetandroid.R
import expo.modules.appwidgetandroid.data.AppDate


class Widget: GlanceAppWidget() {
    override suspend fun provideGlance(context: Context, id: GlanceId) {
        val appDate = AppDate()

        provideContent {
            WidgetContent(appDate)
        }
    }

    @Composable
    fun WidgetContent(appDate: AppDate) {
        Column(
            verticalAlignment = Alignment.CenterVertically,
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = GlanceModifier
                .background(Color.White)
                .fillMaxSize()
        ) {

            CalendarHeader(appDate.enMonthStr, appDate.arMonthStr)
            CalendarTable(appDate.daysInitials, appDate.getDaysList(), appDate.dayNumber)
        }
    }

    @Composable
    fun CalendarHeader(enMonth: String, arMonth: String) {
        Row(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = GlanceModifier
                .fillMaxWidth()
                .height(24.dp)
        ){
            Text(
                enMonth.uppercase(),
            )

            Spacer(
                GlanceModifier
                    .width(24.dp)
            )

            Text(
                arMonth,
                style = TextStyle(
                    fontSize = 16.sp
                )
            )
        }
    }

    @Composable
    fun CalendarTable(daysInitials: List<String>, daysList: MutableList<Int?>, currentDayNumber: Int) {
        Row(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            daysInitials.map { letter ->
                Text(
                    letter,
                    style = TextStyle(
                        textAlign = TextAlign.Center,
                        color = ColorProvider(day=Color.Gray, night=Color.Gray)
                    ),
                    modifier = GlanceModifier
                        .size(24.dp)
                )
            }
        }

        (0..4).map { week ->
            Column(modifier = GlanceModifier) {
                Row(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    daysList
                        .subList(week * 7, (week + 1) * 7)
                        .map { day ->
                            if (day == currentDayNumber)
                                Text(
                                    day.toString(),
                                    style = TextStyle(
                                        textAlign = TextAlign.Center,
                                        color = ColorProvider(day=Color.White, night = Color.White)
                                    ),
                                    modifier = GlanceModifier
                                        .size(24.dp)
                                        .background(R.color.teal_700)
                                        .cornerRadius(8.dp)
                                )
                            else
                                Text(
                                    day?.toString() ?: "",
                                    style = TextStyle(textAlign = TextAlign.Center),
                                    modifier = GlanceModifier
                                        .size(24.dp)
                                )
                        }
                }
            }
        }
    }
}