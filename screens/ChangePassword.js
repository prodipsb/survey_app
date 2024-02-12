import { Image, View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import MenuDrawer from 'react-native-side-drawer';
import { drawerStyles } from '../utils/drawerStyle';
import Sidebar from '../components/screenComponents/sidebar/Sidebar';
import PressableComponent from '../components/ui/PressableComponent';
import { Bars3Icon } from 'react-native-heroicons/solid';
import TextComponent from '../components/ui/TextComponent';
import TouchableOpacityComponent from '../components/ui/TouchableOpacityComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import { useToast } from 'react-native-toast-notifications';

import Config from 'react-native-config';
import { post } from '../utils/ApiCaller';
import InputComponent from '../components/ui/InputComponent';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = ({ setUser, user }) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (text) => {
    setPassword(text?.payload?.value);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text?.payload?.value)
  };

  const handleSetPassword = async() => {
    if(!password){
      Alert.alert('Error', 'Password Value Required!');
      return false
    }
    if(!confirmPassword){
      Alert.alert('Error', 'Comfirm Password Value Required!');
      return false
    }
    if (password === confirmPassword) {

      const payload = {
        password: password,
        password_confirmation: confirmPassword,
      }
  
      try {
  
        const data = await post('password-update',payload);
         console.log('check user token store', data?.data?.message);
        
          if (data?.data?.code === 200) {
            navigation.replace('profile')
            toast.show(data?.data?.message)
          }
          

      } catch (err) {
        toast.show('Unauthorized user...', {
          type: 'custom_error',
        });
      }

    } else {
      // Passwords don't match, show an error message
      Alert.alert('Error', 'Passwords do not match');
    }
  };


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

            <View className="h-screen flex flex-col items-center justify-center">

              <View className="w-[85%] mx-auto">

                <View className="w-full h-[50px]">
                  <TextComponent
                    style="text-[20px] text-gray text-center font-bold"
                    content="Update Password"
                  />

                </View>

                <View className="w-full mt-5 mb-3">
                  <TextComponent
                    style="text-[18px] text-black"
                    content="New Password"
                  />
                  <InputComponent
                    style="text-[18px] text-black border-b"
                    placeholder="enter"
                    handleChange={handlePasswordChange}
                    name="password"
                    // errorData={errorData}
                    keyboardType="number-pad"
                  />
                </View>

                <View className="w-full mt-5 mb-3">
                  <TextComponent
                    style="text-[18px] text-black"
                    content="Confirm Password"
                  />
                  <InputComponent
                    style="text-[18px] text-black border-b"
                    placeholder="confirm enter"
                    handleChange={handleConfirmPasswordChange}
                    name="confirm_password"
                    // errorData={errorData}
                    keyboardType="number-pad"
                  />
                </View>


              </View>

              <TouchableOpacityComponent
                style="mt-6 mb-2 bg-gray-500 px-5 py-2 rounded-md"
                innerStyle="text-[18px] text-white"
                content={'Change Password'}
                handlePress={handleSetPassword}
              />

            </View>

          </View>
        </MenuDrawer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ChangePassword;
