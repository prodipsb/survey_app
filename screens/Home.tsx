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
import {ProfileInfo, SubmitInfo} from '../utils/userresponse';
import {
  notificationListener,
  requestUserPermission,
} from '../utils/notificationUtils';
import {getData, removeData} from '../utils/asyncStorage';
import FlatListComponent from '../components/ui/FlatListComponent';
import {get} from '../utils/ApiCaller';
import {useToast} from 'react-native-toast-notifications';
import { requestNotificationPermission } from '../utils/notification permission';

const Home: React.FC<ScreenType> = ({setUser, user}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>();
  const [userSubmitInfo, setUserSubmitInfo] = useState<SubmitInfo[] | null>();

  const toast = useToast();

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    
    getProfile();
    getDashboardStats();

  }, []);

  const getProfile = async () => {
    try {
      const profileData = await getData();
      setProfileInfo(profileData?.user);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        removeData();
        setUser(null);
      }
    }
  };

  const getDashboardStats = async () => {
    const profileData = await getData();
    try {
      const payload={
        user_id: profileData?.user?.id
      }
      const {data} = await get('dashboard',payload);
      setUserSubmitInfo(data?.stats);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        removeData();
        setUser(null);
      } else {
        toast.show('Unauthorized user...', {
          type: 'custom_error',
        });
      }
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
