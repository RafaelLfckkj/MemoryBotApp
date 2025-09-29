// DatePickerCalendar.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface DatePickerCalendarProps {
  onDateChange?: (startDate: Date, endDate: Date) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

export default function DatePickerCalendar({ 
  onDateChange,
  initialStartDate = new Date(),
  initialEndDate
}: DatePickerCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(initialStartDate);
  const [selectedEndDate, setSelectedEndDate] = useState(initialEndDate);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isInRange = (date: Date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const handleDateSelect = (date: Date) => {
    if (!isSelectingEnd) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      setIsSelectingEnd(true);
    } else {
      if (date < selectedStartDate) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
      setIsSelectingEnd(false);
      onDateChange?.(selectedStartDate, date);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const days = getDaysInMonth(currentMonth);
  
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <View className="px-5">
      {/* Month Navigation */}
      <View className="flex-row justify-between items-center mb-5 px-2">
        <TouchableOpacity onPress={prevMonth} className="w-8 h-8 justify-center items-center">
          <Text className="text-xl text-gray-700">‹</Text>
        </TouchableOpacity>
        
        <Text className="text-base font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        
        <TouchableOpacity onPress={nextMonth} className="w-8 h-8 justify-center items-center">
          <Text className="text-xl text-gray-700">›</Text>
        </TouchableOpacity>
      </View>

      {/* Week Days Header */}
      <View className="flex-row mb-3 px-1">
        {weekDays.map((day, index) => (
          <View key={index} className="flex-1 items-center">
            <Text className="text-gray-600 font-semibold text-xs">{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Weeks */}
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} className="flex-row mb-2">
          {week.map((date, dayIndex) => {
            if (!date) {
              return <View key={`empty-${weekIndex}-${dayIndex}`} className="flex-1 h-11" />;
            }

            const isStart = isSameDay(date, selectedStartDate);
            const isEnd = isSameDay(date, selectedEndDate);
            const inRange = isInRange(date);

            return (
              <View key={dayIndex} className="flex-1 items-center">
                <TouchableOpacity
                  onPress={() => handleDateSelect(date)}
                  className={`w-10 h-10 rounded-full justify-center items-center
                    ${inRange ? 'bg-[#92F2E8]' : ''}
                    ${isStart || isEnd ? 'bg-[#35A296]' : ''}
                  `}
                >
                  <Text
                    className={`text-sm font-medium
                      ${isStart || isEnd ? 'text-white' : ''}
                      ${inRange && !isStart && !isEnd ? 'text-[#35A296]' : ''}
                      ${!inRange ? 'text-gray-700' : ''}
                    `}
                  >
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ))}

      
    </View>
  );
}