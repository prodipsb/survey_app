import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';

interface ItemData {
  name: string;
  count: number;
}

interface FlatListComponentProps {
  data: ItemData[] | null | undefined;
}

const FlatListComponent: React.FC<FlatListComponentProps> = ({data}) => {
  return (
    <View className="flex flex-row gap-3">
      {data?.map((itemData, index) => (
        <TouchableOpacity
          key={index}
          className="bg-white py-3 w-[160px] rounded-md">
          <TextComponent
            content={itemData?.name}
            style="text-[14px] text-center text-black"
          />
          <TextComponent
            content={itemData?.count}
            style="text-[14px] text-center text-black pt-1"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FlatListComponent;
