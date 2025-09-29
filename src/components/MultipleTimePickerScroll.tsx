import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import TimePickerScroll from "./TimePickerScroll";

interface MultipleTimePickerScrollProps {
  onTimesChange?: (times: Array<{ hour: number; minute: number }>) => void;
  initialTimes?: Array<{ hour: number; minute: number }>;
  maxTimes?: number;
}

export default function MultipleTimePickerScroll({
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
      <View className="flex-row justify-between items-center px-5 mb-4">
        <Text className="text-lg font-bold text-[#35A296]">
          Horário do Check-in {selectedIndex + 1}
        </Text>
        {times.length > 1 && (
          <TouchableOpacity
            onPress={() => removeTime(selectedIndex)}
            className="w-8 h-8 justify-center items-center"
          >
            <Image
              source={require("../../assets/Trash.png")}
              className="w-8 h-8 m-5"
            />
          </TouchableOpacity>
        )}
      </View>

      <Text className="text-[#898989] px-5 mb-4">
        Selecione abaixo o horário de início do Check-in
      </Text>

      {/* Seletor de horários */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-5 mb-4"
        contentContainerStyle={{ gap: 8 }}
      >
        {times.map((time, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedIndex(index)}
            className={`w-10 h-10 rounded-full justify-center items-center border-2
              ${
                selectedIndex === index
                  ? "bg-[#35A296] border-[#35A296]"
                  : "bg-white border-gray-300"
              }`}
          >
            <Text
              className={`text-sm font-semibold
                ${selectedIndex === index ? "text-white" : "text-gray-600"}
              `}
            >
              {index + 1}
            </Text>
          </TouchableOpacity>
        ))}

        {times.length < maxTimes && (
          <TouchableOpacity
            onPress={addTime}
            className="w-10 h-10 rounded-full justify-center items-center border-2 border-[#35A296] bg-white"
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
