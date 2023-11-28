import React from 'react';
import {Asset} from 'react-native-image-picker';

export type PropsType = {
  style?: string;
  content?: string | number | null | Element;
  innerStyle?: string;
  icon?: React.ReactNode;
  handlePress?: () => void;
};

export type InputTextProp = {
  placeholder: string;
  style: string;
  secure?: boolean;
  handleChange?: (action: {
    type: string;
    payload: {name: string; value: string | Date | number};
  }) => void;
  handleInputChange?: (e: string) => void;
  defaultValue?: string | number | null;
  name?: string;
  preview?: boolean;
  type?: string;
  errorData?: string;
  keyboardType?: string | undefined;
  optional?: boolean | false;
};

export type DateInputType = {
  handleChange: (action: {
    type: string;
    payload: {name: string; value: string | Date};
  }) => void;
  name: string;
  date: Date;
  preview: boolean;
};

interface ExtendedHTMLImageElement extends HTMLImageElement {
  uri?: string;
}

export type ImageUploadType = {
  dispatch: (action: {
    type: string;
    payload: {name: string; value: HTMLImageElement};
  }) => void;
  name: string;
  defaultImage: ExtendedHTMLImageElement | null;
  content: string;
  preview: boolean;
  errorData: string;
};

export type MultiImageUploadType = {
  dispatch: (action: {
    type: string;
    payload: {name: string; value: HTMLImageElement[]};
  }) => void;
  name: string;
  defaultImage: ExtendedHTMLImageElement[];
  content: string;
  preview: boolean;
  errorData: string;
};

export type ImageInputWithoutReducerType = {
  handleImagehange?: (e: HTMLImageElement | Asset) => void;
};
