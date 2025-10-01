import { router, useRouter } from "expo-router";
import { Link } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TimePickerScroll from "../components/TimePickerScroll";
import DatePickerCalendar from "../components/DatePickerCalendar";

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
import Textinho from "../components/Textinho";
import TextinhoModal from "../components/TextinhoModal";
import { useMedicamentos } from "../components/MedicamentosContext";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function CadastroReceita() {
  const modalizeHoraUso = useRef<Modalize>(null);
  const modalizeDuracao = useRef<Modalize>(null);

  const { adicionarMedicamento } = useMedicamentos();

  // Estados existentes...
  const [nomeMedicamento, setNomeMedicamento] = useState("");
  const [dosagem, setDosagem] = useState("");

  const handleCadastrar = () => {
    if (!nomeMedicamento.trim()) {
      Alert.alert("Erro", "Digite o nome do medicamento");
      return;
    }

    if (!dosagem.trim()) {
      Alert.alert("Erro", "Digite a dosagem");
      return;
    }

    if (!duracao.startDate || !duracao.endDate) {
      Alert.alert("Erro", "Selecione a duração do tratamento");
      return;
    }

    adicionarMedicamento({
      nome: nomeMedicamento,
      horario: `${horaUso.hour.toString().padStart(2, "0")}:${horaUso.minute.toString().padStart(2, "0")}`,
      dosagem: dosagem,
      duracao: duracao,
    });

    // Limpar campos após cadastrar
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
              />
            </View>
          </View>
          <TextinhoModal
            title={"Duração:"}
            subtitle={formatDuracao()}
            onPress={onOpenDuracao}
          />
        </View>

        <View className="items-center mb-10">
          <Buttons subtitle={"+ Cadastrar receita"} onPress={handleCadastrar} />
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

            <View className="px-5">
              <TouchableOpacity
                className="bg-[#92F2E8] rounded-xl p-4"
                onPress={() => modalizeDuracao.current?.close()}
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
