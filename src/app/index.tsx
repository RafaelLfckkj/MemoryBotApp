import { useRouter } from "expo-router";
import { Link } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";

export default function Index() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  function closeModal() {
    setShowLogin(false);
    setShowRegister(false);
  }

  function handleLogin() {
    Alert.alert("Login realizado com sucesso!");
    closeModal();
  }

  return (
    <View className="flex-1 items-center justify-center bg-[#36D9C8]">
      <Image source={require("../../assets/memorybot.png")} />
      <Text className="text-white text-2xl font-bold mt-4">MemoryBot</Text>

      <View className="mt-10 space-y-4">
        <TouchableOpacity
          className="bg-white rounded-lg px-5 py-2 shadow"
          onPress={() => setShowRegister(true)}
        >
          <Text className="text-center font-bold">Criar Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white rounded-lg px-5 py-2 shadow"
          onPress={() => setShowLogin(true)}
        >
          <Text className="text-center font-bold">Login</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Criar Conta */}
      {showRegister && (
        <View className="absolute inset-0 bg-black bg-opacity-50 items-center justify-end">
          <View className="bg-white rounded-t-3xl p-5 w-full">
            <View className="flex flex-row justify-between items-center mb-3">
              <Text className="font-bold text-lg">Crie uma Conta</Text>
              <Text
                className="bg-red-500 w-6 h-6 text-center text-white rounded-full font-bold"
                onPress={closeModal}
              >
                X
              </Text>
            </View>

            <View className="space-y-2">
              <Text>Nome</Text>
              <TextInput className="border border-gray-300 rounded-lg p-2" />

              <Text>Email</Text>
              <TextInput className="border border-gray-300 rounded-lg p-2" />

              <Text>Senha</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                secureTextEntry
              />

              <Text>Confirmar Senha</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                secureTextEntry
              />

              <Link href="./home" className="text-center">
                <TouchableOpacity className="bg-[#36D9C8] rounded-lg px-5 py-2 mt-4">
                  <Text className="text-[#35A296] text-center font-bold">
                    Criar Conta
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      )}

      {/* Modal Login */}
      {showLogin && (
        <View className="absolute inset-0 bg-black bg-opacity-50 items-center justify-end">
          <View className="bg-white rounded-t-3xl p-5 w-full">
            <View className="flex flex-row justify-between items-center mb-3">
              <Text className="font-bold text-lg">Login</Text>
              <Text
                className="bg-red-500 w-6 h-6 text-center text-white rounded-full font-bold"
                onPress={closeModal}
              >
                X
              </Text>
            </View>

            <View className="space-y-2">
              <Text>Email</Text>
              <TextInput className="border border-gray-300 rounded-lg p-2" />

              <Text>Senha</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                secureTextEntry
              />

              <TouchableOpacity
                className="bg-[#36D9C8] rounded-lg px-5 py-2 mt-4"
                onPress={handleLogin}
              >
                <Text className="text-[#35A296] text-center font-bold">
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
