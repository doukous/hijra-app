import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import Markdown from "react-native-markdown-display";
import { useDate } from "@/utils/date-helpers";
import { getMonthDescription } from "@/utils/events-helpers";

export default function MonthInfoModal() {
  const { month, year } = useLocalSearchParams<{ month?: string; year?: string }>();
  const { hijrahDate } = useDate();

  const monthNumber = month ? parseInt(month, 10) : hijrahDate.month;
  const monthYear = year ? parseInt(year, 10) : hijrahDate.year;

  const description = getMonthDescription(monthNumber);

  return (
    <>
      <Stack.Screen
        options={{
          title: `${hijrahDate.monthEnStr} ${monthYear} AH`,
        }}
      />
      <ScrollView
        className="bg-white"
        contentContainerClassName="px-5 py-4"
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
          <View>
            <Text className="text-gray-500 italic">
              Pas de description disponible pour ce mois.
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}
