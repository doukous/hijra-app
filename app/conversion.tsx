import { DateType } from "@/modules/calendar-bridge/src/CalendarBridge.types";
import { useDate } from "@/utils/date-helpers";
import { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";

export default function ConversionScreen() {
  const { convertToHijri, convertToGregorian, hijrahDate } = useDate()
  const [convertedDate, setConvertedDate] = useState<DateType | null>(null)

  const monthsStrList = [
    "Muharram",
    "Safar",
    "Rabiʻ I",
    "Rabiʻ II",
    "Jumada I",
    "Jumada II",
    "Rajab",
    "Shaʻban",
    "Ramadan",
    "Shawwal",
    "Dhuʻl-Qiʻdah",
    "Dhuʻl-Hijjah"
  ]

  const monthNumbers = new Array(30).fill(null).map((_, key) => key + 1)
  const yearNumbers = new Array(20).fill(null).map((_, key) => (1435 + key))

  return (
    <View className="gap-y-4">
      <Text>Conversion Screen</Text>

      <Text>
        Converted day: {
          convertedDate !== null ?
          `${convertedDate?.day} ${convertedDate?.monthEnStr} ${convertedDate?.year}`
          :
          "-"
        }
      </Text>

      <View className="flex-row w-full justify-around">
        <Box list={monthNumbers} />
        <Box list={monthsStrList} />
        <Box list={yearNumbers} />
      </View>
    </View>
  )
}

function Box({ list }: { list: any[] }) {
  const [listOpened, setListOpened] = useState(false)
  const [pickedItem, setPickedItem] = useState(list[0])

  return (
    <View className="relative rounded-md w-1/4 h-10">
      <View className="border-2 rounded-xl">
        <Text className="text-center p-2">{ pickedItem }</Text>
      </View>
      {
        listOpened &&
        <ScrollView
          className="rounded-md absolute w-full h-48 border-2 top-12 z-10"
          showsVerticalScrollIndicator={false}
        >
        {
          list.map(
            (value, key) => (
              <Pressable
                key={key}
                className="py-2"
                onPress={() => null}
              >
                <Text className="text-center">{value}</Text>
              </Pressable>
            )
          )
        }
        </ScrollView>
      }
    </View>
  )
}
