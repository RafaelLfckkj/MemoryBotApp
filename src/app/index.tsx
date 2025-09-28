import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

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
        <Text className="text-white text-2xl font-bold mt-4">MemoryBot</Text>

        <View className="mt-10 space-y-4">
          <TouchableOpacity
            className="bg-white rounded-lg px-5 py-2 shadow"
            onPress={onOpenCadastro}
          >
            <Text className="text-center font-bold">Criar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white rounded-lg px-5 py-2 shadow"
            onPress={onOpenLogin}
          >
            <Text className="text-center font-bold">Login</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Criar Conta */}
        <Modalize ref={modalizeRef} snapPoint={500} modalHeight={550}>
          <View className="bg-white rounded-t-3xl p-5 w-full">
            <View className="flex flex-row justify-between items-center mb-3">
              <Text className="font-bold text-lg">Crie uma Conta</Text>
            </View>

            <View className="space-y-2">
              <Text>Nome</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                placeholder="Digite seu nome"
              />

              <Text>Email</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                placeholder="Digite seu email"
              />

              <Text>Senha</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                secureTextEntry
                placeholder="Digite sua senha"
              />

              <Text>Confirmar Senha</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                secureTextEntry
                placeholder="Confirme sua senha"
              />

              <Link href="./home" className="text-center">
                <TouchableOpacity
                  className="bg-[#36D9C8] rounded-lg px-5 py-2 mt-4"
                  onPress={() => router.push("../home")}
                >
                  <Text className="text-[#35A296] text-center font-bold">
                    Criar Conta
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </Modalize>

        {/* Modal Login */}
        <Modalize ref={modalizeReflogin} snapPoint={500} modalHeight={300}>
          <View className="bg-white rounded-t-3xl p-5 w-full">
            <View className="flex flex-row justify-between items-center mb-3">
              <Text className="font-bold text-lg">Login</Text>
            </View>

            <View className="space-y-2">
              <Text>Email</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                placeholder="Digite seu email"
              />

              <Text>Senha</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                secureTextEntry
                placeholder="Digite sua senha"
              />

              <TouchableOpacity
                className="bg-[#36D9C8] rounded-lg px-5 py-2 mt-4"
                onPress={() => router.push("../home")}
              >
                <Link href="./home" className="text-center">
                  <Text className="text-[#35A296] text-center font-bold">
                    Entrar
                  </Text>
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
}
