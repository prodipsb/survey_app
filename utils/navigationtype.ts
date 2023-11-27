import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootParamList = {
  home: undefined;
  profile: undefined;
  form: undefined;
  login: undefined;
};

export type NavigationType = NativeStackNavigationProp<
  RootParamList,
  'home' | 'form' | 'profile'
>;
