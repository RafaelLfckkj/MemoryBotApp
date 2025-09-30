import { View, Text, TouchableOpacity, Image } from "react-native";

interface MedicamentoCardProps {
  nome: string;
  horario: string;
  dosagem: string;
  onDelete?: () => void;
}

export default function MedicamentoCard({ 
  nome, 
  horario, 
  dosagem, 
  onDelete 
}: MedicamentoCardProps) {
  return (
    <View className="bg-[#BBDAD7] rounded-2xl p-5 mx-5 mb-4 shadow">
      <View className="flex-row justify-between items-start mb-3 ">
        <Text className="text-lg font-bold">{nome}</Text>
        <TouchableOpacity onPress={onDelete}>
          <Image source={require("../../assets/Trash.png")}/>
        </TouchableOpacity>
      </View>
      
      <View className="flex-row gap-3">
        <View className="bg-white rounded-full px-3 py-2 flex-row items-center shadow">
          <Image source={require("../../assets/Relogio.png")}/>
          <Text className="text-sm font-medium ml-3">{horario}</Text>
        </View>
        
        <View className="bg-white rounded-full px-3 py-2 flex-row items-center shadow">
            <Image source={require("../../assets/remediocard.png")}/>
          <Text className="text-sm font-medium ml-3">{dosagem}</Text>
        </View>
      </View>
    </View>
  );
}