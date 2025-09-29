import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

import CardHome from "../components/CardHome";

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
      <View className="flex-1 justify-center items-center bg-white mt-5 ">
        <Link href="./medicamentos">
          <TouchableOpacity onPress={() => router.push("./medicamentos")}>
            <CardHome
              title="Remédios"
              subtitle="Ajuste o horário para a entrega dos remédios"
              imageSource={require("../../assets/Remedio.png")}
            />
          </TouchableOpacity>
        </Link>

        <Link href="./check">
          <TouchableOpacity onPress={() => router.push("./check")}>
            <CardHome
              title="Check-in"
              subtitle="Escolha horários para uma checagem do bem-estar"
              imageSource={require("../../assets/Check.png")}
            />
          </TouchableOpacity>
        </Link>

        <CardHome
          title="Lembretes"
          subtitle="Crie horários para os seus lembretes"
          imageSource={require("../../assets/Lembretes.png")}
        />
      </View>
    </SafeAreaView>
  );
}
