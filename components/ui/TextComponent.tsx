import {Text} from 'react-native';
import React from 'react';
import {PropsType} from '../types/uiTypes';

const TextComponent: React.FC<PropsType> = ({style, icon, content}) => {
  return (
    <Text style={{fontFamily: 'InriaSerif-Regular'}} className={style}>
      {icon ? icon : content}
    </Text>
  );
};

export default TextComponent;
