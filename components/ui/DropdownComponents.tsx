/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef, useReducer} from 'react';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import TextComponent from './TextComponent';
import {TouchableWithoutFeedback, View, Platform, UIManager, findNodeHandle} from 'react-native';
import { reducer } from '../../states/formReducer';
import { initialState } from '../../states/initialState';
import { actionTypes } from '../../states/actionTypes';

// DropDownPicker.setListMode("MODAL")

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
  globalClose: boolean;
};

const DropdownComponents: React.FC<IDProps> = ({
  defaultValue,
  name,
  handleSelect,
  data,
  search,
  preview,
  errorData,
  globalClose
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [items, setItems] = useState<{label: string; value: string}[] | []>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<View>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setOpen(false)
    setItems(data);
  }, [data, globalClose]);

  useEffect(() => {
    handleSelect({
      type: 'INPUT',
      payload: {name: name, value: value},
    });
  }, [value]);

  const handleOpen = ()=> {
    setOpen(!open)
  }

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
            dropDownDirection="TOP"     
            zIndex={3000}
            zIndexInverse={1000}
            style={{
              backgroundColor: 'rgb(226 232 240)',
              borderRadius: 0,
              borderWidth: 0,
              borderBottomWidth: 1.2,
              zIndex:0,
            }}
            textStyle={{
              fontFamily: 'InriaSerif-Regular',
              fontSize: 18,
              color: open ? 'black' : 'black',
            }}
            placeholderStyle={{
              color: '#696969',
              fontSize: 16,
            }}
            dropDownContainerStyle={{
               borderColor: '#ccc',
               borderRadius: 10,
              // zIndex: 1000,
               elevation: 4,
              // position: 'absolute',
              alignSelf: 'center',
              position: 'relative',
              top: 0,
            }}
            open={open}
            value={defaultValue}
            items={items}
            setOpen={handleOpen}
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
