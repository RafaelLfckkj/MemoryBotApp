import { router, useRouter } from "expo-router";
import { Link } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TimePickerScroll from "../components/TimePickerScroll";
import DatePickerCalendar from "../components/DatePickerCalendar";

import { TouchableOpacity } from "react-native-gesture-handler";

import { View, Text, TextInput, Image, Alert } from "react-native";
import { useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import Buttons from "../components/Buttons";
import Textinho from "../components/Textinho";
import TextinhoModal from "../components/TextinhoModal";
import { useMedicamentos } from "../components/MedicamentosContext";

import { useESP32 } from "../components/ESP32Context";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function CadastroReceita() {
  const modalizeHoraUso = useRef<Modalize>(null);
  const modalizeDuracao = useRef<Modalize>(null);
  const modalizeCompartimento = useRef<Modalize>(null);

  const { adicionarMedicamento } = useMedicamentos();

  // Estados existentes...
  const [nomeMedicamento, setNomeMedicamento] = useState("");
  const [dosagem, setDosagem] = useState("");

  const { enviarMedicamento } = useESP32();
  const [compartimento, setCompartimento] = useState("");

  // No handleCadastrar, adicione:
  const handleCadastrar = async () => {
    // if (!nomeMedicamento.trim()) {
    //   Alert.alert("Erro", "Digite o nome do medicamento");
    //   return;
    // }

    // if (!dosagem.trim()) {
    //   Alert.alert("Erro", "Digite a dosagem");
    //   return;
    // }

    // if (!duracao.startDate || !duracao.endDate) {
    //   Alert.alert("Erro", "Selecione a duração do tratamento");
    //   return;
    // }

    // Adicionar no app (Context local)
    adicionarMedicamento({
      nome: nomeMedicamento,
      horario: `${horaUso.hour.toString().padStart(2, "0")}:${horaUso.minute.toString().padStart(2, "0")}`,
      dosagem: dosagem,
      duracao: duracao,
    });

    // ENVIAR PARA O ESP32 (Wi-Fi)
    const horaFormatada = `${horaUso.hour.toString().padStart(2, "0")}:${horaUso.minute.toString().padStart(2, "0")}`;
    await enviarMedicamento(horaFormatada, nomeMedicamento, compartimento);

    // Limpar campos
    setNomeMedicamento("");
    setDosagem("");
    setDuracao({ startDate: null, endDate: null });

    router.push("./medicamentos");
  };

  const [horaUso, setHoraUso] = useState({ hour: 12, minute: 0 });

  const [duracao, setDuracao] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  function onOpenHoradeUso() {
    modalizeHoraUso.current?.open();
  }

  function onOpenDuracao() {
    modalizeDuracao.current?.open();
  }
  function onOpenCompartimento() {
    modalizeCompartimento.current?.open();
  }

  const formatDuracao = () => {
    if (duracao.startDate && duracao.endDate) {
      const start = duracao.startDate.toLocaleDateString("pt-BR");
      const end = duracao.endDate.toLocaleDateString("pt-BR");
      return `De ${start} até ${end}`;
    }
    return "Selecione...";
  };

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white mt-10">
        {/* Header */}
        <View>
          {/* Seta para voltar */}
          <View className="w-16">
            <Link href="./">
              <TouchableOpacity onPress={() => router.push("./medicamentos")}>
                <Image
                  source={require("../../assets/Arrow.png")}
                  className="w-8 h-8 m-5"
                />
              </TouchableOpacity>
            </Link>
          </View>

          {/* Texto */}
          <View className="mt-10">
            <Text className="capitalize font-bold text-[#35A296] text-2xl ml-5">
              Nova Receita
            </Text>
            <Text className="text-[#898989] ml-5 text-left">
              Adicione sua prescrição médica para receber
            </Text>
            <Text className="text-[#898989] ml-5 text-left">
              lembretes de quando tomar seu medicamento
            </Text>
          </View>
        </View>

        {/* Formulário */}
        <View className="mt-5 ">
          <View className="m-3">
            <View className="space-y-2">
              <Text className="font-bold text-[#898989]">
                Nome do medicamento
              </Text>
              <TextInput
                value={nomeMedicamento}
                onChangeText={setNomeMedicamento}
                placeholder={"Ex: Paracetamol 500gm"}
                className="border border-[#BCBABA] rounded-md p-3 "
              />
            </View>
          </View>
          <TextinhoModal
            title={"Hora de uso:"}
            subtitle={`${horaUso.hour.toString().padStart(2, "0")}:${horaUso.minute.toString().padStart(2, "0")}`}
            onPress={onOpenHoradeUso}
          />
          <View className="m-3">
            <View className="space-y-2">
              <Text className="font-bold text-[#898989]">Dosagem:</Text>
              <TextInput
                value={dosagem}
                onChangeText={setDosagem}
                placeholder={"Ex: 2 comprimidos"}
                className="border border-[#BCBABA] rounded-md p-3"
                keyboardType="numeric"
              />
            </View>
          </View>
          <TextinhoModal
            title={"Duração:"}
            subtitle={formatDuracao()}
            onPress={onOpenDuracao}
          />
          <TextinhoModal
            title={"Compartimento:"}
            subtitle={compartimento || "Selecione..."}
            onPress={onOpenCompartimento}
          />
        </View>

        <View className="items-center mb-10 mt-48">
          <View className="bg-[#92F2E8] rounded-lg px-7 py-4 mt-4 shadow">
            <TouchableOpacity onPress={handleCadastrar}>
              <Text className="text-[#35A296] font-bold">
                {" "}
                + Cadastrar Receita{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal hora de uso */}
        <Modalize ref={modalizeHoraUso} snapPoint={500} modalHeight={500}>
          <View className="ml-5 mt-10">
            <Text className="text-lg font-bold text-[#35A296]">
              Selecione o horário
            </Text>
            <Text className="text-[#898989] mt-1">
              Selecione abaixo a entrega deste medicamento
            </Text>
          </View>

          <TimePickerScroll
            initialHour={horaUso.hour}
            initialMinute={horaUso.minute}
            onTimeChange={(hour, minute) => {
              setHoraUso({ hour, minute });
            }}
          />

          <View className="p-5">
            <View className="bg-[#92F2E8] rounded-xl p-4">
              <TouchableOpacity
                onPress={() => modalizeHoraUso.current?.close()}
              >
                <Text className="text-[#35A296] text-center font-bold text-base">
                  Continuar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>

        {/* Modal Duração */}

        <Modalize ref={modalizeDuracao} snapPoint={600} modalHeight={600}>
          <View className="flex-1 ">
            <Text className="text-lg font-bold ml-5 mt-10 text-[#35A296]">
              Selecione a duração
            </Text>
            <Text className="text-[#898989] ml-5">
              Selecione abaixo a duração de entrega
            </Text>
            <Text className="text-[#898989] ml-5">deste medicamento</Text>

            <View className="mt-6">
              <DatePickerCalendar
                initialStartDate={duracao.startDate || new Date()}
                initialEndDate={duracao.endDate || undefined}
                onDateChange={(startDate, endDate) => {
                  setDuracao({ startDate, endDate });
                }}
              />
            </View>

            <View className="px-5 mt-5">
              <View className="bg-[#92F2E8] rounded-xl p-4">
                <TouchableOpacity
                  onPress={() => modalizeDuracao.current?.close()}
                >
                  <Text className="text-[#35A296] text-center font-bold text-base">
                    Continuar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modalize>

        <Modalize ref={modalizeCompartimento} snapPoint={600} modalHeight={600}>
          <View>
            <Text className="text-lg font-bold ml-5 mt-10 text-[#35A296]">
              Selecione o compartimento
            </Text>
            <Text className="text-[#898989] ml-5">
              Selecione abaixo qual compartimento será
            </Text>
            <Text className="text-[#898989] ml-5">
              realizado a entrega dos medicamentos
            </Text>

            <View className="flex justify-center items-center mt-14 mr-7 ml-5">
              <View className="gap-5">
                <View className="bg-[#F5F5F5] w-80 h-16 rounded-xl shadow-md  shadow-black">
                  <TouchableOpacity
                    onPress={() => {
                      setCompartimento("Compartimento 1");
                      modalizeCompartimento.current?.close();
                    }}
                  >
                    <View className="flex-row justify-between items-center px-3 mt-2 ">
                      <Text className="text-[#35A296] font-bold text-xl ml-3 mt-2">
                        Compartimento 1
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View className="bg-[#F5F5F5] w-80 h-16 rounded-xl shadow-md shadow-black">
                  <TouchableOpacity
                    onPress={() => {
                      setCompartimento("Compartimento 2");
                      modalizeCompartimento.current?.close();
                    }}
                  >
                    <View className="flex-row justify-between items-center px-3 mt-2 ">
                      <Text className="text-[#35A296] font-bold text-xl ml-3 mt-2">
                        Compartimento 2
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View className="bg-[#F5F5F5] w-80 h-16 rounded-xl shadow-md shadow-black">
                  <TouchableOpacity
                    onPress={() => {
                      setCompartimento("Compartimento 3");
                      modalizeCompartimento.current?.close();
                    }}
                  >
                    <View className="flex-row justify-between items-center px-3 mt-2 ">
                      <Text className="text-[#35A296] font-bold text-xl ml-3 mt-2">
                        Compartimento 3
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View className="bg-[#F5F5F5] w-80 h-16 rounded-xl shadow-md shadow-black">
                  <TouchableOpacity
                    onPress={() => {
                      setCompartimento("Compartimento 4");
                      modalizeCompartimento.current?.close();
                    }}
                  >
                    <View className="flex-row justify-between items-center px-3 mt-2 ">
                      <Text className="text-[#35A296] font-bold text-xl ml-3 mt-2">
                        Compartimento 4
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View className="px-5 mt-20">
              <View className="bg-[#92F2E8] rounded-xl p-4">
                <TouchableOpacity
                  onPress={() => modalizeCompartimento.current?.close()}
                >
                  <Text className="text-[#35A296] text-center font-bold text-base ">
                    Continuar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
}
