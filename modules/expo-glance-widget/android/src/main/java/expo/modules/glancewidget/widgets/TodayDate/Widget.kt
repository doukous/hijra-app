package expo.modules.glancewidget.widgets.TodayDate

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.TextUnit
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
import androidx.glance.layout.Spacer
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.fillMaxWidth
import androidx.glance.layout.height
import androidx.glance.layout.padding
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextAlign
import androidx.glance.text.TextStyle
import androidx.glance.unit.ColorProvider
import expo.modules.glancewidget.R
import expo.modules.glancewidget.widgets.data.AppDate

class Widget: GlanceAppWidget() {
    override suspend fun provideGlance(context: Context, id: GlanceId) {
        val appDate = AppDate()

        provideContent {
            WidgetContent(appDate.dateStr, appDate.arMonthStr)
        }
    }

    @Composable
    fun WidgetContent(enDate: String, monthInArabic: String) {
        Column(
            GlanceModifier
                .fillMaxSize(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalAlignment = Alignment.CenterHorizontally

        ) {
            TextContent(
                monthInArabic,
                color = ColorProvider(Color.White, Color.White),
                fontWeight = FontWeight.Bold,
                textFontSize = 20.sp,
                modifier = GlanceModifier
                    .background(R.color.teal_700)
                    .padding(vertical = 4.dp, horizontal = 6.dp)
            )

            Spacer(
                GlanceModifier
                    .height(4.dp)
            )

            TextContent(
                enDate.uppercase(),
                modifier = GlanceModifier
                    .background(Color.White)
                    .padding(6.dp)
                    .fillMaxWidth()
            )
        }
    }

    @Composable
    private fun TextContent(
        text: String,
        fontWeight: FontWeight = FontWeight.Normal,
        color: ColorProvider = ColorProvider(Color.Black, Color.Black),
        textFontSize: TextUnit = 14.sp,
        modifier: GlanceModifier = GlanceModifier.Companion
    ) {
        Text(
            text,
            style = TextStyle(
                color = color,
                fontWeight = fontWeight,
                fontSize = textFontSize,
                textAlign = TextAlign.Center
            ),
            modifier = modifier
                .cornerRadius(12.dp)
        )
    }
}
