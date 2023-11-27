import {View} from 'react-native';
import React from 'react';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';
import PressableComponent from './PressableComponent';
import {ImageInputWithoutReducerType} from '../types/uiTypes';

const ImageInputWithoutReducer: React.FC<ImageInputWithoutReducerType> = ({
  handleImagehange,
}) => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  const openImagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.assets?.[0];
        if (imageUri) {
          handleImagehange && handleImagehange(imageUri);
        }
      }
    });
  };

  const handleCameraLaunch = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.assets?.[0];
        if (imageUri) {
          handleImagehange && handleImagehange(imageUri);
        }
      }
    });
  };

  return (
    <View className="flex flex-row justify-between mt-5 mb-5">
      <PressableComponent
        handlePress={openImagePicker}
        style="bg-blue-500 px-5 py-2 rounded-md mr-3"
        innerStyle="text-[16px] text-white font-semi-bold"
        content="Open Gallery"
      />
      <PressableComponent
        handlePress={handleCameraLaunch}
        style="bg-blue-500 px-5 py-2 rounded-md ml-3"
        innerStyle="text-[16px] text-white font-semi-bold"
        content="Open Camera"
      />
    </View>
  );
};

export default ImageInputWithoutReducer;
