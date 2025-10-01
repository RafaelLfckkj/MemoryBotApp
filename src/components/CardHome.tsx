import { View, Text, Image, TouchableOpacity } from "react-native";

export default function CardHome({ title, subtitle, imageSource }) {
  return (
    <View className="flex-row items-center bg-[#BBDAD7] rounded-2xl shadow-2xl m-5 w-80 p-7  ">
      {/* Ícone ou imagem à esquerda */}
      <View className="w-24 h-24 rounded-lg bg-white items-center justify-center mr-5">
        {imageSource ? (
          <Image
            source={imageSource}
            className="w-30 h-30"
            resizeMode="contain"
          />
        ) : (
          <Text></Text>
        )}
      </View>

      {/* Texto à direita */}
      <View className="flex-1 mb-5">
        <Text className="text-2xl font-bold text-left">{title}</Text>
        <Text className="text-[12px] w-29 text-left">{subtitle}</Text>
      </View>

      {/* Seta de navegação */}
      <Text className="text-2xl text-gray-500 ml-2 mb-12">›</Text>
    </View>
  );
}
