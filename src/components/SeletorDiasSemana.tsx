import { View, Text } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

interface SeletorDiasSemanaProps {
  diasSelecionados?: string[];
  onChangeDias?: (dias: string[]) => void;
}

export default function SeletorDiasSemana({
  diasSelecionados = [],
  onChangeDias,
}: SeletorDiasSemanaProps) {
  const [dias, setDias] = useState<string[]>(diasSelecionados);

  const diasSemana = [
    { sigla: "D", nome: "Domingo" },
    { sigla: "S", nome: "Segunda" },
    { sigla: "T", nome: "Terça" },
    { sigla: "Q", nome: "Quarta" },
    { sigla: "Q", nome: "Quinta" },
    { sigla: "S", nome: "Sexta" },
    { sigla: "S", nome: "Sábado" },
  ];

  const toggleDia = (index: number) => {
    const diaNome = diasSemana[index].nome;
    let novosDias;

    if (dias.includes(diaNome)) {
      novosDias = dias.filter((d) => d !== diaNome);
    } else {
      novosDias = [...dias, diaNome];
    }

    setDias(novosDias);
    onChangeDias?.(novosDias);
  };

  const isDiaSelecionado = (nome: string) => dias.includes(nome);

  return (
    <View className="flex-row justify-around px-5 mt-5 bg-[#F5F5F5] shadow-black shadow-2xl">
      {diasSemana.map((dia, index) => (
        <View
          className={`w-12 h-12 justify-center items-center border-2
            ${
              isDiaSelecionado(dia.nome)
                ? " border-[#92F2E8]"
                : "bg-white border-gray-300"
            }`}
        >
          <TouchableOpacity key={index} onPress={() => toggleDia(index)}>
            <Text
              className={`font-bold ${
                isDiaSelecionado(dia.nome) ? "" : "text-gray-600"
              }`}
            >
              {dia.sigla}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
