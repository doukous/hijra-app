import { todayDate, options } from "@/utils/date-helpers";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <Text className="m-auto">
        Date : {todayDate.toLocaleString("fr-FR", options)}
      </Text>
    </View>
  );
}
