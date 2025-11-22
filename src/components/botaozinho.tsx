import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface BotaozinhoProps {
  imageName: "icone1" | "icone2";
  title: string;
  isSelected?: boolean;
  onPress?: () => void;
}

export default function Botaozinho({
  imageName,
  title,
  isSelected = false,
  onPress,
}: BotaozinhoProps) {
  const imagens = {
    icone1: require("../../assets/Relogio.png"),
    icone2: require("../../assets/Marcado.png"),
  };

  return (
    <View
      style={{
        backgroundColor: isSelected ? "#35A296" : "#F5F5F5",
      }}
      className="flex-row items-center px-4 py-3 rounded-full shadow"
    >
      <TouchableOpacity onPress={onPress}>
        <Image
          source={isSelected ? imagens.icone2 : imagens[imageName]}
          className="w-5 h-5 mr-5"
        />
        <Text
          style={{
            color: isSelected ? "#FFFFFF" : "#374151",
          }}
          className="text-sm font-medium"
        >
          {title}
        </Text>

        {isSelected && <Text className="text-white text-lg ml-auto"></Text>}
      </TouchableOpacity>
    </View>
  );
}
