import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

interface SeletorDiasSemanaProps {
  diasSelecionados?: string[];
  onChangeDias?: (dias: string[]) => void;
}

export default function SeletorDiasSemana({ 
  diasSelecionados = [], 
  onChangeDias 
}: SeletorDiasSemanaProps) {
  const [dias, setDias] = useState<string[]>(diasSelecionados);

  const diasSemana = [
    { sigla: 'D', nome: 'Domingo' },
    { sigla: 'S', nome: 'Segunda' },
    { sigla: 'T', nome: 'Terça' },
    { sigla: 'Q', nome: 'Quarta' },
    { sigla: 'Q', nome: 'Quinta' },
    { sigla: 'S', nome: 'Sexta' },
    { sigla: 'S', nome: 'Sábado' },
  ];

  const toggleDia = (index: number) => {
    const diaNome = diasSemana[index].nome;
    let novosDias;
    
    if (dias.includes(diaNome)) {
      novosDias = dias.filter(d => d !== diaNome);
    } else {
      novosDias = [...dias, diaNome];
    }
    
    setDias(novosDias);
    onChangeDias?.(novosDias);
  };

  const isDiaSelecionado = (nome: string) => dias.includes(nome);

  return (
    <View className="flex-row justify-around px-5 mt-5">
      {diasSemana.map((dia, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleDia(index)}
          className={`w-12 h-12 rounded-full justify-center items-center border-2
            ${isDiaSelecionado(dia.nome) 
              ? 'bg-[#35A296] border-[#35A296]' 
              : 'bg-white border-gray-300'
            }`}
        >
          <Text 
            className={`font-bold ${
              isDiaSelecionado(dia.nome) ? 'text-white' : 'text-gray-600'
            }`}
          >
            {dia.sigla}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}