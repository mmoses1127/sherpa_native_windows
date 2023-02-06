import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserType } from "../store/session";
import { fetchUnits, getSpeedUnit, getTempUnit, updateSpeedUnit, updateTempUnit } from "../store/units"; 


export const convertCtoF = (temp) => {
  return Math.round(((temp * 9/5) + 32) * 10) / 10;
};

export const convertFtoC = (temp) => {
  return Math.round(((temp - 32) * 5/9) * 10) / 10;
};

export const speedLabels = {
  'Low': 1,
  'Med': 2,
  'High': 3
}

export const findSpeedLabel = (speedNumber) => {
  for (let key in speedLabels) {
    if (speedLabels[key] === speedNumber) {
      return key;
    }
  }
}

export const fetchUnit = async (userType) => {
  let unit;
  if (userType === 'A') {
    unit = await AsyncStorage.getItem('tempUnit');
    if (unit) {
      return unit ? unit : 'Fahrenheit';
    }
  } else {
    unit = await AsyncStorage.getItem('speedUnit');
    if (unit) {
      return unit ? unit : 'Numbers';
    }
  }
};

const Settings = ( { navigation, route } ) => {


  const dispatch = useDispatch();
  const userType = useSelector(getUserType)
  const tempUnit = useSelector(getTempUnit);
  const speedUnit = useSelector(getSpeedUnit);

  useEffect(() => {
    dispatch(fetchUnits())
  }, [userType]);
  
  const saveUnit = async (unit) => {
    if (userType === 'A') {
      dispatch(updateTempUnit(unit));
    } else {
      dispatch(updateSpeedUnit(unit));
    }
  };


  return (

    <View className="w-full h-full flex flex-col justify-center items-center">
      <View className='flex flex-col justify-center items-center w-full'>
        <Text className='text-xl mb-10'>{userType === 'A' ? 'Select Temperature Units' : 'Select Intensity Display Mode'}</Text>
        <View className="flex flex-row m-4">
        {userType === 'A' &&
          <View className="flex flex-row items-center justify-center">
            <Pressable className={` ${tempUnit === 'Fahrenheit' ? "flex flex-row justify-center items-center min-w-[110px] bg-blue-500 h-12" : "flex flex-row justify-center items-center min-w-[110px] bg-gray-200 h-12"}`} onPress={e => saveUnit('Fahrenheit')}>
              <Text className="text-white text-lg">{tempUnit === 'Fahrenheit' ? 'Fahrenheit \u2713' : 'Fahrenheit' }</Text>
            </Pressable>
            <Pressable className={` ${tempUnit === 'Celcius' ? "flex flex-row justify-center items-center min-w-[110px] bg-blue-500 h-12" : "flex flex-row justify-center items-center min-w-[110px] bg-gray-200 h-12"}`} onPress={e => saveUnit('Celcius')}>
              <Text className="text-white text-lg">{tempUnit === 'Celcius' ? 'Celcius \u2713' : 'Celcius' }</Text>
            </Pressable>
          </View>
        }

        {userType === 'B' &&
          <View className="flex flex-row items-center justify-center">
            <Pressable className={` ${speedUnit === 'Labels' ? "flex flex-row justify-center items-center min-w-[110px] bg-blue-500 h-12" : "flex flex-row justify-center items-center min-w-[110px] bg-gray-200 h-12"}`} onPress={e => saveUnit('Labels')}>
              <Text className="text-white text-lg">{speedUnit === 'Labels' ? 'Labels \u2713' : 'Labels' }</Text>
            </Pressable>
            <Pressable className={` ${speedUnit === 'Numbers' ? "flex flex-row justify-center items-center min-w-[110px] bg-blue-500 h-12" : "flex flex-row justify-center items-center min-w-[110px] bg-gray-200 h-12"}`} onPress={e => saveUnit('Numbers')}>
              <Text className="text-white text-lg">{speedUnit === 'Numbers' ? 'Numbers \u2713' : 'Numbers' }</Text>
            </Pressable>
          </View>
        }
        
        </View>
      </View>
    </View>

  )
  
}

export default Settings;