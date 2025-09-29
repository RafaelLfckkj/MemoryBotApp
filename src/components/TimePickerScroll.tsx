import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

const ITEM_HEIGHT = 60;

interface TimePickerScrollProps {
  onTimeChange?: (hour: number, minute: number) => void;
  initialHour?: number;
  initialMinute?: number;
}

export default function TimePickerScroll({ 
  onTimeChange, 
  initialHour = 12, 
  initialMinute = 0 
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
      <View key={value} className="h-[60px] justify-center items-center">
        <Text
          className={`text-4xl ${
            isSelected 
              ? 'font-bold text-black opacity-100' 
              : 'font-normal text-gray-400 opacity-30'
          }`}
        >
          {value.toString().padStart(2, '0')}
        </Text>
      </View>
    );
  };

  return (
    <View className="justify-center items-center">
      <View className="flex-row justify-center items-center h-[280px] w-full relative">
        {/* Hours */}
        <View className="flex-1 items-center h-[280px] overflow-hidden">
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
        <Text className="text-4xl font-bold mx-4 text-black">:</Text>

        {/* Minutes */}
        <View className="flex-1 items-center h-[280px] overflow-hidden">
          <ScrollView
            ref={minuteScrollRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onMomentumScrollEnd={handleMinuteScroll}
            onScrollEndDrag={handleMinuteScroll}
            contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
          >
            {minutes.map((minute) => renderTimeItem(minute, minute === selectedMinute))}
          </ScrollView>
        </View>

        {/* Selection Indicator */}
        <View 
          className="absolute top-[110px] left-0 right-0 h-[60px] bg-[#92F2E8]/30 rounded-lg mx-4"
          pointerEvents="none"
        />
      </View>
    </View>
  );
}