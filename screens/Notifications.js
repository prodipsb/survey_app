import { Image, View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuDrawer from 'react-native-side-drawer';
import {drawerStyles} from '../utils/drawerStyle';
import Sidebar from '../components/screenComponents/sidebar/Sidebar';
import PressableComponent from '../components/ui/PressableComponent';
import {Bars3Icon} from 'react-native-heroicons/solid';
import TextComponent from '../components/ui/TextComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import { EyeIcon } from 'react-native-heroicons/solid';
import {get} from '../utils/ApiCaller';
import {removeData} from '../utils/asyncStorage';
import { useNavigation } from '@react-navigation/native';

const Notifications = ({setUser, user}) => {

  const navigation = useNavigation();  
  const [open, setOpen] = useState(false);
  const [pushNotifications, setPushNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getUserNotificatoins = async () => {
      await get('push-notifications')
        .then(response => {
          if (response) {
            setPushNotifications(response?.data);
            setLoading(false);
          }
        })
        .catch(err => {
          if (err?.response?.status === 401) {
            removeData();
            setUser(null);
          }
          setLoading(false);
        });
    };

   getUserNotificatoins()

  }, []);


  const handleEyeIconPress = (notification) => {
     navigation.navigate('notificationDetails', notification);
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

            {pushNotifications ? (
              <>
              <View className="h-screen flex flex-col justify-center">
                <View  className="items-center mt-7 mb-3"><Text className="text-[25px] text-black font-bold">Notifications</Text></View>
                <View style={styles.container}>
                <ScrollView vertical={true}>
                  <View style={styles.table}>
                    <View style={styles.row}>
                      <Text style={[styles.header, { width: 30 }]}>SI</Text>
                      <Text style={styles.header}>Date</Text>
                      <Text style={styles.header}>Title</Text>
                      <Text style={styles.header}>Message</Text>
                      <Text style={styles.header}>Action</Text>
                    </View>

                    {pushNotifications.map((notification, index) => (
                      <View style={styles.row} key={index}>
                        <Text style={[styles.cell, { width: 3 }]}>{index + 1}</Text>
                        <Text style={styles.cell}>{notification.created_at}</Text>
                        <Text style={styles.cell}>{notification.message_title}</Text>
                        <Text style={styles.cell}>{notification.message}</Text>
                        <Text style={styles.cell}>
                        <TouchableOpacity onPress={() => handleEyeIconPress(notification)}>
                          <EyeIcon size={20} color="gray" />
                        </TouchableOpacity>
                        </Text>
                      </View>
                    ))}
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
          </View>
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
  table: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
});


export default Notifications;
