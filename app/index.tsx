import { useDate, todayDate, daysInitials, getMonthTable } from "@/utils/date-helpers";
import {
  EVENT_TYPE_COLORS,
  getDaysWithEvents,
  getEventsForDay,
} from "@/utils/events-helpers";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { ChevronLeft, ChevronRight, Info, Menu } from "lucide-react-native";


export default function CalendarScreen() {
  const { hijrahDate, gregorianDate, monthProps, setDate } = useDate()

  const calendarTable = getMonthTable(monthProps.firstDayWeekPosition, monthProps.length)
  const daysWithEvents = getDaysWithEvents(hijrahDate.month)
  const dayEvents = getEventsForDay(hijrahDate.month, hijrahDate.day)

  const onPreviousMonth = () => {
    const hijrahMonth = hijrahDate.month === 1 ? 12 : hijrahDate.month - 1
    const hijrahYear = hijrahDate.month === 1 ? hijrahDate.year - 1 : hijrahDate.year

    setDate(1, hijrahMonth, hijrahYear)
  }

  const onNextMonth = () => {
    const hijrahMonth = hijrahDate.month === 12 ? 1 : hijrahDate.month + 1
    const hijrahYear = hijrahDate.month === 12 ? hijrahDate.year + 1 : hijrahDate.year

    setDate(1, hijrahMonth, hijrahYear)
  }

  const onTodayDate = () =>
    setDate(todayDate.day, todayDate.month, todayDate.year)

  return (
    <View className="gap-y-1 w-14/15 mx-auto my-2">
      <View className="flex-row justify-between">
        <Link href="/settings" className="mr-auto rounded-full p-2 bg-white">
          <Menu />
        </Link>

        <Pressable
          className="rounded-full bg-white p-2"
          onPress={ onTodayDate }
        >
          <Text className="border-2 rounded-lg px-2 text-center font-bold">{todayDate.day}</Text>
        </Pressable>
      </View>

      <View className="w-full mx-auto mt-4 flex-row items-center justify-between">
        <Pressable
          className="rounded-full p-1 bg-white"
          onPress={ onPreviousMonth }
        >
          <ChevronLeft />
        </Pressable>

        <View className="w-3/4 flex-row justify-between">
          <View className="w-3/5 h-8 gap-x-1 flex-row">
            <View className="w-3/4 h-auto bg-white rounded-xl">
              <Text className="text-center my-auto text-lg">
                {hijrahDate.monthEnStr}
              </Text>
            </View>

            <Pressable
              className="h-auto px-3 items-center justify-center rounded-xl bg-white"
              onPress={() =>
                router.push(
                  `/(modal)/month-info?month=${hijrahDate.month}&year=${hijrahDate.year}`
                )
              }
            >
              <Info />
            </Pressable>
          </View>

          <View className="h-auto w-24 bg-white rounded-xl">
            <Text className="text-center my-auto text-lg">
              {hijrahDate.year} AH
            </Text>
          </View>
        </View>

        <Pressable
          onPress={ onNextMonth }
          className="rounded-full p-1 bg-white"
        >
          <ChevronRight />
        </Pressable>
      </View>

      <View className="rounded-xl bg-white p-2 mt-8">
        <View className="flex-row justify-between px-2">
          {
            daysInitials.map((day, key) => (
              <Text className="w-12 text-center" key={key}>
                { day }
              </Text>
            ))
          }
        </View>

        <View className="w-full flex-col gap-y-2 p-2">
          {
            calendarTable.map((row, key) =>
            (
              <View className="flex-row justify-between" key={key}>
                {
                  row.map((col, key) => (
                    <Pressable
                      key={key}
                      className="size-12 rounded-xl items-center justify-center"
                      onPress={() => col !== null && setDate(col, hijrahDate.month, hijrahDate.year)}
                    >
                      {
                        hijrahDate.day !== col ?
                          <View className="relative size-2/3 items-center justify-center">
                            <Text className="text-center my-auto p-2">{col}</Text>
                            {col !== null && daysWithEvents.has(col) && (
                              <View className="absolute bottom-1 size-1.5 rounded-full bg-amber-500" />
                            )}
                          </View>
                          :
                          <View className="relative size-2/3 items-center justify-center rounded-full bg-cyan-500">
                            <Text className="text-white">{col}</Text>
                            {col !== null && daysWithEvents.has(col) && (
                              <View className="absolute bottom-1 size-1.5 rounded-full bg-white" />
                            )}
                          </View>
                      }
                    </Pressable>
                  )
                )}
              </View>
            ))}
        </View>
      </View>

      <ScrollView className="w-full h-1/3 p-2 gap-y-6 bg-white rounded-xl">
        <View>
          <Text className="font-bold text-xl">{hijrahDate.day} {hijrahDate.monthEnStr} {hijrahDate.year} AH</Text>
          <Text>{gregorianDate.day} / {gregorianDate.month} / {gregorianDate.year}</Text>
        </View>
        <View className="gap-y-3">
          {dayEvents.length === 0 ? (
            <Text className="text-gray-500 italic">No events for this day.</Text>
          ) : (
            dayEvents.map((event) => {
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
                  <Text className="font-semibold text-base text-gray-900">{event.title}</Text>
                </Pressable>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}
