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
import {login} from '../utils/ApiCaller';

const Login: React.FC<ScreenType> = ({setUser}) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationError, setValidationError] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const toast = useToast();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const request = async () => {
    const payload = {
      email: email,
      password: password,
      login_mode: 'app login',
    };

    await login('auth-login', payload)
      .then(response => {
        if (response?.data?.access_token) {
          storeData(response?.data);
          setUser(response?.data);
        }
      })
      .catch(err => {
        toast.show('You are not authorize to Login App', {
          type: 'danger',
        });
      });
  };

  const handleLogin = () => {
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
                    <EyeIcon size={20} color={'black'} />
                  ) : (
                    <EyeSlashIcon size={20} color={'black'} />
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
