import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useESP32 } from "../components/ESP32Context";

export default function Configuracoes() {
  const router = useRouter();
  const { esp32IP, setESP32IP, verificarConexao, testarServos } = useESP32();
  const [ip, setIP] = useState(esp32IP);

  const handleSalvar = async () => {
    setESP32IP(ip);
    const conectado = await verificarConexao();
    if (conectado) {
      Alert.alert("Sucesso", "Conectado ao ESP32!");
      router.push("./home");
    } else {
      Alert.alert("Erro", "Não foi possível conectar ao ESP32. Verifique o IP.");
    }
  };

  return (
    <View className="flex-1 bg-white p-5 mt-10">
      <Text className="text-2xl font-bold text-[#35A296] mb-5">
        Configurações ESP32
      </Text>

      <Text className="text-gray-700 font-medium mb-2">
        Endereço IP do ESP32:
      </Text>
      <TextInput
        value={ip}
        onChangeText={setIP}
        placeholder="192.168.1.100"
        keyboardType="numeric"
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
      />

      <TouchableOpacity
        onPress={handleSalvar}
        className="bg-[#92F2E8] rounded-xl p-4 mb-3"
      >
        <Text className="text-[#35A296] font-bold text-center">
          Salvar e Conectar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={testarServos}
        className="bg-[#F5F5F5] rounded-xl p-4"
      >
        <Text className="text-gray-700 font-bold text-center">
          Testar Servo
        </Text>
      </TouchableOpacity>
    </View>
  );
}