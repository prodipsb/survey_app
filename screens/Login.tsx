/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Image, KeyboardAvoidingView, StatusBar, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ArrowRightOnRectangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from 'react-native-heroicons/solid';
import TextComponent from '../components/ui/TextComponent';
import PressableComponent from '../components/ui/PressableComponent';
import TouchableOpacityComponent from '../components/ui/TouchableOpacityComponent';
import InputComponent from '../components/ui/InputComponent';
import {digituptoSix, emailExactRegex} from '../sampleData/regexdata';
import {storeData} from '../utils/asyncStorage';
import {ScreenType} from '../components/types/screenComponentsType';
import {useToast} from 'react-native-toast-notifications';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {login, post} from '../utils/ApiCaller';
import PushNotification from 'react-native-push-notification';
import Config from 'react-native-config';
import {DeviceTokenType, UserType} from '../utils/userresponse';
import axios from 'axios';

const Login: React.FC<ScreenType> = ({setUser}) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [deviceToken, setDeviceToken] = useState<DeviceTokenType | null>();
  const [validationError, setValidationError] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const toast = useToast();

  const NOTIFICATION_SENDER_ID = Config.APP_NOTIFICATION_SENDER_ID;
  const API = Config.APP_ENDPOINT;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        setDeviceToken(token);
      },
      onNotification: function (notification) {},
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

  const request = async () => {
    const payload = {
      email: email,
      password: password,
      login_mode: 'app login',
    };



    // Call the login function and handle the response
      await login('auth-login', payload)
      .then(response => {
        if (response?.data?.access_token) {
          if (response?.data) {
            storeData(response?.data);
            setUser(response?.data);
          }
          userDeviceTokenStore(response?.data);
        }
      })
      .catch(err => {
        // console.error('Error during login process:', err.message); // Log the error message
        toast.show(err.message, { // Show a toast message with the error message
          type: 'custom_error',
        });
      });


    

    // // Call the login function and handle the response
    //   await login('auth-login', payload)
    //   .then(response => {
    //     if (response?.data?.access_token) {
    //       if (response?.data) {
    //         storeData(response?.data);
    //         setUser(response?.data);
    //       }
    //       userDeviceTokenStore(response?.data);
    //     }
    //   })
    //   .catch(err => {
    //     console.error('Error during login process:', err); // Log the error
    //     toast.show('You are not authorized to login', {
    //       type: 'custom_error',
    //     });
    //   });

    // await login('auth-login', payload)
    //   .then(response => {
    //     // console.log('login response', response)
    //     if (response?.data?.access_token) {
    //       // console.log('response?.data', response?.data)

    //       if (response?.data) {
    //           storeData(response?.data);
    //           setUser(response?.data);
    //       }

    //       userDeviceTokenStore(response?.data);
    //     }
    //   })
    //   .catch(err => {
    //     console.log('aaaaa', err);
    //     toast.show('You are not authorize to login', {
    //       type: 'custom_error',
    //     });
    //   });



  };

  const handleLogin = () => {
    // console.log('password', password)
    // console.log('aaa', digituptoSix.test(password))

    // const password = '1234';
// console.log('password', password);
// console.log('aaa', /^\d{6}$/.test(password));

    if (email === '') {
      setValidationError(prevError => ({
        ...prevError,
        email: 'Required field*',
      }));
    }
    if (email !== '' && !emailExactRegex.test(email)) {
      setValidationError(prevError => ({
        ...prevError,
        email: 'Invalid email*',
      }));
    }
    if (password === '') {
      setValidationError(prevError => ({
        ...prevError,
        password: 'Required field*',
      }));
    }
    if (password !== '' && !digituptoSix.test(password)) {
      setValidationError(prevError => ({
        ...prevError,
        password: 'Password must 6 digit number',
      }));
      toast.show("Password must 6 digit number")
    }
    if (
      validationError.email === '' &&
      validationError.password === '' &&
      email !== '' &&
      password !== ''
    ) {
      request();
    }
  };

  useEffect(() => {
    if (email) {
      setValidationError(prevError => ({
        ...prevError,
        email: '',
      }));
    }
    if (password) {
      setValidationError(prevError => ({
        ...prevError,
        password: '',
      }));
    }
  }, [email, password]);

  const userDeviceTokenStore = async (profileInfo: UserType) => {
    const payload = {
      user_id: profileInfo?.user?.id,
      user: profileInfo?.user?.name,
      device_token: deviceToken?.token,
    }

    // console.log('befreo store token', payload)
    try {

      const data = await post('store/device-tokens',payload);
      // console.log('check user token store', data?.data)
      // const {data} = await axios.post(
      //   API + '/store/device-tokens',payload,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${profileInfo?.access_token}`,
      //     },
      //   },
      // );

      // if (data) {
      //   if (data?.code === 200) {
      //     storeData(profileInfo);
      //     setUser(profileInfo);
      //   }
      // }
    } catch (err) {
      toast.show('Unauthorized user...', {
        type: 'custom_error',
      });
    }
  };

  return (
    <View className="flex-1 relative h-screen w-screen bg-blue-500">
      <StatusBar barStyle={'light-content'} />
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require('../assets/light.png')}
          className="h-[225] w-[90]"
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          source={require('../assets/light.png')}
          className="h-[160] w-[65] opacity-75"
        />
      </View>
      <TextComponent
        style="text-white text-center top-11 font-semibold text-[50px] z-40"
        content="Login"
      />
      <KeyboardAvoidingView behavior="padding" className="flex-1 relative">
        <View
          style={{
            shadowColor: '#000',
          }}
          className="w-full absolute bottom-0 bg-[#D9D9D9] shadow-md rounded-t-[50px]">
          <View className="w-full flex flex-row justify-center">
            <Animated.Image
              entering={FadeInUp.delay(200).duration(1000).springify()}
              source={require('../assets/loginpage.png')}
              className="w-[180px] h-[180px] -top-[130px] mx-auto absolute"
            />
          </View>
          <View className="w-[85%] mx-auto mb-8 mt-16">
            <TextComponent
              style="text-red-500 text-[16px]"
              content={validationError.email}
            />
            <InputComponent
              style="border-b placeholder:text-[18px] text-[#514A4A]"
              placeholder="Email"
              handleInputChange={setEmail}
            />
            <TextComponent
              style="text-red-500 text-[16px] mt-5"
              content={validationError.password}
            />
            <View className="relative">
              <InputComponent
                style="border-b placeholder:text-[18px] text-[#514A4A]"
                placeholder="Password"
                secure={showPassword}
                handleInputChange={setPassword}
                keyboardType="number-pad"
              />
              <PressableComponent
                style="absolute right-3 top-[35%]"
                handlePress={togglePassword}
                icon={
                  showPassword ? (
                    <EyeSlashIcon size={20} color={'black'} />
                  ) : (
                    <EyeIcon size={20} color={'black'} />
                  )
                }
              />
            </View>
            <TouchableOpacityComponent
              handlePress={handleLogin}
              style="bg-[#146C94] h-[50px] flex flex-row justify-center items-center rounded-full mt-10"
              innerStyle="text-white text-[18px] mx-1"
              content="Login"
              icon={<ArrowRightOnRectangleIcon size={20} color={'white'} />}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
