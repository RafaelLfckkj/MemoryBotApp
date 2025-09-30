import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Buttons({ subtitle }) {
  return (
    <View>
      <TouchableOpacity className="bg-[#92F2E8] rounded-lg px-5 py-2 mt-4 shadow">
        <Text className="text-[#35A296] font-bold"> {subtitle} </Text>
      </TouchableOpacity>
    </View>
  );
}
