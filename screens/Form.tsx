import {Alert, Image, ScrollView, View} from 'react-native';
import React, {useReducer, useRef, useState} from 'react';
import TextComponent from '../components/ui/TextComponent';
import {initialState} from '../states/initialState';
import {reducer} from '../states/formReducer';
import Form1 from '../components/screenComponents/Form/Form1';
import Form2 from '../components/screenComponents/Form/Form2';
import Form3 from '../components/screenComponents/Form/Form3';
import Form4 from '../components/screenComponents/Form/Form4';
import Form5 from '../components/screenComponents/Form/Form5';
import PressableComponent from '../components/ui/PressableComponent';
import {Bars3Icon, PencilSquareIcon} from 'react-native-heroicons/solid';
import {validation} from '../utils/formValidation';
import MenuDrawer from 'react-native-side-drawer';
import Sidebar from '../components/screenComponents/sidebar/Sidebar';
import {drawerStyles} from '../utils/drawerStyle';
import {ScreenType} from '../components/types/screenComponentsType';
import axios from 'axios';
import {createFormData} from '../utils/createFormdata';
import Spinner from 'react-native-loading-spinner-overlay';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../utils/navigationtype';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Config from 'react-native-config';
import {removeData} from '../utils/asyncStorage';
const API = Config.APP_ENDPOINT;

const Form: React.FC<ScreenType> = ({setUser, user}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [preview, setPreview] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef(null);

  const toast = useToast();
  const navigation = useNavigation<NavigationType>();

  const handleSubmit = () => {
    // console.log('alll state', state)
    // return true;
    const check = validation(state);
    if (check !== 'ok') {
      Alert.alert(
        'Validation failed!',
        'Please enter the required data field',
        [
          {
            text: 'OK',
            onPress: () => {
              setErrorData(check);
              scrollRef?.current?.scrollTo({y: 0, animated: true});
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Validation success!',
        'Do you want to preview the data',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              setPreview(true);
              scrollRef?.current?.scrollTo({y: 0, animated: true});
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const submitToDB = async () => {
    setLoading(true);
    try {
      const formData = createFormData(state);
      const {data} = await axios.post(API + '/survey-submission', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      if (data) {
        setLoading(false);
        toast.show('Survey Form Data submitted!', {
          type: 'custom_success',
        });
        navigation.push('home');
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        removeData();
        setUser(null);
      } else {
        toast.show(err, {
          type: 'custom_error',
        });
      }
      setLoading(false);
    }
  };

  const finalSubmit = () => {
    Alert.alert(
      'Final submission',
      'Do you want to submit the data',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => submitToDB()},
      ],
      {cancelable: false},
    );
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
      <View className="flex-1">
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
          {preview ? (
            <View className="flex flex-row justify-between items-center mb-5 w-[85%] mx-auto">
              <PressableComponent
                icon={<Bars3Icon size={25} color="black" />}
                handlePress={() => setOpen(true)}
              />
              <TextComponent
                content="Data previewing"
                style="text-[18px] text-center text-black font-semi-bold"
              />
              <PressableComponent
                icon={<PencilSquareIcon size={25} color="black" />}
                handlePress={() => setPreview(false)}
              />
            </View>
          ) : (
            <View className="flex flex-row items-center mb-5 w-[85%] mx-auto">
              <PressableComponent
                icon={<Bars3Icon size={25} color="black" />}
                handlePress={() => setOpen(true)}
              />
              <TextComponent
                content="Fill up the form carefully"
                style="text-[18px] text-center text-black font-semi-bold ml-5"
              />
            </View>
          )}
          <GestureHandlerRootView style={{flex: 1}}>
          <ScrollView ref={scrollRef}>
            <Form1
              state={state}
              dispatch={dispatch}
              preview={preview}
              errorData={errorData}
            />
            <Form2
              state={state}
              dispatch={dispatch}
              preview={preview}
              errorData={errorData}
            />
            <Form3
              state={state}
              dispatch={dispatch}
              preview={preview}
              errorData={errorData}
            />
            <Form4
              state={state}
              dispatch={dispatch}
              preview={preview}
              errorData={errorData}
            />
            <Form5
              state={state}
              dispatch={dispatch}
              preview={preview}
              errorData={errorData}
            />
            <View className="w-[85%] mx-auto mb-10 mt-5">
              <PressableComponent
                handlePress={() => {
                  preview ? finalSubmit() : handleSubmit();
                }}
                content={preview ? 'Final submit' : 'Submit'}
                style="bg-blue-500 py-2 rounded-md"
                innerStyle="text-center text-[18px] text-white font-bold"
              />
            </View>
          </ScrollView>
          </GestureHandlerRootView>
        </MenuDrawer>
      </View>
    </SafeAreaView>
  );
};

export default Form;
