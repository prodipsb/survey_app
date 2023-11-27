import {Pressable} from 'react-native';
import React from 'react';
import {PropsType} from '../types/uiTypes';
import TextComponent from './TextComponent';

const PressableComponent: React.FC<PropsType> = ({
  content,
  style,
  innerStyle,
  icon,
  handlePress,
}) => {
  return (
    <Pressable className={style} onPress={() => handlePress && handlePress()}>
      {icon ? icon : <TextComponent content={content} style={innerStyle} />}
    </Pressable>
  );
};

export default PressableComponent;
