import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#36D9C8]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3">
        <View className="w-20 h-20 bg-white rounded-full shadow" />
        <Link href="./">
          <TouchableOpacity onPress={() => router.push("./")}>
            <Image
              source={require("../../assets/Exit.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Texto de boas-vindas */}
      <View className="px-5 py-2">
        <Text className="text-black text-xl">Seja bem-vindo</Text>
        <Text className="text-black text-2xl font-bold">
          Rafael De Oliveira
        </Text>
      </View>

      {/* Cards */}
      <View className="flex-1 bg-white p-5 mt-5 ">
       
       
      </View>
    </SafeAreaView>
  );
}
