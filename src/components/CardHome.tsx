import { View, Text } from 'react-native';

export default function CardHome() {
 return (
   <View className="flex-1 items-center justify-center bg-[#ffffff] rounded-lg shadow-md m-2">
     <Text className="text-black text-lg font-bold">Título do Card</Text>
     <Text className="text-gray-600">Descrição do Card</Text>
   </View>
  );
}