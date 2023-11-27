/* eslint-disable react-hooks/exhaustive-deps */
import {PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import {FormType} from '../types/screenComponentsType';
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const GetLocation: React.FC<FormType> = ({dispatch}) => {
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            dispatch({
              type: 'INPUT',
              payload: {name: 'latitude', value: position.coords.latitude},
            });
            dispatch({
              type: 'INPUT',
              payload: {name: 'longitude', value: position.coords.longitude},
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return <></>;
};

export default GetLocation;
