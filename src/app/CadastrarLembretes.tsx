import { router } from "expo-router";
import { Link } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRef, useState } from "react";
import { Modalize } from "react-native-modalize";

import Textinho from "../components/Textinho";
import TextinhoModal from "../components/TextinhoModal";
import Buttons from "../components/Buttons";
import Botaozinho from "../components/botaozinho";
import MultipleTimePicker from "../components/MutipleTimePicker";

export default function CadastrarLembretes() {
  const [horarios, setHorarios] = useState([
    { hour: 10, minute: 0 },
    { hour: 17, minute: 0 },
  ]);

  const formatHorarios = () => {
    return horarios
      .map(
        (h) =>
          `${h.hour.toString().padStart(2, "0")}:${h.minute.toString().padStart(2, "0")}`
      )
      .join(", ");
  };

  const modalizeLembrete = useRef<Modalize>(null);
  const modalizeHoraUso = useRef<Modalize>(null);
  const modalizeDia = useRef<Modalize>(null);

  function onOpenLembrete() {
    modalizeLembrete.current?.open();
  }
  function onOpenHoradeUso() {
    modalizeHoraUso.current?.open();
  }
  function onOpenDia() {
    modalizeDia.current?.open();
  }

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white mt-10">
        {/* Header */}
        <View>
          {/* Seta para voltar */}
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

          {/* Texto */}
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
        <View className="mt-5 ">
          <TextinhoModal
            title="Lembrete:"
            subtitle="Ex: Lembrete de água"
            onPress={onOpenLembrete}
          />
          <TextinhoModal
            title={"Hora de uso:"}
            subtitle={formatHorarios()}
            onPress={onOpenHoradeUso}
          />
          <TextinhoModal
            title="Dia:"
            subtitle="Selecione..."
            onPress={onOpenDia}
          />
        </View>

        <View className="items-center mb-10">
          <Buttons subtitle={"+ Cadastrar um lembrete"} onPress={() => router.push("./lembretes")} />
        </View>

        {/* Modal's  */}

        <Modalize ref={modalizeLembrete} snapPoint={550} modalHeight={550}>
          <View className="ml-5 mt-10">
            <Text className="text-lg font-bold text-[#35A296]">
              Selecione o lembrete
            </Text>
            <Text className="text-[#898989] mt-1">
              Selecione abaixo a opção do seu lembrete ou opte
            </Text>
            <Text className="text-[#898989]">
              {" "}
              por um lembrete personalizado
            </Text>

            <View className="flex justify-center items-center bg-[#9CD8CE] w-30 h-[320px] mt-10 mr-7 ml-3 rounded-3xl">
              <View className="gap-5">
                <View className="bg-white w-72 h-11 rounded-xl"></View>
                <View className="bg-white w-72 h-11 rounded-xl"></View>
                <View className="bg-white w-72 h-11 rounded-xl"></View>
                <View className="bg-white w-72 h-11 rounded-xl"></View>
                <View className="bg-white w-72 h-11 rounded-xl"></View>
              </View>
            </View>

            <View className="p-5 mr-3">
              <TouchableOpacity
                className="bg-[#92F2E8] rounded-xl p-4"
                onPress={() => modalizeLembrete.current?.close()}
              >
                <Text className="text-[#35A296] text-center font-bold text-base">
                  Continuar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>

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

        <Modalize ref={modalizeDia} snapPoint={550} modalHeight={550}>
          <View className="ml-5 mt-10">
            <Text className="text-lg font-bold text-[#35A296]">
              Selecione os dias
            </Text>
            <Text className="text-[#898989] mt-1">
              Selecione abaixo os dias em que o lembrete será
            </Text>
            <Text className="text-[#898989]">tocado</Text>
          </View>
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
}
