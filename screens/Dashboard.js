import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../store/session";
import { fetchTemperatureSettings, sqlFetchTemperatureSettings, getTemperatureSettings } from "../store/temperatureSettings";
import { fetchSpeedSettings, getSpeedSettings } from "../store/speedSettings";
import TempItem from "./TempItem";
import SpeedItem from "./SpeedItem";
import { Button } from 'react-native';
import Navigation from "./Navigation";
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';


const Dashboard = () => {

  const db = SQLite.openDatabase('example.db');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const speedSettings = useSelector(getSpeedSettings);
  const userType = useSelector(getCurrentUser).user_type;
  const temperatureSettings = useSelector(getTemperatureSettings);
  // const [temperatureSettings, setTemperatureSettings] = useState([]);

  useEffect(() => {
    
  if (userType === 'A') {
    
    dispatch(fetchTemperatureSettings());
    } else {
      // dispatch(fetchSpeedSettings());
    }

  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    navigate('/add-setting');
  };

  return (
    <View className="flex flex-col justify-center items-center">
      <Navigation />
      <View className="flex flex-col justify-center items-center min-w-[80%]">
        {userType === 'A' && temperatureSettings.map(temperatureSetting => <TempItem temperatureSetting={temperatureSetting} key={temperatureSetting.id} />
        )}
        
        {userType === 'B' && speedSettings.map(speedSetting => <SpeedItem speedSetting={speedSetting} key={speedSetting.id} />
        )}
      </View>
      <Button className="bg-blue m-2 w-1/4 min-w-[75px]" title="Add" onPress={handleAdd} />
    </View>
  );
}

export default Dashboard;
