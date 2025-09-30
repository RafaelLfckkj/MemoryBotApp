import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

const ITEM_HEIGHT = 50;

interface TimePickerScrollProps {
  onTimeChange?: (hour: number, minute: number) => void;
  initialHour?: number;
  initialMinute?: number;
}

export default function TimePickerScroll({
  onTimeChange,
  initialHour = 12,
  initialMinute = 0,
}: TimePickerScrollProps) {
  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);

  const hourScrollRef = useRef<ScrollView>(null);
  const minuteScrollRef = useRef<ScrollView>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  useEffect(() => {
    const timer = setTimeout(() => {
      hourScrollRef.current?.scrollTo({
        y: initialHour * ITEM_HEIGHT,
        animated: false,
      });
      minuteScrollRef.current?.scrollTo({
        y: initialMinute * ITEM_HEIGHT,
        animated: false,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleHourScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (index >= 0 && index < hours.length) {
      const newHour = hours[index];
      setSelectedHour(newHour);
      onTimeChange?.(newHour, selectedMinute);
    }
  };

  const handleMinuteScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (index >= 0 && index < minutes.length) {
      const newMinute = minutes[index];
      setSelectedMinute(newMinute);
      onTimeChange?.(selectedHour, newMinute);
    }
  };

  const renderTimeItem = (value: number, isSelected: boolean) => {
    return (
      <View key={value} className="h-[50px] justify-center items-center">
        {isSelected ? (
          <View className="bg-[#F5F5F5] rounded-2xl px-6 py-2 shadow">
            <Text className="text-2xl font-bold text-black">
              {value.toString().padStart(2, "0")}
            </Text>
          </View>
        ) : (
          <Text className="text-2xl font-normal text-gray-300">
            {value.toString().padStart(2, "0")}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View className="justify-center items-center py-4">
      <View className="flex-row justify-center items-center h-[250px] w-full relative">
        {/* Hours */}
        <View className="flex-1 items-center h-[250px] overflow-hidden">
          <ScrollView
            ref={hourScrollRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onMomentumScrollEnd={handleHourScroll}
            onScrollEndDrag={handleHourScroll}
            contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
          >
            {hours.map((hour) => renderTimeItem(hour, hour === selectedHour))}
          </ScrollView>
        </View>

        {/* Separator */}
        <Text className="text-3xl font-bold mx-3 text-black">:</Text>

        {/* Minutes */}
        <View className="flex-1 items-center h-[250px] overflow-hidden">
          <ScrollView
            ref={minuteScrollRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onMomentumScrollEnd={handleMinuteScroll}
            onScrollEndDrag={handleMinuteScroll}
            contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
          >
            {minutes.map((minute) =>
              renderTimeItem(minute, minute === selectedMinute)
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}