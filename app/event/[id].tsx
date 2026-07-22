import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { getEventById, getMonthName, EVENT_TYPE_COLORS } from "@/utils/events-helpers";
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
        <Text className="text-lg font-semibold">Événement introuvable</Text>
        <Text className="text-gray-500">Aucun événement ne correspond à l&apos;identifiant « {id} ».</Text>
      </View>
    );
  }

  const colors = EVENT_TYPE_COLORS[event.type];
  const monthName = getMonthName(event.hijriMonth);

  const gregorianDate =
    event.hijriDay !== null
      ? convertToGregorian(event.hijriDay, event.hijriMonth, hijrahDate.year)
      : null;

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
            <Text className="text-xs font-semibold uppercase tracking-wide">
              {colors.label}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900">{event.title}</Text>
        </View>

        <View className="rounded-xl bg-gray-50 p-4 gap-y-3">
          <View>
            <Text className="text-xs text-gray-500 uppercase tracking-wide">Date hégirienne</Text>
            <Text className="text-lg font-semibold text-gray-900">
              {event.hijriDay !== null ? `${event.hijriDay} ` : ""}{monthName} {event.hijriMonth}
            </Text>
          </View>
          {gregorianDate && (
            <View>
              <Text className="text-xs text-gray-500 uppercase tracking-wide">Équivalent grégorien</Text>
              <Text className="text-lg font-semibold text-gray-900">
                {gregorianDate.day} {gregorianDate.monthEnStr} {gregorianDate.year}
              </Text>
            </View>
          )}
        </View>

        <View className="gap-y-3">
          <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Détails
          </Text>
          {event.details.length > 0 ? (
            event.details.map((detail, key) => (
              <Text key={key} className="text-base text-gray-800 leading-6">
                {detail}
              </Text>
            ))
          ) : (
            <Text className="text-gray-500 italic">Aucun détail supplémentaire.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
