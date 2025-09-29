import { router, useRouter } from "expo-router";
import { Link } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


import { Platform } from "react-native";

export default function CadastroReceita() {

  
  const modalizeHoraUso = useRef<Modalize>(null);
  const [horaUso, setHoraUso] = useState(new Date());

  // const modalizeReflogin = useRef<Modalize>(null);

  function onOpenHoradeUso() {
    modalizeHoraUso.current?.open();
  }

  // function onOpenLogin() {
  //   modalizeReflogin.current?.open();
  // }

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View>
          {/* Seta para voltar */}
          <View className="w-16">
            <Link href="./">
              <TouchableOpacity onPress={() => router.push("./")}>
                <Image
                  source={require("../../assets/Arrow.png")}
                  className="w-8 h-8 m-5"
                />
              </TouchableOpacity>
            </Link>
          </View>

          {/* Texto */}
          <View>
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
          <Textinho
            title={"Nome do medicamento:"}
            subtitle={"Ex: Paracetamol 500gm"}
          />
          <Textinho
            title={"Hora de uso:"}
            subtitle={"HH:mm"}
            onPress={onOpenHoradeUso}
          />
          <Textinho title={"Dosagem"} subtitle={"Ex: 2 comprimidos"} />
          <Textinho title={"Duração:"} subtitle={"Selecione"} />
        </View>

        <View className="items-center mb-10">
          <Buttons subtitle={"+ Cadastrar receita"} />
        </View>

        {/* Modal hora de uso */}
        <Modalize ref={modalizeHoraUso} snapPoint={500} modalHeight={500}>
          <View className="flex-1 ">
            <Text className="text-lg font-bold ml-5 mt-10">
              Selecione o horário
            </Text>
            <Text className="text-[#898989] ml-5">
              Selecione abaixo a entrega deste medicamento
            </Text>
          </View>

      
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
}
