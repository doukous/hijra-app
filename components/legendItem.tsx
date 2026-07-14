import { View, Text } from "react-native"

type ColorVariantsType = "purple" | "red" | "stone" | "blue"

export default function LegendItem({ description, color }: { description: string, color: ColorVariantsType }) {
  const colorVariants = {
    purple: "bg-purple-500 rounded-full size-2",
    red: "bg-red-500 rounded-full size-2",
    stone: "bg-stone-500 rounded-full size-2",
    blue: "bg-blue-500 rounded-full size-2",
  }
  return (
    <View className="flex-row gap-x-2 items-center px-4 py-3">
      <View className={colorVariants[color]} />
      <Text>{ description }</Text>
    </View>
  )
}
