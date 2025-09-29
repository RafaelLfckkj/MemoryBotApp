import { router, useRouter } from "expo-router";
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
import { useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import Buttons from "../components/Buttons";

export default function check() {
  return (
    <View className="flex-1 bg-[#ffffff]">
      {/* Header */}
      <View>
        {/* Seta para voltar */}
        <View className="w-16">
          <Link href="./">
            <TouchableOpacity onPress={() => router.push("./")}>
              <Image
                source={require("../../assets/Arrow.png")}
                className="w-8 h-8 m-5"
              />
            </TouchableOpacity>
          </Link>
        </View>

        <View>
          <Text className="capitalize font-bold text-[#35A296] text-2xl ml-5">
            Configurar Check-in
          </Text>
          <Text className="text-[#898989] ml-5 text-left">
            Defina os horários dos check-ins e configure
          </Text>
          <Text className="text-[#898989] ml-5 text-left">
            o número de repetições desejadas
          </Text>
        </View>



      </View>


      <View className="items-center mb-10">
        <Buttons subtitle={"Concluído"} />
      </View>
    </View>
  );
}
