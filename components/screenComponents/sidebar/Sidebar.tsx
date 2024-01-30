import {View, Pressable} from 'react-native';
import React from 'react';
import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
  XMarkIcon,
  BellIcon
} from 'react-native-heroicons/solid';
import TextComponent from '../../ui/TextComponent';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../../utils/navigationtype';
import {removeData} from '../../../utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';

import Config from 'react-native-config';
import {UserType} from '../../../utils/userresponse';
const API = Config.APP_ENDPOINT;

interface SidebarType {
  setOpen: (open: boolean) => void;
  user: UserType | undefined;
  setUser: (open: UserType | null) => void;
}

const Sidebar: React.FC<SidebarType> = ({setOpen, user, setUser}) => {
  const toast = useToast();
  const navigation = useNavigation<NavigationType>();

  const handleLogout = async (): Promise<void> => {
    try {
      const {data} = await axios.post(API + '/logout', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      if (data) {
        await AsyncStorage.removeItem('userData');
        setUser(null);
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        removeData();
        setUser(null);
      } else {
        toast.show('Something went wrong...', {
          type: 'custom_error',
        });
      }
    }
  };

  return (
    <View className="bg-gray-600 flex-1 relative">
      <Pressable
        onPress={() => setOpen(false)}
        className="absolute right-3 top-3">
        <XMarkIcon size={30} color="white" />
      </Pressable>
      <View className="mt-32 ml-8">
        <Pressable
          onPress={() => navigation.replace('home')}
          className="flex flex-row items-center mb-8">
          <HomeIcon size={25} color="white" />
          <TextComponent
            content="Home"
            style="text-[18px] font-thin text-white ml-3"
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.replace('form')}
          className="flex flex-row items-center mb-8">
          <Square3Stack3DIcon size={25} color="white" />
          <TextComponent
            content="New Survey"
            style="text-[18px] font-thin text-white ml-3"
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.replace('surveys')}
          className="flex flex-row items-center mb-8">
          <Square3Stack3DIcon size={25} color="white" />
          <TextComponent
            content="All Surveys"
            style="text-[18px] font-thin text-white ml-3"
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.replace('notifications')}
          className="flex flex-row items-center mb-8">
          <BellIcon size={25} color="white" />
          <TextComponent
            content="Notifications"
            style="text-[18px] font-thin text-white ml-3"
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.replace('profile')}
          className="flex flex-row items-center mb-8">
          <UserCircleIcon size={25} color="white" />
          <TextComponent
            content="Profile"
            style="text-[18px] font-thin text-white ml-3"
          />
        </Pressable>
        {/* <Pressable
          onPress={() => navigation.replace('googleMap')}
          className="flex flex-row items-center mb-8">
          <UserCircleIcon size={25} color="white" />
          <TextComponent
            content="Google Tracking"
            style="text-[18px] font-thin text-white ml-3"
          />
        </Pressable> */}
        <Pressable
          className="flex flex-row items-center mb-8"
          onPress={() => handleLogout()}>
          <ArrowRightOnRectangleIcon size={25} color="white" />
          <TextComponent
            content="Logout"
            style="text-[18px] font-thin text-white ml-3"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Sidebar;
