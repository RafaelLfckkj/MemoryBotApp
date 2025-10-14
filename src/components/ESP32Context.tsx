import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

interface ESP32ContextType {
  esp32IP: string;
  setESP32IP: (ip: string) => void;
  isConnected: boolean;
  enviarMedicamento: (
    hora: string,
    nome: string,
    compartimento: string
  ) => Promise<boolean>;
  enviarCheckin: (hora: string) => Promise<boolean>;
  enviarLembrete: (hora: string, mensagem: string) => Promise<boolean>;
  testarServos: () => Promise<boolean>;
  verificarConexao: () => Promise<boolean>;
  enviarAgua: (hora: string) => Promise<boolean>;
}

const ESP32Context = createContext<ESP32ContextType | undefined>(undefined);

export function ESP32Provider({ children }: { children: React.ReactNode }) {
  const [esp32IP, setESP32IP] = useState("192.168.15.37"); 
  const [isConnected, setIsConnected] = useState(false);

  const enviarAgua = async (hora: string): Promise<boolean> => {
    try {
      const url = `http://${esp32IP}/addAgua?hora=${hora}`;
      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        console.log("✅ Lembrete de água enviado:", hora);
        Alert.alert("Sucesso", "Lembrete de água cadastrado no ESP32!");
        return true;
      }
      Alert.alert("Erro", "Falha ao cadastrar lembrete de água");
      return false;
    } catch (error) {
      console.log("❌ Erro:", error);
      Alert.alert("Erro", "Não foi possível conectar ao ESP32");
      return false;
    }
  };

  const verificarConexao = async (): Promise<boolean> => {
    try {
      const response = await fetch(`http://${esp32IP}/status`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setIsConnected(true);
        return true;
      }
      setIsConnected(false);
      return false;
    } catch (error) {
      console.log("❌ Erro ao conectar:", error);
      setIsConnected(false);
      return false;
    }
  };

  const enviarMedicamento = async (
    hora: string,
    nome: string,
    compartimento: string
  ): Promise<boolean> => {
    try {
      const url = `http://${esp32IP}/addMedicamento?hora=${hora}&nome=${encodeURIComponent(nome)}&comp=${encodeURIComponent(compartimento)}`;
      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        console.log("✅ Medicamento enviado:", nome);
        Alert.alert("Sucesso", "Medicamento cadastrado no ESP32!");
        return true;
      }
      Alert.alert("Erro", "Falha ao cadastrar medicamento");
      return false;
    } catch (error) {
      console.log("❌ Erro:", error);
      Alert.alert("Erro", "Não foi possível conectar ao ESP32");
      return false;
    }
  };

  const enviarCheckin = async (hora: string): Promise<boolean> => {
    try {
      const url = `http://${esp32IP}/addCheckin?hora=${hora}`;
      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        console.log("✅ Check-in enviado:", hora);
        Alert.alert("Sucesso", "Check-in cadastrado no ESP32!");
        return true;
      }
      Alert.alert("Erro", "Falha ao cadastrar check-in");
      return false;
    } catch (error) {
      console.log("❌ Erro:", error);
      Alert.alert("Erro", "Não foi possível conectar ao ESP32");
      return false;
    }
  };

  const enviarLembrete = async (
    hora: string,
    mensagem: string
  ): Promise<boolean> => {
    try {
      const url = `http://${esp32IP}/addLembrete?hora=${hora}&msg=${encodeURIComponent(mensagem)}`;
      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        console.log("✅ Lembrete enviado:", mensagem);
        Alert.alert("Sucesso", "Lembrete cadastrado no ESP32!");
        return true;
      }
      Alert.alert("Erro", "Falha ao cadastrar lembrete");
      return false;
    } catch (error) {
      console.log("❌ Erro:", error);
      Alert.alert("Erro", "Não foi possível conectar ao ESP32");
      return false;
    }
  };

  const testarServos = async (): Promise<boolean> => {
    try {
      const url = `http://${esp32IP}/testServo`;
      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        console.log("✅ Servo testado!");
        Alert.alert("Sucesso", "Servo acionado!");
        return true;
      }
      return false;
    } catch (error) {
      console.log("❌ Erro:", error);
      Alert.alert("Erro", "Não foi possível testar o servo");
      return false;
    }
  };

  return (
    <ESP32Context.Provider
      value={{
        esp32IP,
        setESP32IP,
        isConnected,
        enviarMedicamento,
        enviarCheckin,
        enviarLembrete,
        enviarAgua, 
        testarServos,
        verificarConexao,
      }}
    >
      {children}
    </ESP32Context.Provider>
  );
}

export function useESP32() {
  const context = useContext(ESP32Context);
  if (!context) {
    throw new Error("useESP32 deve ser usado dentro de ESP32Provider");
  }
  return context;
}
