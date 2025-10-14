import { router } from "expo-router";
import { Link } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useRef, useState } from "react";
import { Modalize } from "react-native-modalize";

import TextinhoModal from "../components/TextinhoModal";
import Buttons from "../components/Buttons";
import MultipleTimePicker from "../components/MutipleTimePicker";
import SeletorDiasSemana from "../components/SeletorDiasSemana";
import { useLembretes } from "../components/LembretesContext";

import { useESP32 } from "../components/ESP32Context";

export default function CadastrarLembretes() {
  const { adicionarLembrete } = useLembretes();

  const [horarios, setHorarios] = useState([
    { hour: 10, minute: 0 },
    { hour: 17, minute: 0 },
  ]);
  const {enviarLembrete, enviarAgua } = useESP32();
  const [lembretePersonalizado, setLembretePersonalizado] = useState(false);
  const [nomeLembrete, setNomeLembrete] = useState("");
  const [mensagemLembrete, setMensagemLembrete] = useState("");
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);

  const modalizeLembrete = useRef<Modalize>(null);
  const modalizeHoraUso = useRef<Modalize>(null);
  const modalizeDia = useRef<Modalize>(null);

  const formatHorarios = () => {
    return horarios
      .map(
        (h) =>
          `${h.hour.toString().padStart(2, "0")}:${h.minute.toString().padStart(2, "0")}`
      )
      .join(", ");
  };

  const formatDias = () => {
    if (diasSelecionados.length === 0) return "Selecione...";

    const abreviacoes: { [key: string]: string } = {
      Domingo: "Dom",
      Segunda: "Seg",
      Terça: "Ter",
      Quarta: "Qua",
      Quinta: "Qui",
      Sexta: "Sex",
      Sábado: "Sáb",
    };

    return diasSelecionados.map((d) => abreviacoes[d]).join(", ");
  };

  const handleCadastrar = async () => {
    if (!nomeLembrete.trim()) {
      Alert.alert("Erro", "Selecione um lembrete");
      return;
    }

    if (horarios.length === 0) {
      Alert.alert("Erro", "Configure pelo menos um horário");
      return;
    }

    if (diasSelecionados.length === 0) {
      Alert.alert("Erro", "Selecione pelo menos um dia");
      return;
    }
    

    // Adicionar no app
    adicionarLembrete({
      nome: nomeLembrete,
      horarios: horarios,
      dias: diasSelecionados,
    });

    // Enviar para o ESP32
    for (const horario of horarios) {
      const horaFormatada = `${horario.hour.toString().padStart(2, "0")}:${horario.minute.toString().padStart(2, "0")}`;

      // ← ADICIONE ESSA LÓGICA:
      if (nomeLembrete === "Lembrete de água") {
        await enviarAgua(horaFormatada); // Envia como AGUA
      } else {
        await enviarLembrete(horaFormatada, nomeLembrete); // Envia como REM
      }
    }

    // Limpar campos
    setNomeLembrete("");
    setHorarios([{ hour: 10, minute: 0 }]);
    setDiasSelecionados([]);

    router.push("./lembretes");
  };

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white mt-10">
        {/* Header */}
        <View>
          <View className="w-16">
            <Link href="./lembretes">
              <TouchableOpacity onPress={() => router.push("./lembretes")}>
                <Image
                  source={require("../../assets/Arrow.png")}
                  className="w-8 h-8 m-5"
                />
              </TouchableOpacity>
            </Link>
          </View>

          <View className="mt-10">
            <Text className="capitalize font-bold text-[#35A296] text-2xl ml-5">
              Novo lembrete
            </Text>
            <Text className="text-[#898989] ml-5 text-left">
              Adicione seu lembrete personalizado no seu
            </Text>
            <Text className="text-[#898989] ml-5 text-left">MemoryBot</Text>
          </View>
        </View>

        {/* Formulário */}
        <View className="mt-5">
          <TextinhoModal
            title="Lembrete:"
            subtitle={nomeLembrete || "Ex: Lembrete de água"}
            onPress={() => modalizeLembrete.current?.open()}
          />
          <TextinhoModal
            title="Hora de uso:"
            subtitle={formatHorarios()}
            onPress={() => modalizeHoraUso.current?.open()}
          />
          <TextinhoModal
            title="Dia:"
            subtitle={formatDias()}
            onPress={() => modalizeDia.current?.open()}
          />
        </View>

        <View className="items-center mb-10 mt-96">
          <Buttons
            subtitle="+ Cadastrar um lembrete"
            onPress={handleCadastrar}
          />
        </View>

        {/* Modal Lembrete */}
        <Modalize
          ref={modalizeLembrete}
          snapPoint={lembretePersonalizado ? 450 : 450}
          modalHeight={lembretePersonalizado ? 450 : 450}
        >
          {!lembretePersonalizado ? (
            <View className="ml-5 mt-10">
              <Text className="text-lg font-bold text-[#35A296]">
                Selecione o lembrete
              </Text>
              <Text className="text-[#898989] mt-1">
                Selecione abaixo a opção do seu lembrete ou opte
              </Text>
              <Text className="text-[#898989]">
                por um lembrete personalizado
              </Text>

              <View className="flex justify-center items-center mt-14 mr-7 ml-5">
                <View className="gap-5">
                  <TouchableOpacity
                    className="bg-[#F5F5F5] w-64 h-11 rounded-xl shadow-md"
                    onPress={() => {
                      setNomeLembrete("Lembrete de água");
                      modalizeLembrete.current?.close();
                    }}
                  >
                    <View className="flex-row justify-between items-center px-3 mt-2">
                      <Text className="text-[#35A296] font-bold text-xl">
                        Lembrete de água
                      </Text>
                      <Image
                        source={require("../../assets/WaterIcon.png")}
                        className="w-5 h-5"
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-[#F5F5F5] w-64 h-11 rounded-xl shadow-md"
                    onPress={() => {
                      setNomeLembrete("Lembrete de banho");
                      modalizeLembrete.current?.close();
                    }}
                  >
                    <View className="flex-row justify-between items-center px-3 mt-2">
                      <Text className="text-[#35A296] font-bold text-xl">
                        Lembrete de banho
                      </Text>
                      <Image
                        source={require("../../assets/ShowerIcon.png")}
                        className="w-5 h-5"
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-[#F5F5F5] w-64 h-11 rounded-xl shadow-md"
                    onPress={() => {
                      setNomeLembrete("Lembrete de comida");
                      modalizeLembrete.current?.close();
                    }}
                  >
                    <View className="flex-row justify-between items-center px-3 mt-2">
                      <Text className="text-[#35A296] font-bold text-xl">
                        Lembrete de comida
                      </Text>
                      <Image
                        source={require("../../assets/FoodIcon.png")}
                        className="w-5 h-5"
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-[#F5F5F5] w-64 h-11 rounded-xl shadow-md"
                    onPress={() => setLembretePersonalizado(true)}
                  >
                    <Text className="text-[#35A296] font-bold text-xl text-center mt-2">
                      Lembrete personalizado
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View className="p-5 mt-10">
              <Text className="text-lg font-bold text-[#35A296]">
                Lembrete personalizado
              </Text>
              <Text className="text-[#898989] mt-1 mb-5">
                Escreva abaixo o nome do lembrete e sua mensagem personalizada
              </Text>

              <Text className="font-bold text-[#35A296] mb-2">Nome:</Text>
              <TextInput
                value={nomeLembrete}
                onChangeText={setNomeLembrete}
                placeholder="Escreva o nome do lembrete..."
                className=" bg-[#F5F5F5] rounded-xl p-3 mb-4  shadow-black shadow-md border border-gray-500"
              />

              <Text className="font-bold text-[#35A296] mb-2">Mensagem:</Text>
              <TextInput
                value={mensagemLembrete}
                onChangeText={setMensagemLembrete}
                placeholder="Descrição..."
                multiline
                numberOfLines={4}
                className=" bg-[#F5F5F5] rounded-xl p-3 shadow-black shadow-md border border-gray-500"
                style={{ textAlignVertical: "top" }}
              />

              <View className="flex-row gap-3 mt-6">
                <TouchableOpacity
                  onPress={() => setLembretePersonalizado(false)}
                  className="flex-1 bg-gray-200 rounded-xl p-4"
                >
                  <Text className="text-gray-800 font-bold text-center">
                    Voltar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setLembretePersonalizado(false);
                    modalizeLembrete.current?.close();
                  }}
                  className="flex-1 bg-[#92F2E8] rounded-xl p-4"
                >
                  <Text className="text-[#35A296] font-bold text-center">
                    Continuar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modalize>

        {/* Modal Horários */}
        <Modalize ref={modalizeHoraUso} snapPoint={550} modalHeight={550}>
          <View className="mt-8">
            <MultipleTimePicker
              initialTimes={horarios}
              onTimesChange={(times) => setHorarios(times)}
              maxTimes={5}
            />
          </View>

          <View className="px-5 mt-4">
            <TouchableOpacity
              className="bg-[#92F2E8] rounded-xl p-4"
              onPress={() => modalizeHoraUso.current?.close()}
            >
              <Text className="text-[#35A296] text-center font-bold text-base">
                Continuar
              </Text>
            </TouchableOpacity>
          </View>
        </Modalize>

        {/* Modal Dias */}
        <Modalize ref={modalizeDia} snapPoint={350} modalHeight={350}>
          <View className="mt-10">
            <View className="ml-5">
              <Text className="text-lg font-bold text-[#35A296]">
                Selecione os dias
              </Text>
              <Text className="text-[#898989] mt-1 mb-10">
                Selecione abaixo os dias em que o lembrete será tocado
              </Text>
            </View>

            <SeletorDiasSemana
              diasSelecionados={diasSelecionados}
              onChangeDias={setDiasSelecionados}
            />

            <View className="px-5 mt-6">
              <TouchableOpacity
                className="bg-[#92F2E8] rounded-xl p-4 mt-10"
                onPress={() => modalizeDia.current?.close()}
              >
                <Text className="text-[#35A296] text-center font-bold text-base">
                  Continuar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
}
