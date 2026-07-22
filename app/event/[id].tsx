import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import {
  EVENT_TYPE_COLORS,
  getEventById,
  getMonthName,
} from "@/utils/events-helpers";
import { useDate } from "@/utils/date-helpers";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { convertToGregorian, hijrahDate } = useDate();

  const event = id ? getEventById(id) : undefined;

  if (!event) {
    return (
      <View className="flex-1 bg-white p-4 gap-y-4">
        <Pressable
          onPress={() => router.back()}
          className="rounded-full p-2 bg-gray-100 self-start"
        >
          <ChevronLeft />
        </Pressable>
        <Text className="text-lg font-semibold">Event not found</Text>
        <Text className="text-gray-500">No event matches the id &ldquo;{id}&rdquo;.</Text>
      </View>
    );
  }

  const colors = EVENT_TYPE_COLORS[event.type];
  const monthName = getMonthName(event.monthNumber);

  const gregorianDate =
    event.date !== null
      ? convertToGregorian(event.date, event.monthNumber, hijrahDate.year)
      : null;

  const hijriDateLabel =
    event.date !== null
      ? `${event.date} ${monthName}${event.year ? ` ${event.year}` : ""}`
      : `Throughout ${monthName}`;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center px-4 pt-4 pb-2">
        <Pressable
          onPress={() => router.back()}
          className="rounded-full p-2 bg-gray-100"
        >
          <ChevronLeft />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerClassName="pb-8 gap-y-5">
        <View className="gap-y-2">
          <View className={`self-start rounded-full px-3 py-1 ${colors.badge}`}>
            <Text className={`text-xs font-semibold uppercase tracking-wide ${colors.text}`}>
              {colors.label}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900">{event.title}</Text>
        </View>

        <View className="rounded-xl bg-gray-50 p-4 gap-y-3">
          <View>
            <Text className="text-xs text-gray-500 uppercase tracking-wide">Hijri date</Text>
            <Text className="text-lg font-semibold text-gray-900">{hijriDateLabel}</Text>
          </View>
          {gregorianDate && (
            <View>
              <Text className="text-xs text-gray-500 uppercase tracking-wide">Gregorian equivalent</Text>
              <Text className="text-lg font-semibold text-gray-900">
                {gregorianDate.day} {gregorianDate.monthEnStr} {gregorianDate.year}
              </Text>
            </View>
          )}
        </View>

        <View className="gap-y-3">
          <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Details
          </Text>
          <Text className="text-base text-gray-800 leading-6">
            {event.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
