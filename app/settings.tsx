import { ChevronRight, Minus, Plus } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";

export default function Settings() {
  return (
    <View className="w-full h-full gap-y-6">
      <Text className="font-bold text-2xl text-blue-900 p-2">Settings</Text>

      <View className="flex-row items-center justify-between rounded-lg bg-blue-200 w-9/10 h-16 p-2 mx-auto">
        <Text className="text-blue-900 text-md">Adjust calendar day</Text>
        <Text className="px-2 py-1 bg-blue-800 text-white text-center w-10 rounded-xl font-semibold text-lg">0</Text>

        <View className="flex-row gap-x-2">
          <Pressable className="bg-blue-800 p-2 rounded-full">
            <Plus color={"white"} />
          </Pressable>
          <Pressable className="bg-blue-800 p-2 rounded-full">
            <Minus color={"white"} />
          </Pressable>
        </View>
      </View>

      <Pressable className="flex-row items-center justify-between rounded-lg bg-blue-200 w-9/10 h-16 px-4 mx-auto">
        <Text className="text-blue-900">Widgets</Text>
        <ChevronRight color={"blue"} />
      </Pressable>

      <View className="rounded-lg bg-blue-200 w-9/10 mx-auto">
        <View className="h-16 flex-row justify-between p-4">
          <Text className="text-blue-900">Privacy policy</Text>
          <ChevronRight />
        </View>

        <View className="border-t border-t-blue-900 w-9/10 mx-auto" />

        <View className="h-16 flex-row justify-between p-4">
          <Text className="text-blue-900">Terms of use</Text>
          <ChevronRight />
        </View>

        <View className="border-t border-t-blue-900 w-9/10 mx-auto" />

        <View className="h-16 flex-row justify-between p-4">
          <Text className="text-blue-900">About</Text>
          <ChevronRight />
        </View>
      </View>
    </View>
  )
}
