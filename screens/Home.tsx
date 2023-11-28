/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Image} from 'react-native';
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
import {
  DeviceTokenType,
  ProfileInfoType,
  SubmitInfo,
} from '../utils/userresponse';
import axios from 'axios';

import Config from 'react-native-config';
import {
  notificationListener,
  requestUserPermission,
} from '../utils/notificationUtils';
import {getAuthData} from '../utils/asyncStorage';
import FlatListComponent from '../components/ui/FlatListComponent';
import {get} from '../utils/ApiCaller';
const API = Config.APP_ENDPOINT;

const Home: React.FC<ScreenType> = ({setUser, user}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfoType | null>();
  const [deviceToken, setDeviceToken] = useState<DeviceTokenType | null>();
  const [userSubmitInfo, setUserSubmitInfo] = useState<SubmitInfo[] | null>();

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  React.useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        setDeviceToken(token);
      },
      onNotification: function (notification) {
        // console.log('NOTIFICATION:', notification);
        // process the notification here
        // required on iOS only
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      senderID: '760559770443',
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
        const profileData = await getAuthData();
        setProfileInfo(profileData);
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
      setUserSubmitInfo(data.data.stats);
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
            <View className="h-screen flex flex-col items-center justify-center">
              <TextComponent
                content="Survey Application"
                style="text-[25px] text-black font-thin"
              />
              <TextComponent
                content={`Welcome Back, ${profileInfo?.name}`}
                style="text-[20px] text-black font-thin my-5"
              />

              <FlatListComponent data={userSubmitInfo} />

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
