import { CustomDate } from "@/utils/date-helpers";
import { View, Text } from "react-native";

export default function HomeScreen() {
  const customDate = new CustomDate();
  const todayDate = customDate.getTodayDate();

  return (
    <View className="flex-1">
      <Text className="m-auto">
        Date :{" "}
        {`${todayDate.day} ${todayDate.monthInEnglish} ${todayDate.year} AH`}
      </Text>
    </View>
  );
}
