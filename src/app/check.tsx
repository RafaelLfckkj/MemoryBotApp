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
import MultipleTimePickerScroll from "../components/MultipleTimePickerScroll";

export default function Check() {
  const modalizeHorario = useRef<Modalize>(null);
  const modalizeDuracao = useRef<Modalize>(null);
  const modalizeRepeticao = useRef<Modalize>(null);

  const [horarios, setHorarios] = useState([
    { hour: 10, minute: 0 },
    { hour: 17, minute: 0 },
  ]);

  function onOpenHorario() {
    modalizeHorario.current?.open();
  }

  function onOpenDuracao() {
    modalizeDuracao.current?.open();
  }

  function onOpenRepeticao() {
    modalizeRepeticao.current?.open();
  }

  const [duracaoSelecionada, setDuracaoSelecionada] = useState("Selecione...");
  const [repeticaoSelecionada, setRepeticaoSelecionada] =
    useState("Selecione...");

  const formatHorarios = () => {
    return horarios
      .map(
        (h) =>
          `${h.hour.toString().padStart(2, "0")}:${h.minute.toString().padStart(2, "0")}`
      )
      .join(", ");
  };

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View>
          <View className="w-16">
            <Link href="./home">
              <TouchableOpacity onPress={() => router.push("./home")}>
                <Image
                  source={require("../../assets/Arrow.png")}
                  className="w-8 h-8 m-5"
                />
              </TouchableOpacity>
            </Link>
          </View>

          <View>
            <Text className="capitalize font-bold text-[#35A296] text-2xl ml-5">
              Configurar Check-in
            </Text>
            <Text className="text-[#898989] ml-5 text-left">
              Defina os horários dos check-ins e configure
            </Text>
            <Text className="text-[#898989] ml-5 text-left">
              o número de repetições desejadas
            </Text>
          </View>
        </View>
        {/* Inputs */}
        <View className="mt-5">
          <TextinhoModal
            title="Horário do check-in:"
            subtitle={formatHorarios()}
            onPress={onOpenHorario}
          />
          <TextinhoModal
            title="Duração:"
            subtitle={duracaoSelecionada}
            onPress={onOpenDuracao}
          />
          <TextinhoModal
            onPress={onOpenRepeticao}
            title="Limite máximo de repetições:"
            subtitle={repeticaoSelecionada}
          />
        </View>
        {/* Botão Concluído */}
        <View className="items-center mb-10">
          <Buttons subtitle="Concluído" />
        </View>

        {/* Modal */}
        <Modalize ref={modalizeHorario} snapPoint={550} modalHeight={550}>
          <View className="mt-8">
            <MultipleTimePickerScroll
              initialTimes={horarios}
              onTimesChange={(times) => setHorarios(times)}
              maxTimes={5}
            />
          </View>

          <View className="px-5 mt-4">
            <TouchableOpacity
              className="bg-[#92F2E8] rounded-xl p-4"
              onPress={() => modalizeHorario.current?.close()}
            >
              <Text className="text-[#35A296] text-center font-bold text-base">
                Continuar
              </Text>
            </TouchableOpacity>
          </View>
        </Modalize>

        <Modalize ref={modalizeDuracao} snapPoint={400} modalHeight={400}>
          <View>
            {/* Texto */}
            <View className="ml-5 mt-10">
              <Text className="text-lg font-bold text-[#35A296]">
                Selecione a duração
              </Text>
              <Text className="text-[#898989] mt-1">
                Selecione abaixo a duração do efeito sonoro do
              </Text>
              <Text className="text-[#898989]">Check-in</Text>
            </View>

            {/* Grid 2x2 de botões */}
            <View className="px-5 mt-8">
              {/* Primeira linha */}
              <View className="flex-row mb-3">
                <View className="flex-1 mr-2">
                  <Botaozinho
                    imageName="icone1"
                    title="10 seg"
                    isSelected={duracaoSelecionada === "10 seg"}
                    onPress={() => setDuracaoSelecionada("10 seg")}
                  />
                </View>
                <View className="flex-1 ml-2">
                  <Botaozinho
                    imageName="icone1"
                    title="20 seg"
                    isSelected={duracaoSelecionada === "20 seg"}
                    onPress={() => setDuracaoSelecionada("20 seg")}
                  />
                </View>
              </View>

              {/* Segunda linha */}
              <View className="flex-row">
                <View className="flex-1 mr-2">
                  <Botaozinho
                    imageName="icone1"
                    title="50 seg"
                    isSelected={duracaoSelecionada === "50 seg"}
                    onPress={() => setDuracaoSelecionada("50 seg")}
                  />
                </View>
                <View className="flex-1 ml-2">
                  <Botaozinho
                    imageName="icone1"
                    title="Outro"
                    isSelected={duracaoSelecionada === "Outro"}
                    onPress={() => setDuracaoSelecionada("Outro")}
                  />
                </View>
              </View>
            </View>

            {/* Botão Continuar */}
            <View className="px-5 mt-8">
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

        {/* Modal Repetição */}

        <Modalize ref={modalizeRepeticao} snapPoint={400} modalHeight={400}>
          <View>
            {/* Texto */}
            <View className="ml-5 mt-10">
              <Text className="text-lg font-bold text-[#35A296]">
                Selecione o limite de repetições
              </Text>
              <Text className="text-[#898989] mt-1">
                Selecione abaixo o limite de repetições de Check-in
              </Text>
              <Text className="text-[#898989]">
                para o envio de uma notificação ao cuidador
              </Text>
            </View>

            {/* Grid 2x2 de botões */}
            <View className="px-5 mt-8">
              {/* Primeira linha */}
              <View className="flex-row mb-3">
                <View className="flex-1 mr-2">
                  <Botaozinho
                    imageName="icone1"
                    title="1 vez"
                    isSelected={repeticaoSelecionada === "1 vez"}
                    onPress={() => setRepeticaoSelecionada("1 vez")}
                  />
                </View>
                <View className="flex-1 ml-2">
                  <Botaozinho
                    imageName="icone1"
                    title="2 vez"
                    isSelected={repeticaoSelecionada === "2 vez"}
                    onPress={() => setRepeticaoSelecionada("2 vez")}
                  />
                </View>
              </View>

              {/* Segunda linha */}
              <View className="flex-row">
                <View className="flex-1 mr-2">
                  <Botaozinho
                    imageName="icone1"
                    title="3 vez"
                    isSelected={repeticaoSelecionada === "3 vez"}
                    onPress={() => setRepeticaoSelecionada("3 vez")}
                  />
                </View>
                <View className="flex-1 ml-2">
                  <Botaozinho
                    imageName="icone1"
                    title="Outro"
                    isSelected={repeticaoSelecionada === "Outro"}
                    onPress={() => setRepeticaoSelecionada("Outro")}
                  />
                </View>
              </View>
            </View>

            {/* Botão Continuar */}
            <View className="px-5 mt-8">
              <TouchableOpacity
                className="bg-[#92F2E8] rounded-xl p-4"
                onPress={() => modalizeRepeticao.current?.close()}
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
