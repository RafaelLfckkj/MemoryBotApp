import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Buttons({ subtitle, onPress }) {
  return (
    <View>
      <TouchableOpacity className="bg-[#92F2E8] rounded-lg px-7 py-4 mt-4 shadow" onPress={onPress}>
        <Text className="text-[#35A296] font-bold"> {subtitle} </Text>
      </TouchableOpacity>
    </View>
  );
}
