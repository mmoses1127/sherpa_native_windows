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
  // const temperatureSettings = useSelector(getTemperatureSettings);
  const speedSettings = useSelector(getSpeedSettings);
  // const userType = useSelector(getCurrentUser).userType;
  const [userType, setUserType] = useState('A');
  console.log('hello from dashboard')
  const [temperatureSettings, setTemperatureSettings] = useState([]);

  // useEffect(() => {
  //   async () => {
  //     console.log('checking user')
  //     let type = await AsyncStorage.getItem('userType');
  //     setUserType(type);
  //   }
  // }, []);

  useEffect(() => {
    
  if (userType === 'A') {
    db.transaction(tx => {
      tx.executeSql(
        `select * from temperature_settings`,
        null,
        (txtObj, resultSet) => {
          if (resultSet.rows._array.length) {
            console.log('resultSet', resultSet.rows._array);
            setTemperatureSettings(resultSet.rows._array);
          }
        },
        (txtObj, error) => {
          console.log('error', error);
        }
      );
    });
    // let temps = dispatch(sqlFetchTemperatureSettings());
    // console.log('temps', temps);
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
