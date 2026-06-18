package expo.modules.glancewidget.widgets.TodayDate

import android.appwidget.AppWidgetManager
import android.content.Context
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import expo.modules.glancewidget.widgets.data.setUpAlarm
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class Receiver: GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget
        get() = Widget()

    override fun onEnabled(context: Context) {
        setUpAlarm(context)
        super.onEnabled(context)
    }
}
