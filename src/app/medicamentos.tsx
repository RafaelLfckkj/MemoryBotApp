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

import { ScrollView } from "react-native";
import { useMedicamentos } from "../components/MedicamentosContext";
import MedicamentoCard from "../components/MedicamentoCard";

export default function medicamentos() {
  const { medicamentos, removerMedicamento } = useMedicamentos();

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

      {medicamentos.length === 0 ? (
        // Mostrar a tela vazia que você já tem
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("../../assets/Hand.png")}    
          />
          <Text className="text-[#3B3B3B] text-sm font-bold mt-7">
            Você ainda não tem nenhuma
          </Text>
          <Text className="text-[#3B3B3B] text-sm font-bold">
            receita cadastrada
          </Text>
        </View>
      ) : (
        // Mostrar a lista de medicamentos
        <ScrollView className="flex-1 mt-5">
          {medicamentos.map((med) => (
            <MedicamentoCard
              key={med.id}
              nome={med.nome}
              horario={med.horario}
              dosagem={med.dosagem}
              onDelete={() => removerMedicamento(med.id)}
            />
          ))}
        </ScrollView>
      )}

      {/* Botão de cadastrar (sempre visível) */}
      <View className="items-center mb-10">
        <TouchableOpacity onPress={() => router.push("./CadastroReceita")}>
         <Buttons subtitle={"+ Cadastrar uma receita"} onPress={() => router.push("./CadastroReceita")}/>
        </TouchableOpacity>
      </View>

    </View>
  );
}
