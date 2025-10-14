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
import { useRef, useState } from "react";
import { Modalize } from "react-native-modalize";

export default function Index() {
  const modalizeRef = useRef<Modalize>(null);
  const modalizeReflogin = useRef<Modalize>(null);

  function onOpenCadastro() {
    modalizeRef.current?.open();
  }

  function onOpenLogin() {
    modalizeReflogin.current?.open();
  }

  const router = useRouter();

  return (
    <GestureHandlerRootView>
      <View className="flex-1 items-center justify-center bg-[#36D9C8]">
        <Image source={require("../../assets/memorybot.png")} />
        <Text className="text-white text-2xl font-bold mt-4 text-shadow-lg">MemoryBot</Text>

        <View className="mt-10 space-y-4">
          <TouchableOpacity
            className="bg-white rounded-lg px-5 py-2 shadow-2xl mb-5"
            onPress={onOpenCadastro}
          >
            <Text className="text-center font-bold">Criar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white rounded-lg px-5 py-2 shadow-2xl"
            onPress={onOpenLogin}
          >
            <Text className="text-center font-bold">Login</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Criar Conta */}
        <Modalize ref={modalizeRef} snapPoint={500} modalHeight={550}>
          <View className="bg-white rounded-t-3xl p-5 w-full h-50">
            <View className="flex flex-row justify-between items-center mb-5">
              <Text className="font-bold text-lg">Crie uma Conta</Text>
            </View>

            <View className="space-y-2 mt-3 ">
              <Text className="mb-3 text-[#898989]">Nome</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Digite seu nome completo"
              />

              <Text  className="mb-3 mt-3 text-[#898989]" >Email</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Digite seu email"
              />

              <Text  className="mb-3 mt-3 text-[#898989]">Senha</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                secureTextEntry
                placeholder="Digite sua senha"
              />

              <Text  className="mb-3 mt-3 text-[#898989]">Confirmar Senha</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-5"
                secureTextEntry
                placeholder="Confirme sua senha"
              />

              
                <TouchableOpacity
                  className="bg-[#36D9C8] rounded-lg px-10 py-3 shadow-2xl"
                  onPress={() => router.push("../home")}
                >
                  <Text className="text-[#35A296] text-center font-bold">
                    Criar Conta
                  </Text>
                </TouchableOpacity>
              
            </View>
          </View>
        </Modalize>

        {/* Modal Login */}
        <Modalize ref={modalizeReflogin} snapPoint={500} modalHeight={330}>
          <View className="bg-white rounded-t-3xl p-5 w-full h-50">
            <View className="flex flex-row justify-between items-center mb-3">
              <Text className="font-bold text-lg">Faça Login</Text>
            </View>

            <View className="space-y-2 mt-3 ">
              <Text className="mb-3 text-[#898989]">Email</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Digite seu email"
              />

              <Text  className="mb-3 mt-3 text-[#898989]">Senha</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-5"
                secureTextEntry
                placeholder="Digite sua senha"
              />

              

                <TouchableOpacity
                  className="bg-[#36D9C8] rounded-lg px-10 py-3 shadow-2xl"
                  onPress={() => router.push("../home")}
                >
                  <Text className="text-[#35A296] text-center font-bold ">
                    Login
                  </Text>
                </TouchableOpacity>
              
              
            </View>
          </View>
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
}
