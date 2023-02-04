import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTemperatureSetting, sqlDeleteTemperatureSetting, removeTemperatureSetting } from "../store/temperatureSettings";
import { findUnitCookie, convertCtoF } from "./Settings";
import { Button, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const TempItem = ({temperatureSetting}) => {
  
  const db = SQLite.openDatabase('example.db');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tempUnit, setTempUnit] = useState('F');
  const userType = useSelector(getCurrentUser).user_type;
  
  const getUnit = async (userType, setTempUnit) => {

    let unit = await AsyncStorage.getItem('tempUnit');
    if (unit) {
      setTempUnit(unit[0]);
    }

    console.log('unit is', unit)
  };

  useEffect(() => {
    console.log('setting unit to')
    getUnit(userType, setTempUnit);
  }, []);

  const temp = tempUnit === 'F' ? convertCtoF(temperatureSetting.temperature) : temperatureSetting.temperature;

  const sqlDeleteTemperatureSetting = (db, temperatureSettingId) => {
    db.transaction(tx => {
      tx.executeSql(
        `delete from temperature_settings where id = ?`,
        [temperatureSettingId],
        (txtObj, resultSet) => {
          console.log('deleted temperature setting number ', temperatureSettingId)
        },
        (txtObj, error) => console.log('error', error)
      );
    });
    dispatch(removeTemperatureSetting(temperatureSettingId))
  }

  const handleDelete = (e) => {
    e.preventDefault();
    sqlDeleteTemperatureSetting(db, temperatureSetting.id);
    // dispatch(deleteTemperatureSetting(temperatureSetting.id))
    alert('Deleted')
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // navigate(`/temps/${temperatureSetting.id}`)
  };

  return (
    <View className="flex flex-row justify-between items-center bg-cyan-300 m-3 h-15 p-3 w-full" key={temperatureSetting.id}>
      <Text>Start: {temperatureSetting.start_time.slice(11,16)}  End: {temperatureSetting.end_time.slice(11,16)}  Temperature: {temp[temp.length - 1] === '0' ? temp.slice(0,-2) : temp}°{tempUnit}</Text>
      <View className="flex flex-row align-center">
        {/* <button onClick={handleDelete} className="bg-red m-3">Delete</button>
        <button onClick={handleUpdate} className="m-3 bg-blue">Edit</button> */}
        <Button color='red' title="Delete" onPress={handleDelete} />
        <Button title="Edit" onPress={handleUpdate} />
      </View>
    </View>
  )

}

export default TempItem;