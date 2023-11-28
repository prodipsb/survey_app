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
import {DeviceTokenType, ProfileInfo, SubmitInfo} from '../utils/userresponse';
import axios from 'axios';

import Config from 'react-native-config';
import {
  notificationListener,
  requestUserPermission,
} from '../utils/notificationUtils';
import {getData, removeData} from '../utils/asyncStorage';
import FlatListComponent from '../components/ui/FlatListComponent';
import {get} from '../utils/ApiCaller';
import {Toast} from 'react-native-toast-notifications';
const API = Config.APP_ENDPOINT;
const NOTIFICATION_SENDER_ID = Config.APP_NOTIFICATION_SENDER_ID;

const Home: React.FC<ScreenType> = ({setUser, user}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>();
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
      senderID: NOTIFICATION_SENDER_ID,
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
        const profileData = await getData();
        setProfileInfo(profileData?.user);
      } catch (err: any) {
        if (err?.response?.status) {
          removeData();
          setUser(null);
        }
      }
    };
    getProfile();
    userDeviceTokenStore();
    getDashboardStats();
  }, []);

  const getDashboardStats = async () => {
    try {
      const {data} = await get('dashboard');
      setUserSubmitInfo(data?.stats);
    } catch (err: any) {
      if (err?.response?.status) {
        removeData();
        setUser(null);
      } else {
        Toast.show('Unauthorized user...', {
          type: 'custom_error',
        });
      }
    }
  };

  const userDeviceTokenStore = async () => {
    try {
      const {data} = await axios.post(
        API + '/store/device-tokens',
        {
          user_id: profileInfo?.id,
          user: profileInfo?.name,
          device_token: deviceToken?.token,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.access_token}`,
          },
        },
      );

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
