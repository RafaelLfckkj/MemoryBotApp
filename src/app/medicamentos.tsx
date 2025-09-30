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

export default function medicamentos() {
  return (
    <View className="flex-1  bg-[#ffffff]">
      {/* Header */}
      <View>
        {/* Seta para voltar */}
        <View className="w-16">
          <Link href="./home">
            <TouchableOpacity onPress={() => router.push("./home")}>
              <Image
                source={require("../../assets/Arrow.png")}
                className="w-8 h-8 m-5"
              />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Bolinha de adicionar nova receita */}
        <View className=" bg-[#36D9C8]  rounded-full items-end justify-center p-2 absolute top-5 right-5 shadow shadow-black">
          <TouchableOpacity onPress={() => router.push("./CadastroReceita")}>
            <Link href="./CadastroReceita">
              <Image
                source={require("../../assets/Mais.png")}
                className="w-6 h-6"
              />
            </Link>
          </TouchableOpacity>
        </View>

        {/* Texto */}
        <View className="w-30">
          <Text className="capitalize font-bold text-[#35A296] text-2xl ml-5">
            Minhas Receitas
          </Text>
          <Text className="text-[#898989] ml-5 text-left">
            Acompanhe seus medicamentos
          </Text>
          <Text className="text-[#898989] ml-5 text-left">
            cadastrados e gerencie lembretes
          </Text>
        </View>
      </View>

      {/* Meio da pagina */}
      <View className="flex-1 items-center justify-center w-50">
        <Image
          source={require("../../assets/Hand.png")}
          className="w-full h-60"
        />

        <Text className="text-[#3B3B3B] text-sm font-bold mt-7">
          Você ainda não tem nenhuma
        </Text>
        <Text className="text-[#3B3B3B] text-sm font-bold">
          receita cadastrada
        </Text>
      </View>

      <View className="items-center mb-10">
        <TouchableOpacity onPress={() => router.push("./CadastroReceita")}>
          <Link href="./CadastroReceita">
            <Buttons subtitle={"+ Cadastrar uma receita"} />
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
