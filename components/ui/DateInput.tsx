/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {CalendarDaysIcon} from 'react-native-heroicons/solid';
import {Pressable, View} from 'react-native';
import TextComponent from './TextComponent';
import {DateInputType} from '../types/uiTypes';

const DateInput: React.FC<DateInputType> = ({
  date,
  name,
  handleChange,
  preview,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View className="flex-1">
      {preview ? (
        <TextComponent
          content={date?.toLocaleString().split(',')[0]}
          style="text-[18px] text-black mt-3 border-b pb-2"
        />
      ) : (
        <>
          <Pressable
            onPress={() => setOpen(true)}
            className="flex flex-row w-full justify-between border-b pb-2 pt-2">
            <TextComponent
              content={date?.toLocaleString().split(',')[0]}
              style="text-[18px] text-black"
            />
            <TextComponent
              icon={<CalendarDaysIcon color={'black'} />}
              style="text-[18px]"
            />
          </Pressable>
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              handleChange({
                type: 'INPUT',
                payload: {name: name, value: date},
              });
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </>
      )}
    </View>
  );
};

export default DateInput;
