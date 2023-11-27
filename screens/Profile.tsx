/* eslint-disable react-hooks/exhaustive-deps */
import {Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuDrawer from 'react-native-side-drawer';
import {drawerStyles} from '../utils/drawerStyle';
import Sidebar from '../components/screenComponents/sidebar/Sidebar';
import PressableComponent from '../components/ui/PressableComponent';
import {Bars3Icon} from 'react-native-heroicons/solid';
import TextComponent from '../components/ui/TextComponent';
import {ScreenType} from '../components/types/screenComponentsType';
import axios from 'axios';
// import {API, IMGAPI} from '../utils/endpoint';
import {UserResponse} from '../utils/userresponse';
import TouchableOpacityComponent from '../components/ui/TouchableOpacityComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageInputWithoutReducer from '../components/ui/ImageInputWithoutReducer';
import Spinner from 'react-native-loading-spinner-overlay';
import {useToast} from 'react-native-toast-notifications';

import Config from 'react-native-config';
const API = Config.APP_ENDPOINT;
const IMGAPI = Config.APP_IMAGE_URL;

const Profile: React.FC<ScreenType> = ({setUser, user}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<UserResponse | null>();
  const [profileImage, setProfileImage] = useState<any>(null);
  const [showImagePicker, setShowImagePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const {data} = await axios.get(API + '/profile', {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        if (data) {
          setProfileInfo(data.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', {
        uri: profileImage?.uri,
        type: profileImage?.type,
        name: profileImage?.fileName,
      });
      const {data} = await axios.post(API + '/avatar-update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      if (data) {
        toast.show('Profile image updated!', {
          type: 'custom_success',
        });
        const update: any = {...profileInfo};
        update.avatar = data.data;
        setProfileInfo(update);
        setLoading(false);
      }
    } catch (err) {
      toast.show('Something went wrong...', {
        type: 'custom_error',
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profileImage) {
      setLoading(true);
      updateImage();
      setProfileImage(null);
      setShowImagePicker(false);
    }
  }, [profileImage]);

  return (
    <SafeAreaView className="h-screen w-screen flex-1 bg-slate-200">
      <Spinner
        visible={loading}
        overlayColor="rgba(0, 0, 0, 0.70)"
        customIndicator={
          <Image
            className="w-[30%] h-[15%]"
            source={require('../assets/loader.gif')}
          />
        }
      />
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
          <View>
            <View className="w-[85%] mx-auto">
              <PressableComponent
                handlePress={() => setOpen(true)}
                icon={<Bars3Icon size={25} color="black" />}
              />
            </View>
            {profileInfo ? (
              <>
                <View className="h-screen flex flex-col items-center justify-center">
                  <Image
                    source={
                      profileInfo?.avatar
                        ? {uri: `${IMGAPI + profileInfo?.avatar}`}
                        : require('../assets/profile.png')
                    }
                    className="w-[200px] h-[200px] rounded-full"
                  />
                  {!showImagePicker && (
                    <TouchableOpacityComponent
                      style="mt-5 mb-5 bg-gray-500 px-5 py-2 rounded-md"
                      innerStyle="text-[18px] text-white"
                      content={'Change profile picture'}
                      handlePress={() => setShowImagePicker(!showImagePicker)}
                    />
                  )}
                  {showImagePicker && (
                    <ImageInputWithoutReducer
                      handleImagehange={setProfileImage}
                    />
                  )}

                  <View className="border w-[95%] mx-auto mt-[5%]">
                    <View className="flex flex-row">
                      <View className="p-2 border w-[30%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={'Name'}
                        />
                      </View>
                      <View className="p-2 border w-[70%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={profileInfo?.name}
                        />
                      </View>
                    </View>
                    <View className="flex flex-row">
                      <View className="p-2 border w-[30%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={'Gender'}
                        />
                      </View>
                      <View className="p-2 border w-[70%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={profileInfo?.gender}
                        />
                      </View>
                    </View>
                    <View className="flex flex-row">
                      <View className="p-2 border w-[30%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={'Email'}
                        />
                      </View>
                      <View className="p-2 border w-[70%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={profileInfo?.email}
                        />
                      </View>
                    </View>
                    <View className="flex flex-row">
                      <View className="p-2 border w-[30%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={'Phone'}
                        />
                      </View>
                      <View className="p-2 border w-[70%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={profileInfo?.phone}
                        />
                      </View>
                    </View>
                    <View className="flex flex-row">
                      <View className="p-2 border w-[30%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={'Join date'}
                        />
                      </View>
                      <View className="p-2 border w-[70%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={profileInfo?.date_of_joining}
                        />
                      </View>
                    </View>
                    <View className="flex flex-row">
                      <View className="p-2 border w-[30%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={'Role'}
                        />
                      </View>
                      <View className="p-2 border w-[70%]">
                        <TextComponent
                          style="text-[16px] text-black text-center"
                          content={profileInfo?.role?.name}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              !loading && (
                <View className="flex h-screen w-screen justify-center items-center">
                  <TextComponent
                    style="text-black text-[18px]"
                    content={'Something went wrong...'}
                  />
                </View>
              )
            )}
          </View>
        </MenuDrawer>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
