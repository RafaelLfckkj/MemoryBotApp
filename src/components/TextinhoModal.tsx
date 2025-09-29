import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";

export default function Textinho({ title, subtitle, onPress }) {
  return (
    <View className="m-3">
      <TouchableOpacity className="space-y-2" onPress={onPress}>
        <Text className="font-bold text-[#898989]">{title}</Text>
        <View  className="border border-[#898989] rounded-md p-3" >
          <Text className=" text-[#898989]">{subtitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
