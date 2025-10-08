import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import TimePickerScroll from "./TimePickerScroll";

interface MultipleTimePickerScrollProps {
  onTimesChange?: (times: Array<{ hour: number; minute: number }>) => void;
  initialTimes?: Array<{ hour: number; minute: number }>;
  maxTimes?: number;
}

export default function MultipleTimePicker({
  onTimesChange,
  initialTimes = [{ hour: 10, minute: 0 }],
  maxTimes = 10,
}: MultipleTimePickerScrollProps) {
  const [times, setTimes] = useState(initialTimes);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const addTime = () => {
    if (times.length < maxTimes) {
      const newTimes = [...times, { hour: 10, minute: 0 }];
      setTimes(newTimes);
      setSelectedIndex(newTimes.length - 1);
      onTimesChange?.(newTimes);
    }
  };

  const removeTime = (index: number) => {
    if (times.length > 1) {
      const newTimes = times.filter((_, i) => i !== index);
      setTimes(newTimes);
      setSelectedIndex(Math.max(0, index - 1));
      onTimesChange?.(newTimes);
    }
  };

  const updateTime = (hour: number, minute: number) => {
    const newTimes = [...times];
    newTimes[selectedIndex] = { hour, minute };
    setTimes(newTimes);
    onTimesChange?.(newTimes);
  };

  return (
    <View>
      {/* Header com título e botão de deletar */}
      <View className="flex-row justify-between items-center px-5 ">
        <Text className="text-lg font-bold text-[#35A296]">
          Selecione o Horário
        </Text>
        {times.length > 1 && (
          <TouchableOpacity
            onPress={() => removeTime(selectedIndex)}
            className="w-8 h-8 justify-center items-center"
          >
            <Image
              source={require("../../assets/Trash.png")}  
            />
          </TouchableOpacity>
        )}
      </View>

      <Text className="text-[#898989] px-5 mb-4">
      Selecione abaixo a entrega deste medicamento
      </Text>

      {/* Seletor de horários */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-5 mb-4 bg-[#D9D9D9] w-80 shadow ml-[65px] h-8 rounded-full"
        contentContainerStyle={{ gap: 8 }}
      >
        {times.map((time, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedIndex(index)}
            className={`w-10 h-6 rounded-s-xl rounded-e-xl justify-center items-center border-2 shadow mt-1
              ${
                selectedIndex === index
                  ? "bg-white border-gray-300"
                  : "bg-[#BCBABA] border-[#BCBABA]"
              }`}
          >
            <Text
              className={`text-sm font-semibold
                ${selectedIndex === index ? "text-[#35A296]" : "text-[#35A296]"}
              `}
            >
              {index + 1}
            </Text>
          </TouchableOpacity>
        ))}

        {times.length < maxTimes && (
          <TouchableOpacity
            onPress={addTime}
          >
            <Text className="text-[#35A296] text-xl font-bold">+</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Time Picker */}
      <TimePickerScroll
        initialHour={times[selectedIndex].hour}
        initialMinute={times[selectedIndex].minute}
        onTimeChange={updateTime}
        key={selectedIndex}
      />
    </View>
  );
}
