import { CustomDate } from "@/utils/date-helpers";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image"
import { ChevronRight, Info } from "lucide-react-native";

export default function HomeScreen() {
  const customDate = new CustomDate();
  const todayDate = customDate.getTodayDate();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View className="relative">
        <Image
          source={{ uri: "home_background" }}
          style={{ width: 450, height: 450 }}
        />

        <Text className="absolute w-full top-30 text-center text-2xl font-oldenburg text-blue-900">{`${todayDate.day} ${todayDate.monthInEnglish} ${todayDate.year}`}</Text>
      </View>

      <View className="gap-y-8 mb-4">
        <View className="w-full items-center gap-y-3">
          <Text className="font-opens-sans-semibold text-lg text-blue-900">Today&apos;s Event</Text>

          <View className="flex-row items-center gap-x-4">
            <Text className="font-oleo-script-bold text-2xl text-emerald-600">Eid Al Fitr</Text>
            <Info color={"#289785"} />
          </View>
        </View>

        <View className="w-full items-center gap-y-4">
          <Text className="font-opens-sans-semibold text-2xl text-blue-900">Hadith of the day</Text>

          <View className="border-3 w-9/10 h-72 rounded-2xl border-blue-900 p-4">
            <Text className="text-right text-blue-900 font-opens-sans-semibold">إِنَّ الْحَلَالَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ وَبَيْنَهُمَا أُمُورٌ مُشْتَبِهَاتٌ لَا يَعْلَمُهُنَّ كَثِيرٌ مِنَ النَّاسِ، فَمَنِ اتَّقَى الشُّبُهَاتِ فَقَدِ اسْتَبْرَأَ لِدِينِهِ وَعِرْضِهِ</Text>
            <View className="border-t-2 border-blue-900 m-4" />

            <Text className="text-blue-900 font-opens-sans-semibold">
              « Le licite est clair et l&apos;illicite est clair, et entre les deux il y a des choses ambiguës que beaucoup de gens ne connaissent pas.
              Celui qui se prémunit contre les ambiguïtés a préservé sa religion et son honneur. »
            </Text>

            <View className="w-full flex-row mt-auto justify-between items-center">
              <Pressable className="flex-row items-center gap-x-2 bg-blue-900 rounded-2xl py-1 px-4">
                <Text className="text-white font-opens-sans-semibold">See explanation</Text>
                <ChevronRight color={"white"} />
              </Pressable>
              <Text className="text-lg font-oleo-script text-blue-900">- Al Boukhari</Text>
            </View>
          </View>
        </View>

        <View className="w-full items-center gap-y-4">
          <Text className="font-opens-sans-semibold text-2xl text-blue-900">Upcoming event</Text>

          <View className="bg-emerald-500 w-9/10 h-24 rounded-2xl">
            <Text className="font-oleo-script-bold text-white text-center text-2xl my-2">Eid Al Adha</Text>

            <View className="w-full flex-row justify-around px-4">
              <Text className="font-oldenburg text-lg text-white">2 Dhull Hijja</Text>
              <Text className="font-oldenburg text-lg text-white">15 Mai 2027</Text>

            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
