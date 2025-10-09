import { router, useRouter } from "expo-router";
import { Link } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLembretes } from "../components/LembretesContext";

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
import { ScrollView } from "react-native";
import LembreteCard from "../components/LembreteCard";

import Buttons from "../components/Buttons";
export default function lembretes() {
  const { lembretes, removerLembrete } = useLembretes();

  return (
    <View className="flex-1 bg-[#ffffff] mt-10">
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
          <TouchableOpacity onPress={() => router.push("./CadastrarLembretes")}>
            <Link href="./CadastrarLembretes">
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
            Lembretes
          </Text>
          <Text className="text-[#898989] ml-5 text-left">
            Adicione e gerencie lembretes
          </Text>
          <Text className="text-[#898989] ml-5 text-left">personalizados</Text>
        </View>
      </View>

      {lembretes.length === 0 ? (
        // Mostrar a tela vazia que você já tem
        <View className="flex-1 items-center justify-center">
          <Image source={require("../../assets/Reminders.png")} />
          <Text className="text-[#3B3B3B] text-sm font-bold mt-7">
            Você ainda não tem nenhum
          </Text>
          <Text className="text-[#3B3B3B] text-sm font-bold">
            lembrete cadastrado
          </Text>
        </View>
      ) : (
        // Mostrar a lista de medicamentos
        <ScrollView className="flex-1 mt-5">
          {lembretes.map((lem) => (
            <LembreteCard
              key={lem.id}
              nome={lem.nome}
              horarios={lem.horarios
                .map(
                  (h) =>
                    `${h.hour.toString().padStart(2, "0")}:${h.minute.toString().padStart(2, "0")}`
                )
                .join(", ")}
              dias={lem.dias.map((d) => d.charAt(0)).join(", ")} // Só primeira letra
              onDelete={() => removerLembrete(lem.id)}
            />
          ))}
        </ScrollView>
      )}

      {/* Botão de cadastrar (sempre visível) */}
      <View className="items-center mb-10">
        <TouchableOpacity onPress={() => router.push("./CadastrarLembretes")}>
          <Buttons
            subtitle={"+ Cadastrar um lembrete"}
            onPress={() => router.push("./CadastrarLembretes")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
