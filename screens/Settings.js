import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/session";
import { View, Button, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserType } from "../store/session";



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

const Settings = ({ navigation }) => {

  const userType = useSelector(getUserType)

  const [tempUnit, setTempUnit] = useState('Fahrenheit');
  const [speedUnit, setSpeedUnit] = useState('Numbers');


  useEffect(() => {

    const setUnit = async () => {
      let unit = await fetchUnit(userType);
      userType === 'A' ? setTempUnit(unit) : setSpeedUnit(unit);
    }

    setUnit();

  }, [userType]);
  
  const handleCancel = (e) => {
    navigation.navigate('/dashboard')
  };
  
  const handleSave = async () => {
    if (userType === 'A') {
      await AsyncStorage.setItem('tempUnit', tempUnit);
    } else {
      await AsyncStorage.setItem('speedUnit', speedUnit);
    }
    navigation.navigate('/dashboard')
  };

  return (
    <View className='flex flex-col justify-center items-center w-full'>
      <Text className='text-xl mb-10'>{userType === 'A' ? 'Select Temperature Units' : 'Select Intensity Display Mode'}</Text>
      <View className="flex flex-row m-4">
      {userType === 'A' &&
        <View className="flex flex-row items-center justify-center">
          <Pressable className={` ${tempUnit === 'Fahrenheit' ? "flex flex-row justify-center items-center min-w-[110px] bg-blue-500 h-12" : "flex flex-row justify-center items-center min-w-[110px] bg-gray-200 h-12"}`} onPress={e => setTempUnit('Fahrenheit')}>
            <Text className="text-white text-lg">{tempUnit === 'Fahrenheit' ? 'Fahrenheit \u2713' : 'Fahrenheit' }</Text>
          </Pressable>
          <Pressable className={` ${tempUnit === 'Celcius' ? "flex flex-row justify-center items-center min-w-[110px] bg-blue-500 h-12" : "flex flex-row justify-center items-center min-w-[110px] bg-gray-200 h-12"}`} onPress={e => setTempUnit('Celcius')}>
            <Text className="text-white text-lg">{tempUnit === 'Celcius' ? 'Celcius \u2713' : 'Celcius' }</Text>
          </Pressable>
        </View>
      }

      {userType === 'B' &&
        <View className="flex flex-row items-center justify-center">
          <Pressable className={` ${speedUnit === 'Labels' ? "flex flex-row justify-center items-center min-w-[110px] bg-blue-500 h-12" : "flex flex-row justify-center items-center min-w-[110px] bg-gray-200 h-12"}`} onPress={e => setSpeedUnit('Labels')}>
            <Text className="text-white text-lg">{speedUnit === 'Labels' ? 'Labels \u2713' : 'Labels' }</Text>
          </Pressable>
          <Pressable className={` ${speedUnit === 'Numbers' ? "flex flex-row justify-center items-center min-w-[110px] bg-blue-500 h-12" : "flex flex-row justify-center items-center min-w-[110px] bg-gray-200 h-12"}`} onPress={e => setSpeedUnit('Numbers')}>
            <Text className="text-white text-lg">{speedUnit === 'Numbers' ? 'Numbers \u2713' : 'Numbers' }</Text>
          </Pressable>
        </View>
      }

      </View>
      <View className="flex flex-col items-center justify-between">

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