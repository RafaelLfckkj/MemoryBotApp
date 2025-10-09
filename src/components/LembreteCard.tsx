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
      <View className="bg-[#92F2E8] rounded-2xl p-4 mx-5 mb-4">
        <View className="flex-row justify-between items-start mb-3">
          <Text className="text-lg font-bold text-gray-800">{nome}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={require("../../assets/Trash.png")} />
          </TouchableOpacity>
        </View>
        
        <View className="flex-row gap-3">
          <View className="bg-white rounded-full px-3 py-2 flex-row items-center">
            <Image source={require("../../assets/Relogio.png")} />
            <Text className="text-sm font-medium text-gray-700">{horarios}</Text>
          </View>
          
          <View className="bg-white rounded-full px-3 py-2 flex-row items-center">
            <Image source={require("../../assets/Uptade.png")} />
            <Text className="text-sm font-medium text-gray-700">{dias}</Text>
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