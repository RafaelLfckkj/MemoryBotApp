import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as Network from 'expo-network';
import { useESP32 } from "../components/ESP32Context";

export default function TesteESP32() {

  

  const router = useRouter();
  const { esp32IP, setESP32IP, verificarConexao, testarServos, enviarMedicamento } = useESP32();
  
  const [ip, setIP] = useState(esp32IP);
  const [celularIP, setCelularIP] = useState("Carregando...");
  const [statusConexao, setStatusConexao] = useState("❓ Não testado");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    getDeviceInfo();
  }, []);

  // Pegar informações do celular
  const getDeviceInfo = async () => {
    try {
      const ipAddress = await Network.getIpAddressAsync();
      setCelularIP(ipAddress);
      addLog(`📱 IP do celular: ${ipAddress}`);
      
      const networkState = await Network.getNetworkStateAsync();
      addLog(`📡 Wi-Fi: ${networkState.isConnected ? 'Conectado' : 'Desconectado'}`);
      addLog(`🌐 Internet: ${networkState.isInternetReachable ? 'Sim' : 'Não'}`);
    } catch (error) {
      addLog(`❌ Erro ao pegar IP: ${error}`);
    }
  };

  const addLog = (texto: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${texto}`, ...prev]);
    console.log(texto);
  };

  // Teste 1: Ping simples
  const testarPing = async () => {
    addLog("🔍 Testando conexão com ESP32...");
    setStatusConexao("⏳ Testando...");
    
    try {
      const response = await fetch(`http://${ip}/status`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.text();
        setStatusConexao("✅ CONECTADO!");
        addLog(`✅ ESP32 respondeu: ${data}`);
        Alert.alert("Sucesso!", "ESP32 está respondendo!");
        return true;
      } else {
        setStatusConexao("❌ Erro HTTP");
        addLog(`❌ Erro HTTP: ${response.status}`);
        Alert.alert("Erro", `HTTP ${response.status}`);
        return false;
      }
    } catch (error) {
      setStatusConexao("❌ SEM RESPOSTA");
      addLog(`❌ Erro: ${error}`);
      Alert.alert("Erro", "ESP32 não respondeu. Verifique:\n- Wi-Fi\n- IP correto\n- ESP32 ligado");
      return false;
    }
  };

  // Teste 2: Acionar servo
  const testarServo = async () => {
    addLog("🔧 Testando servo...");
    try {
      const response = await fetch(`http://${ip}/testServo`, {
        method: 'GET'
      });
      
      if (response.ok) {
        addLog("✅ Comando de servo enviado!");
        Alert.alert("Sucesso!", "Servo deve ter acionado!");
      } else {
        addLog(`❌ Erro ao acionar servo: ${response.status}`);
        Alert.alert("Erro", "Falha ao acionar servo");
      }
    } catch (error) {
      addLog(`❌ Erro: ${error}`);
      Alert.alert("Erro", "Não foi possível enviar comando");
    }
  };

  // Teste 3: Enviar medicamento de teste
  const testarMedicamento = async () => {
    addLog("💊 Enviando medicamento de teste...");
    try {
      const horaAgora = new Date();
      const hora = `${horaAgora.getHours().toString().padStart(2, '0')}:${horaAgora.getMinutes().toString().padStart(2, '0')}`;
      
      const response = await fetch(
        `http://${ip}/addMedicamento?hora=${hora}&nome=Teste&comp=Compartimento1`,
        { method: 'GET' }
      );
      
      if (response.ok) {
        addLog(`✅ Medicamento cadastrado para ${hora}`);
        Alert.alert("Sucesso!", `Medicamento de teste cadastrado para ${hora}`);
      } else {
        addLog(`❌ Erro: ${response.status}`);
        Alert.alert("Erro", "Falha ao cadastrar");
      }
    } catch (error) {
      addLog(`❌ Erro: ${error}`);
      Alert.alert("Erro", "Não foi possível enviar");
    }
  };

  // Teste 4: Listar lembretes no ESP32
  const listarLembretes = async () => {
    addLog("📋 Listando lembretes do ESP32...");
    try {
      const response = await fetch(`http://${ip}/list`, {
        method: 'GET'
      });
      
      if (response.ok) {
        const lista = await response.text();
        addLog(`✅ Lembretes:\n${lista}`);
        Alert.alert("Lembretes no ESP32", lista);
      } else {
        addLog(`❌ Erro: ${response.status}`);
      }
    } catch (error) {
      addLog(`❌ Erro: ${error}`);
    }
  };

  const salvarIP = () => {
    setESP32IP(ip);
    addLog(`💾 IP salvo: ${ip}`);
    Alert.alert("Salvo!", `IP configurado: ${ip}`);
  };

  const limparLogs = () => {
    setLogs([]);
    addLog("🗑️ Logs limpos");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-5 mt-10">
        <Text className="text-2xl font-bold text-[#35A296] mb-5">
          🧪 Teste de Conexão ESP32
        </Text>

        {/* Informações do dispositivo */}
        <View className="bg-gray-100 rounded-xl p-4 mb-5">
          <Text className="font-bold text-lg mb-2">📱 Informações:</Text>
          <Text>IP do Celular: {celularIP}</Text>
          <Text>Status: {statusConexao}</Text>
        </View>

        {/* Configurar IP */}
        <View className="mb-5">
          <Text className="font-bold text-gray-700 mb-2">IP do ESP32:</Text>
          <TextInput
            value={ip}
            onChangeText={setIP}
            placeholder="192.168.15.37"
            keyboardType="numeric"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-2"
          />
          <TouchableOpacity
            onPress={salvarIP}
            className="bg-[#92F2E8] rounded-lg p-3"
          >
            <Text className="text-[#35A296] font-bold text-center">
              💾 Salvar IP
            </Text>
          </TouchableOpacity>
        </View>

        {/* Testes */}
        <View className="gap-3 mb-5">
          <Text className="font-bold text-lg text-gray-800 mb-2">
            🧪 Testes Disponíveis:
          </Text>

          <TouchableOpacity
            onPress={testarPing}
            className="bg-blue-500 rounded-lg p-4"
          >
            <Text className="text-white font-bold text-center">
              1️⃣ Testar Conexão (Ping)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={testarServo}
            className="bg-orange-500 rounded-lg p-4"
          >
            <Text className="text-white font-bold text-center">
              2️⃣ Acionar Servo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={testarMedicamento}
            className="bg-green-500 rounded-lg p-4"
          >
            <Text className="text-white font-bold text-center">
              3️⃣ Cadastrar Medicamento de Teste
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={listarLembretes}
            className="bg-purple-500 rounded-lg p-4"
          >
            <Text className="text-white font-bold text-center">
              4️⃣ Listar Lembretes no ESP32
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logs */}
        <View className="bg-black rounded-lg p-4 mb-5" style={{ minHeight: 200 }}>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white font-bold">📝 Logs:</Text>
            <TouchableOpacity onPress={limparLogs}>
              <Text className="text-red-400">🗑️ Limpar</Text>
            </TouchableOpacity>
          </View>
          
          {logs.length === 0 ? (
            <Text className="text-gray-400 text-sm">
              Nenhum log ainda. Faça um teste!
            </Text>
          ) : (
            logs.map((log, index) => (
              <Text key={index} className="text-green-400 text-xs mb-1 font-mono">
                {log}
              </Text>
            ))
          )}
        </View>

        {/* Botão voltar */}
        <TouchableOpacity
          onPress={() => router.push("./home")}
          className="bg-gray-200 rounded-lg p-4"
        >
          <Text className="text-gray-800 font-bold text-center">
            ← Voltar para Home
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}