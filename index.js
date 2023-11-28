/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

// If you need to handle when the app is opened from a notification
messaging().getInitialNotification().then(remoteMessage => {
  if (remoteMessage) {
    console.log('Opened from Notification:', remoteMessage);
  }
});

AppRegistry.registerComponent(appName, () => App);
