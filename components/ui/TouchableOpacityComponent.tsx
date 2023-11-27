import {TouchableOpacity} from 'react-native';
import React from 'react';
import {PropsType} from '../types/uiTypes';
import TextComponent from './TextComponent';

const TouchableOpacityComponent: React.FC<PropsType> = ({
  content,
  style,
  innerStyle,
  icon,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      className={style}
      onPress={() => handlePress && handlePress()}>
      <TextComponent content={content} style={innerStyle} />
      {icon}
    </TouchableOpacity>
  );
};

export default TouchableOpacityComponent;
