import { useDispatch, useSelector } from "react-redux";
import { deleteTemperatureSetting } from "../store/temperatureSettings";
import { convertCtoF } from "./Settings";
import { Pressable, Text, View } from 'react-native';
import { useEffect, useState } from "react";
import { getUserType } from "../store/session";
import { useNavigation } from '@react-navigation/native';
import { convertToLocalTime } from "./clock";
import { fetchUnits } from "../store/units";

const TempItem = ( {temperatureSetting, tempUnit} ) => {
    
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userType = useSelector(getUserType);
  const temp = tempUnit === 'Fahrenheit' ? convertCtoF(temperatureSetting.temperature) : temperatureSetting.temperature;

  useEffect(() => {
    dispatch(fetchUnits())
  }, [userType]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTemperatureSetting(temperatureSetting.id));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    navigation.navigate('Edit Setting', {itemId: temperatureSetting.id});
  };
  

  return (
    <View className="flex flex-row justify-between items-center bg-cyan-300 m-3 h-12 p-3 w-full min-w-[300px]" key={temperatureSetting.id}>
      <Text className="text-xs" >Start: {convertToLocalTime(temperatureSetting.start_time).slice(11,16)}  End: {convertToLocalTime(temperatureSetting.end_time).slice(11,16)}  T: {Math.round(temp)}°{tempUnit ? tempUnit[0] : '-'}</Text>
      <View className="flex flex-row items-center jusitfy-end ml-1 h-10">
        <Pressable className="bg-red-500 p-1 rounded-sm m-1" onPress={handleDelete} >
          <Text className="text-xs text-white">Delete</Text>
        </Pressable>
        <Pressable className="bg-blue-500 p-1 rounded-sm m-1" onPress={handleUpdate} >
          <Text className="text-xs text-white">Edit</Text>
        </Pressable>
      </View>
    </View>
  )

}

export default TempItem;