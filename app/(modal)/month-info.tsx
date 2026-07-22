import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import Markdown from "react-native-markdown-display";
import { useDate } from "@/utils/date-helpers";
import {
  EVENT_TYPE_COLORS,
  EventData,
  getAllEventsForMonth,
  getMonthByNumber,
  getMonthDescription,
  getMonthName,
} from "@/utils/events-helpers";

const formatHijriDate = (event: EventData): string => {
  if (event.date === null) return `Throughout ${event.monthName}`;
  return `${event.date} ${event.monthName}${event.year ? ` ${event.year}` : ""}`;
};

export default function MonthInfoModal() {
  const { month, year } = useLocalSearchParams<{ month?: string; year?: string }>();
  const { hijrahDate } = useDate();

  const monthNumber = month ? parseInt(month, 10) : hijrahDate.month;
  const monthYear = year ? parseInt(year, 10) : hijrahDate.year;

  const monthData = getMonthByNumber(monthNumber);
  const description = getMonthDescription(monthNumber);
  const monthName = getMonthName(monthNumber);
  const events = getAllEventsForMonth(monthNumber);

  const monthWideEvents = events.filter((e) => e.date === null);
  const dayEvents = events.filter((e) => e.date !== null);

  return (
    <>
      <Stack.Screen
        options={{
          title: `${monthName} ${monthYear} AH`,
        }}
      />
      <ScrollView
        className="bg-white"
        contentContainerClassName="px-5 py-4 gap-y-6"
      >
        {description ? (
          <Markdown
            style={{
              body: { color: "#1f2937", fontSize: 15, lineHeight: 22 },
              heading1: { fontSize: 20, fontWeight: "700", marginVertical: 8 },
              heading2: { fontSize: 18, fontWeight: "600", marginVertical: 6 },
              link: { color: "#0891b2" },
              list_item: { marginVertical: 2 },
              bullet_list: { marginVertical: 4 },
            }}
          >
            {description}
          </Markdown>
        ) : (
          <Text className="text-gray-500 italic">
            No description available for this month.
          </Text>
        )}

        {monthWideEvents.length > 0 && (
          <View className="gap-y-3">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Throughout the month
            </Text>
            {monthWideEvents.map((event) => {
              const colors = EVENT_TYPE_COLORS[event.type];
              return (
                <Pressable
                  key={event.id}
                  onPress={() => router.push(`/event/${event.id}`)}
                  className="rounded-lg border border-gray-200 p-3 gap-y-1 active:bg-gray-50"
                >
                  <View className={`self-start rounded-full px-2 py-0.5 ${colors.badge}`}>
                    <Text className={`text-[10px] font-semibold uppercase tracking-wide ${colors.text}`}>
                      {colors.label}
                    </Text>
                  </View>
                  <Text className="font-semibold text-base text-gray-900">
                    {event.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {dayEvents.length > 0 && (
          <View className="gap-y-3">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Events of this month
            </Text>
            {dayEvents.map((event) => {
              const colors = EVENT_TYPE_COLORS[event.type];
              return (
                <Pressable
                  key={event.id}
                  onPress={() => router.push(`/event/${event.id}`)}
                  className="rounded-lg border border-gray-200 p-3 gap-y-1 active:bg-gray-50"
                >
                  <View className={`self-start rounded-full px-2 py-0.5 ${colors.badge}`}>
                    <Text className={`text-[10px] font-semibold uppercase tracking-wide ${colors.text}`}>
                      {colors.label}
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-500">{formatHijriDate(event)}</Text>
                  <Text className="font-semibold text-base text-gray-900">
                    {event.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {events.length === 0 && (
          <Text className="text-gray-500 italic">No events recorded for this month.</Text>
        )}

        {monthData && (
          <View className="pt-4 border-t border-gray-200">
            <Text className="text-xs text-gray-500 uppercase tracking-wide">Slug</Text>
            <Text className="text-sm text-gray-700">{monthData.slug}</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}
