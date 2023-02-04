import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../store/session";
import { View, Button, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userType = useSelector(getCurrentUser).user_type;

export const convertCtoF = (temp) => {
  return Math.round(((temp * 9/5) + 32) * 10) / 10;
};

export const convertFtoC = (temp) => {
  return Math.round(((temp - 32) * 5/9) * 10) / 10;
};

export const speedLabels = {
  'Low': 1,
  'Medium': 2,
  'High': 3
}

export const findSpeedLabel = (speedNumber) => {
  for (let key in speedLabels) {
    if (speedLabels[key] === speedNumber) {
      return key;
    }
  }
}

export const getUnit = async (userType, setTempUnit, setSpeedUnit) => {
  if (userType === 'A') {
    let unit = await AsyncStorage.getItem('tempUnit');
    if (unit) {
      setTempUnit(unit);
    }
  } else {
    let unit = await AsyncStorage.getItem('speedUnit');
    if (unit) {
      setSpeedUnit(unit);
    }
  }
};

const Settings = () => {

  const navigate = useNavigate();
  // const userType = useSelector(getCurrentUser).userType;
  const userType = 'A';

  const [tempUnit, setTempUnit] = useState('Fahrenheit');
  const [speedUnit, setSpeedUnit] = useState('Numbers');

  useEffect(() => {
    getUnit(userType, setTempUnit, setSpeedUnit);
  }, []);
  
  const handleCancel = (e) => {
    navigate('/dashboard')
  };
  
  const handleSave = async () => {
    if (userType === 'A') {
      await AsyncStorage.setItem('tempUnit', tempUnit);
      // let item = await AsyncStorage.getItem('tempUnit');
      // console.log(item);
      // document.cookie = `tempUnit=${tempUnit}; path=/; max-age=31536000; SameSite=Lax; Secure;`
    } else {
      AsyncStorage.setItem('speedUnit', speedUnit);
      // document.cookie = `speedUnit=${speedUnit}; path=/; max-age=31536000; SameSite=Lax; Secure;`
    }
    navigate('/dashboard')
  };

  return (
    <View className='flex flex-col justify-start items-center w-full'>
      <Text>{tempUnit}</Text>
      <Text className='text-xl mb-10'>{userType === 'A' ? 'Select Temperature Units' : 'Select Intensity Display Mode'}</Text>
      <View className="flex flex-row m-4">
      <Pressable className={` ${tempUnit === 'Fahrenheit' ? "flex flex-row justify-center items-center min-w-[110px] bg-blue-500 h-12" : "flex flex-row justify-center items-center min-w-[110px] bg-gray-200 h-12"}`} onPress={e => setTempUnit('Fahrenheit')}>
        <Text className="text-white text-lg">{tempUnit === 'Fahrenheit' ? 'Fahrenheit X' : 'Fahrenheit' }</Text>
      </Pressable>
      <Pressable className={` ${tempUnit === 'Celcius' ? "flex flex-row justify-center items-center min-w-[110px] bg-blue-500 h-12" : "flex flex-row justify-center items-center min-w-[110px] bg-gray-200 h-12"}`} onPress={e => setTempUnit('Celcius')}>
        <Text className="text-white text-lg">{tempUnit === 'Celcius' ? 'Celcius X' : 'Celcius' }</Text>
      </Pressable>
      </View>
      <View className="h-3/4 flex flex-col items-center justify-between">

        <View className=" w-1/2 flex flex-row justify-evenly items-center m-4">
          <Button title="Cancel" onPress={handleCancel} className="m-3 bg-slate-200 text-black  min-w-[100px] h-12" />
          <Button title="Save" onPress={handleSave} className="m-3  min-w-[100px] h-12"/>
        </View>
      </View>
    </View>
  )
  
}

export default Settings;


// {userType === 'A' &&
// <View className="mb-10">
// <Button id="farhenheit-button" className='bg-slate-200 text-black min-w-[150px] h-12' onClick={handleSelect}>Fahrenheit </Button>
// <Button id="celcius-button"className='bg-slate-200 text-black min-w-[150px] h-12' onClick={handleSelect}>Celcius</Button>
// </View>
// }

// {userType === 'B' &&
// <View className="mb-10">
// <Button id="numbers-button" className='bg-slate-200 text-black min-w-[150px] h-12' onClick={handleSelect}>Numbers</Button>
// <Button id="labels-button"className='bg-slate-200 text-black min-w-[150px] h-12' onClick={handleSelect}>Labels</Button>
// </View>
// }