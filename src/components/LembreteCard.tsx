import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import ModalConfirmacao from "./ModalConfirmacao";

interface LembreteCardProps {
  nome: string;
  horarios: string;
  dias: string;
  onDelete?: () => void;
}

export default function LembreteCard({ 
  nome, 
  horarios, 
  dias, 
  onDelete 
}: LembreteCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    setModalVisible(false);
    onDelete?.();
  };

  return (
    <>
      <View className="bg-[#BBDAD7] rounded-2xl p-6 mx-5 mb-4 shadow-black shadow-2xl">
        <View className="flex-row justify-between items-start mb-3">
          <Text className="text-lg font-bold">{nome}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={require("../../assets/Trash.png")} />
          </TouchableOpacity>
        </View>
        
        <View className="flex-row gap-3 mt-3">
          <View className="bg-white rounded-full px-3 py-2 flex-row items-center shadow-black shadow-xl">
            <Image source={require("../../assets/Relogio.png")} />
            <Text className="text-sm font-medium ml-3">{horarios}</Text>
          </View>
          
          <View className="bg-white rounded-full px-3 py-2 flex-row items-center shadow-black shadow-xl">
            <Image source={require("../../assets/Uptade.png")} />
            <Text className="text-sm font-medium ml-3">{dias}</Text>
          </View>
        </View>
      </View>

      <ModalConfirmacao
        visible={modalVisible}
        onConfirm={handleDelete}
        onCancel={() => setModalVisible(false)}
        title={`Deseja excluir ${nome}?`}
        message="Esta ação não poderá ser desfeita"
      />
    </>
  );
}