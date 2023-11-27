import {Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlatListPropsType, PropsType} from '../types/uiTypes';

const FlatListComponent: React.FC<FlatListPropsType> = ({data}) => {


  type ItemData = {
    name: string;
    count: number;
  };
  

  type ItemProps = {
    item: ItemData;
  };

  const Item = ({item}: ItemProps) => (
    <TouchableOpacity style={{ backgroundColor:'white', margin:10, padding: 20 }}>
      <Text>{item?.name}</Text>
      <Text>{item?.count}</Text>
    </TouchableOpacity>
  );


  const renderItem = ({item}: {item: ItemData}) => {

    return (
      <Item
        item={item}
      />
    );
  };

  return (
    <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.name}
      />
  );
};

export default FlatListComponent;
