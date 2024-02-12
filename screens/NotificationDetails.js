import { Image, View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MenuDrawer from 'react-native-side-drawer';
import {drawerStyles} from '../utils/drawerStyle';
import Sidebar from '../components/screenComponents/sidebar/Sidebar';
import PressableComponent from '../components/ui/PressableComponent';
import {Bars3Icon} from 'react-native-heroicons/solid';
import TextComponent from '../components/ui/TextComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const NotificationDetails = ({ route, user, setUser }) => {
  
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState();
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {

   getNotification()

  }, []);

  const getNotification = async () => {
    setNotification(route?.params);
    setLoading(false)
  }

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

        <View className="w-[85%] mx-auto">
            <PressableComponent
              handlePress={() => setOpen(true)}
              icon={<Bars3Icon size={25} color="black" />}
            />
          </View>
       
        <GestureHandlerRootView>
        <ScrollView ref={scrollRef}>
        {notification ? (
              <>
                <View className="h-screen flex flex-col justify-center">
                <View  className="items-center mt-2 mb-3">
                  <Text className="text-[25px] text-black font-bold">Notification Details</Text></View>
                <View style={styles.container}>
                <ScrollView vertical={true}>
                 <View style={{marginTop:10, marginBottom:50}}>
                  <View>
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Date : </Text>
                      <Text className='text-gray' style={styles.textColor}>{notification?.created_at}</Text>
                    </View>

                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Title : </Text>
                      <Text className='text-gray' style={styles.textColor}>{notification?.message_title}</Text>
                    </View>

                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Message : </Text>
                      <Text className='text-gray' style={styles.textColor}>{notification?.message}</Text>
                    </View>

                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Sender  : </Text>
                      <Text className='text-gray' style={styles.textColor}>{notification?.sender_name}</Text>
                    </View>

                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Receiver  : </Text>
                      <Text className='text-gray' style={styles.textColor}>{notification?.receiver_name}</Text>
                    </View>


                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Notification Read : </Text>
                      <Text className='text-gray' style={styles.textColor}>{notification?.read}</Text>
                    </View>

                    {notification?.read_at && (

                      <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Notification Read At : </Text>
                      <Text className='text-gray' style={styles.textColor}>{notification?.read_at}</Text>
                      </View>
                    )}
                  </View>
                 </View>
                </ScrollView>
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
        </ScrollView>
        </GestureHandlerRootView>
      </MenuDrawer>
    </View>
  </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 0, // Adjust as needed
  },
  dataContent:{
    flex:1, 
    flexDirection: 'row',
    marginBottom: 7
  },
  textColor: {
    color: 'gray'
  }
});

export default NotificationDetails;
