/* eslint-disable react-hooks/exhaustive-deps */
import {View, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import MenuDrawer from 'react-native-side-drawer';
import {drawerStyles} from '../utils/drawerStyle';
import Sidebar from '../components/screenComponents/sidebar/Sidebar';
import PressableComponent from '../components/ui/PressableComponent';
import {Bars3Icon} from 'react-native-heroicons/solid';
import TextComponent from '../components/ui/TextComponent';
import {ScreenType} from '../components/types/screenComponentsType';
import {SafeAreaView} from 'react-native-safe-area-context';
import PushNotification from 'react-native-push-notification';
import {UserResponse} from '../utils/userresponse';
import axios from 'axios';

import Config from 'react-native-config';
import {
  notificationListener,
  requestUserPermission,
} from '../utils/notificationUtils';
import {Text} from 'react-native-svg';
import {getAuthData} from '../utils/asyncStorage';
import FlatListComponent from '../components/ui/FlatListComponent';
import {get} from '../utils/ApiCaller';
const API = Config.APP_ENDPOINT;

type ItemData = {
  name: string;
  count: number;
};

const DATA: ItemData[] = [
  {
    name: 'Today Submitted',
    count: 0,
  },
  {
    name: 'Monthly Submitted',
    count: 12,
  },
];

const Home: React.FC<ScreenType> = ({setUser, user}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<UserResponse | null>();
  const [deviceToken, setDeviceToken] = useState<UserResponse | null>();
  const [selectedId, setSelectedId] = useState<string>();
  const [stats, setStats] = useState<UserResponse>();

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  React.useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
        setDeviceToken(token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification here

        // required on iOS only
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: '760559770443',
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const authData = await getAuthData();
        setProfileInfo(authData);
      } catch (err) {
        console.log('user profile err', err);
      }
    };
    getProfile();
    userDeviceTokenStore();
    getDashboardStats();
  }, []);

  const getDashboardStats = async () => {
    try {
      const {data} = await get('dashboard');
      setStats(data.data.stats);
    } catch (err) {
      console.log('user stats err ', err);
    }
  };

  const userDeviceTokenStore = async () => {
    try {
      let formdata = new FormData();

      formdata.append('user_id', profileInfo?.id);
      formdata.append('user', profileInfo?.name);
      formdata.append('device_token', deviceToken?.token);

      const {data} = await axios.post(API + '/store/device-tokens', formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      if (data) {
        console.log('user device store api call', data);
      }
    } catch (err) {
      console.log('user token store err ', err);
    }
  };

  return (
    <SafeAreaView className="h-screen w-screen flex-1 bg-slate-200">
      <View>
        <MenuDrawer
          open={open}
          position={'left'}
          drawerContent={
            <Sidebar setOpen={setOpen} user={user} setUser={setUser} />
          }
          drawerPercentage={70}
          animationTime={250}
          overlay={true}
          style={drawerStyles}
          opacity={0.4}>
          <View className="w-[85%] mx-auto">
            <PressableComponent
              handlePress={() => setOpen(true)}
              icon={<Bars3Icon size={25} color="black" />}
            />
            <View className="h-screen flex flex-col items-center justify-center mt-10">
              <TextComponent
                content="Survey Application"
                style="text-[25px] text-black font-thin"
              />
              <TextComponent
                content={`Welcome Back, ${profileInfo?.name}`}
                style="text-[20px] text-black font-thin my-6"
              />

              <FlatListComponent data={stats} />

              <Image
                source={require('../assets/homepage.png')}
                className="h-[65%] w-full"
              />
            </View>
          </View>
        </MenuDrawer>
      </View>
    </SafeAreaView>
  );
};

export default Home;
