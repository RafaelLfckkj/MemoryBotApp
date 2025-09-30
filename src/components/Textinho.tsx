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

export default function Textinho({ title, subtitle }) {
  return (
    <View className="m-3">
      <View className="space-y-2">
        <Text className="font-bold text-[#898989]">{title}</Text>
        <TextInput
          placeholder={`${subtitle}`}
          className="border border-[#898989] rounded-md p-3"
        />
      </View>
    </View>
  );
}
