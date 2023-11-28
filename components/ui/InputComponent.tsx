import {TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {InputTextProp} from '../types/uiTypes';
import TextComponent from './TextComponent';
import {
  alphanumericAndSymbol,
  digituptoEleven,
  nineDigit,
  numberhiphen,
  numericSymbol,
} from '../../sampleData/regexdata';

const InputComponent: React.FC<InputTextProp> = ({
  placeholder,
  style,
  handleChange,
  secure,
  name,
  defaultValue,
  handleInputChange,
  preview,
  type,
  errorData,
  keyboardType,
  optional,
}) => {
  const [error, seterror] = useState<string>('');

  const handleInput = (e: string | number, fieldName: string) => {
    switch (type) {
      case 'numericSymbol': {
        if (e !== '' && !numericSymbol.test(String(e))) {
          return seterror('Only accept neumeric and symbol');
        } else {
          seterror('');
          return (
            handleChange &&
            handleChange({
              type: 'INPUT',
              payload: {name: fieldName, value: e},
            })
          );
        }
      }
      case 'binRegex': {
        e = String(e);
        if (e.length >= 9 && !e.includes('-')) {
          e = e.slice(0, 9) + '-' + e.slice(9);
        }
        if (e !== '' && e.length > 14) {
          return seterror('');
        } else {
          if (e.length === 9) {
            e += '-';
            return (
              handleChange &&
              handleChange({
                type: 'INPUT',
                payload: {
                  name: fieldName,
                  value: e,
                },
              })
            );
          } else {
            return (
              handleChange &&
              handleChange({
                type: 'INPUT',
                payload: {name: fieldName, value: e},
              })
            );
          }
        }
      }
      case 'alphanumericAndSymbol': {
        if (e !== '' && !alphanumericAndSymbol.test(String(e))) {
          return seterror('Only accept neumeric symbol');
        } else {
          seterror('');
          return (
            handleChange &&
            handleChange({
              type: 'INPUT',
              payload: {name: fieldName, value: e},
            })
          );
        }
      }
      case 'mobile': {
        if (e.toString().length === 1 && e.toString() !== '8') {
          return seterror('Acceptable format: 8801XXXXXXXXX');
        } else if (e.toString().length === 2 && e.toString() !== '88') {
          return seterror('Acceptable format: 8801XXXXXXXXX');
        } else if (e !== '' && e.toString().length === 14) {
          return seterror('');
        } else if (e !== '' && !digituptoEleven.test(String(e))) {
          return seterror('Only accept 13 digit');
        } else {
          seterror('');
          return (
            handleChange &&
            handleChange({
              type: 'INPUT',
              payload: {name: fieldName, value: e},
            })
          );
        }
      }
      default: {
        return (
          handleChange &&
          handleChange({
            type: 'INPUT',
            payload: {name: fieldName, value: e},
          })
        );
      }
    }
  };

  return (
    <View>
      {preview ? (
        defaultValue && (
          <TextComponent
            style="text-black text-[18px] mt-3 border-b pb-2"
            content={defaultValue}
          />
        )
      ) : (
        <View>
          <View>
            {!preview && !defaultValue && !error && errorData && !optional && (
              <TextComponent
                content={'Required field*'}
                style="text-red-500 text-[14px] mt-2"
              />
            )}
            {!preview && error && (
              <TextComponent
                content={error}
                style="text-red-500 text-[14px] mt-2"
              />
            )}
            {!preview && errorData === name && defaultValue && error === '' && (
              <TextComponent
                content={'Acceptable format: ' + placeholder}
                style="text-red-500 text-[14px] mt-2"
              />
            )}
          </View>
          <TextInput
            style={{fontFamily: 'InriaSerif-Regular'}}
            placeholder={placeholder}
            placeholderTextColor="gray"
            className={style}
            secureTextEntry={secure}
            keyboardType={keyboardType === undefined ? 'default' : 'number-pad'}
            value={defaultValue === null ? '' : defaultValue?.toString()}
            onChangeText={e =>
              name
                ? handleInput(e, name)
                : handleInputChange && handleInputChange(e)
            }
          />
        </View>
      )}
    </View>
  );
};

export default InputComponent;
