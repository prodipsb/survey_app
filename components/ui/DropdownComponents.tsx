/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import TextComponent from './TextComponent';
import {View} from 'react-native';

type IDProps = {
  defaultValue: string;
  name: string;
  handleSelect: (action: {
    type: string;
    payload: {name: string; value: string};
  }) => void;
  data: {label: string; value: string}[];
  search: boolean;
  preview: boolean;
  errorData: string;
};

const DropdownComponents: React.FC<IDProps> = ({
  defaultValue,
  name,
  handleSelect,
  data,
  search,
  preview,
  errorData,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [items, setItems] = useState<{label: string; value: string}[] | []>([]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  useEffect(() => {
    handleSelect({
      type: 'INPUT',
      payload: {name: name, value: value},
    });
  }, [value]);

  return (
    <>
      {preview ? (
        <TextComponent
          style="text-[18px] text-black mt-3 border-b pb-2"
          content={defaultValue}
        />
      ) : (
        <View>
          {errorData && !preview && defaultValue === '' && (
            <TextComponent
              content={'Required field *'}
              style="text-red-500 text-[14px] mt-2"
            />
          )}
          <DropDownPicker
            style={{
              backgroundColor: 'rgb(226 232 240)',
              borderRadius: 0,
              borderWidth: 0,
              borderBottomWidth: 1.2,
              zIndex: 0,
            }}
            textStyle={{
              fontFamily: 'InriaSerif-Regular',
              fontSize: 18,
              color: open ? 'black' : 'gray',
            }}
            open={open}
            value={defaultValue}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            maxHeight={300}
            searchable={search}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            listItemContainerStyle={{
              height: 'auto',
              marginTop: 8,
              marginBottom: 8,
            }}
          />
        </View>
      )}
    </>
  );
};

export default DropdownComponents;
