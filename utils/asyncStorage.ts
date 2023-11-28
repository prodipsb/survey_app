import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileInfoType} from './userresponse';

export interface UserType {
  token_type: string;
  access_token: string;
}

export const storeData = async (userData: UserType): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('userData', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const getData = async (): Promise<UserType | null> => {
  try {
    const value = await AsyncStorage.getItem('userData');
    if (value !== null) {
      const userData = JSON.parse(value) as UserType;
      return userData;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const storeAuthData = async (userData: UserType): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('authData', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const getAuthData = async (): Promise<ProfileInfoType | null> => {
  try {
    const value = await AsyncStorage.getItem('authData');
    if (value !== null) {
      const authData = JSON.parse(value);
      return authData;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
