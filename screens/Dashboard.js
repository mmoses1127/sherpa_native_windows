import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../store/session";
import { fetchTemperatureSettings, sqlFetchTemperatureSettings, getTemperatureSettings } from "../store/temperatureSettings";
import { fetchSpeedSettings, getSpeedSettings } from "../store/speedSettings";
import TempItem from "./TempItem";
import SpeedItem from "./SpeedItem";
import { Button } from 'react-native';
import NavBar from "./NavBar";
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import { getUserType } from "../store/session";


const Dashboard = ( {navigation} ) => {
  const db = SQLite.openDatabase('example.db');

  const dispatch = useDispatch();
  const speedSettings = useSelector(getSpeedSettings);
  const userType = useSelector(getUserType);
  console.log('userType', userType)
  const temperatureSettings = useSelector(getTemperatureSettings);

  useEffect(() => {
    
  if (userType === 'A') {
    dispatch(fetchTemperatureSettings());
  } else {
    dispatch(fetchSpeedSettings());
  }

  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    navigation.navigate('AddSetting');
  };

  return (
    <View className="w-full h-full flex flex-col justify-center items-center">
      <View className="flex flex-col justify-center items-center">
        <NavBar />
        <View className="flex flex-col justify-center items-center min-w-[80%]">
          {userType === 'A' && temperatureSettings.map(temperatureSetting => <TempItem temperatureSetting={temperatureSetting} key={temperatureSetting.id} />
          )}
          
          {userType === 'B' && speedSettings.map(speedSetting => <SpeedItem speedSetting={speedSetting} key={speedSetting.id} />
          )}
        </View>
        <Button className="bg-blue m-2 w-1/4 min-w-[75px]" title="Add" onPress={handleAdd} />
      </View>
    </View>
  );
}

export default Dashboard;
