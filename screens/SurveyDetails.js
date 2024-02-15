/* eslint-disable react-hooks/exhaustive-deps */
import { Image, View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MenuDrawer from 'react-native-side-drawer';
import {drawerStyles} from '../utils/drawerStyle';
import Sidebar from '../components/screenComponents/sidebar/Sidebar';
import PressableComponent from '../components/ui/PressableComponent';
import {Bars3Icon} from 'react-native-heroicons/solid';
import TextComponent from '../components/ui/TextComponent';
import {ScreenType} from '../components/types/screenComponentsType';
import axios from 'axios';
import {UserResponse} from '../utils/userresponse';
import TouchableOpacityComponent from '../components/ui/TouchableOpacityComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageInputWithoutReducer from '../components/ui/ImageInputWithoutReducer';
import Spinner from 'react-native-loading-spinner-overlay';
import {useToast} from 'react-native-toast-notifications';

import { EyeIcon } from 'react-native-heroicons/solid';


import Config from 'react-native-config';
import {get} from '../utils/ApiCaller';
import {removeData} from '../utils/asyncStorage';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const API = Config.APP_ENDPOINT;
const IMGAPI = Config.APP_IMAGE_URL;

const SurveyDetails = ({ route, user, setUser }) => {
  
  const [open, setOpen] = useState(false);
  const [survey, setSurvey] = useState();
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {

   getSurvey()

  }, []);

  const getSurvey = async () => {
    setSurvey(route?.params)
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
        {survey ? (
              <>
                <View>
                <View  className="items-center mt-2 mb-3">
                  <Text className="text-[25px] text-black font-bold">Survey Details</Text></View>
                <View style={styles.container}>
                <ScrollView vertical={true}>
                 <View style={{marginTop:10, marginBottom:50}}>
                  <View>

                    {survey?.surveySubmittedUserName && (
                      <View style={styles.dataContent}>
                        <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Surveyor : </Text>
                        <Text className='text-gray' style={styles.textColor}>{survey?.surveySubmittedUserName}</Text>
                    </View>
                    )}
                    
                    {survey?.surveySubmittedUserPhone && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Surveyor Phone : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.surveySubmittedUserPhone}</Text>
                    </View>
                     )}

                    {survey?.surveySubmittedUserEmail && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Surveyor Email : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.surveySubmittedUserEmail}</Text>
                    </View>
                    )}

                    {survey?.date && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Surveyor Date : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.date}</Text>
                    </View>
                     )}

                    {survey?.binHolderName && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Bin Holder Name : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.binHolderName}</Text>
                    </View>
                     )}

                    {survey?.binHolderMobile && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Bin Holder Mobile : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.binHolderMobile}</Text>
                    </View>
                     )}

                    {survey?.binHolderEmail && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Bin Holder Email : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.binHolderEmail}</Text>
                    </View>
                    )}

                    {survey?.binHolderNid && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Bin Holder NID : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.binHolderNid}</Text>
                    </View>
                    )}

                    {survey?.binNumber && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Bin Number : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.binNumber}</Text>
                    </View>
                    )}

                    {survey?.commissioneRate && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>CommissioneRate : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.commissioneRate}</Text>
                    </View>
                     )}

                    {survey?.businessStartDate && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Business Start Date : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.businessStartDate}</Text>
                    </View>
                    )}

                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Country : </Text>
                      <Text className='text-gray' style={styles.textColor}>{`Bangladesh`}</Text>
                    </View>
                    

                    {survey?.division && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Division : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.division}</Text>
                    </View>
                    )}

                    {survey?.circle && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Circle : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.circle}</Text>
                    </View>
                    )}

                    {survey?.shopName && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Shop Name : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.shopName}</Text>
                    </View>
                    )}

                    {survey?.brandName && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Brand Name : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.brandName}</Text>
                    </View>
                    )}

                    {survey?.areaOrshoppingMall && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Area Or Shopping Mall : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.areaOrshoppingMall}</Text>
                    </View>
                    )}

                    {survey?.businessRegisteredAddress && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Business Registered Address : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.businessRegisteredAddress}</Text>
                    </View>
                    )}

                    {survey?.outletAddress && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Outlet Address : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.outletAddress}</Text>
                    </View>
                    )}


                    {survey?.category && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Category : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.category}</Text>
                    </View>
                     )}


                    {survey?.subCategory && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Sub Category : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.subCategory}</Text>
                    </View>
                    )}

                    {survey?.numberOfOutlet && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Number Of Outlet : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.numberOfOutlet}</Text>
                    </View>
                    )}

                    {survey?.numberOfCounter && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Number Of Counter : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.numberOfCounter}</Text>
                    </View>
                    )}

                    {survey?.differentBin && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Different Bin : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.differentBin}</Text>
                    </View>
                    )}

                    {survey?.transactionType && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Transaction Type : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.transactionType}</Text>
                    </View>
                    )}

                    {survey?.posSoftwareProvider && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>POS Software Provider : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.posSoftwareProvider}</Text>
                    </View>
                    )}

                    {survey?.nrbApproved && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>NBR Approved : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.nrbApproved}</Text>
                    </View>
                    )}

                    {survey?.thirdPartyName && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Third Party Name : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.thirdPartyName}</Text>
                    </View>
                    )}

                    {survey?.monthlyAverageSales && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Monthly Average Sales : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.monthlyAverageSales}</Text>
                    </View>
                    )}

                    {survey?.monthlyAverageCustomer && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Monthly Average Customer : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.monthlyAverageCustomer}</Text>
                    </View>
                    )}

                    {survey?.onlineSaleAvailable && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Online Sale Available : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.onlineSaleAvailable}</Text>
                    </View>
                    )}

                    {survey?.onlineSaleParcent && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Online Sale Parcent : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.onlineSaleParcent}</Text>
                    </View>
                    )}

                    {survey?.onlineOrderMode && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Online Order Mode : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.onlineOrderMode}</Text>
                    </View>
                    )}

                    {survey?.productInfo && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Product Info : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.productInfo}</Text>
                    </View>
                    )}

                    {survey?.productName && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Product Name : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.productName}</Text>
                    </View>
                    )}

                    {survey?.productUnit && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Product Unit : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.productUnit}</Text>
                    </View>
                    )}

                    {survey?.unitPrice && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Unit Price : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.unitPrice}</Text>
                    </View>
                    )}

                    {survey?.vatParcent && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>VAT Parcent : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.vatParcent}</Text>
                    </View>
                    )}

                    {survey?.sdPercent && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>SD Percent : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.sdPercent}</Text>
                    </View>
                    )}

                    {survey?.priceIncludingVat && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Price Including VAT : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.priceIncludingVat}</Text>
                    </View>
                    )}

                    {survey?.priceExcludingVat && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Price Excluding VAT : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.priceExcludingVat}</Text>
                    </View>
                    )}

                    {survey?.stockKeeping && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Stock Keeping : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.stockKeeping}</Text>
                    </View>
                    )}

                    {survey?.posSoftware && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>POS Software : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.posSoftware}</Text>
                    </View>
                    )}

                    {survey?.posPrinter && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>POS Printer : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.posPrinter}</Text>
                    </View>
                    )}

                    {survey?.pcOrLaptop && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>PC Or Laptop : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.pcOrLaptop}</Text>
                    </View>
                    )}

                    {survey?.mushak && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Mushak : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.mushak}</Text>
                    </View>
                    )}

                    {survey?.router && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Router : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.router}</Text>
                    </View>
                    )}

                    {survey?.networking && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Networking : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.networking}</Text>
                    </View>
                    )}

                    {survey?.surveillance && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Surveillance : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.surveillance}</Text>
                    </View>
                    )}

                    {survey?.mobileOperator && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Mobile Operator : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.mobileOperator}</Text>
                    </View>
                    )}

                    {survey?.operatorCoverage && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Operator Coverage : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.operatorCoverage}</Text>
                    </View>
                    )}

                    {survey?.weeklyHoliday && (
                    <View style={styles.dataContent}>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>WeeklyHoliday : </Text>
                      <Text className='text-gray' style={styles.textColor}>{survey?.weeklyHoliday}</Text>
                    </View>
                    )}

                    {survey?.shopPic && (
                    <View>
                      <Text className='text-[15px] text-gray font-bold' style={styles.textColor}>Shop Image : </Text>
                      <Image
                        source={{uri: IMGAPI + survey?.shopPic}}
                        className="h-[300px] w-full mt-4"
                        resizeMode="contain"
                      />
                    </View>
                    )}

                    {survey?.binCertificate && (
                    <View>
                      <Text className='text-[15px] text-gray font-bold mt-3' style={styles.textColor}>BIN Certificate : </Text>
                      <Image
                        source={{uri: IMGAPI + survey?.binCertificate}}
                        className="h-[300px] w-full mt-4"
                        resizeMode="contain"
                      />
                    </View>
                     )}

                    {survey?.serveyItemList && (
                    <View>
                      <Text className='text-[15px] text-gray font-bold mt-3' style={styles.textColor}>Item Images : </Text>
                      {survey?.serveyItemList.map((item, index) => (
                        <Image
                          key={index} 
                          source={{uri:  IMGAPI +'/'+ item.url}} 
                          style={{height: 300, width: '100%', marginTop: 10}} 
                          resizeMode="contain"
                        />
                        
                      ))}
                      
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
  table: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: '#000',
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
  dataContent:{
    flex:1, 
    flexDirection: 'row',
    marginBottom: 7
  },
  textColor: {
    color: 'gray'
  }
});


export default SurveyDetails;
