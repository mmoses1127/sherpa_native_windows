import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTemperatureSetting, addTemperatureSetting } from "../store/temperatureSettings";
import { convertFtoC, findUnitCookie } from "./Settings";
import { Button, TextInput, View, Text, Pressable } from 'react-native';
import { getUnit } from "./Settings";
import DateTimePicker from '@react-native-community/datetimepicker';
import formatTime from "./clock" ;
import * as SQLite from 'expo-sqlite';


const AddTemp = () => {

  // const db = SQLite.openDatabase('example.db');

  console.log('db in addtemp is', db)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(new Date('July 1, 1999, 12:00:00'));
  const [endTime, setEndTime] = useState(new Date('July 1, 1999, 12:00:00'));
  const [tempUnit, setTempUnit] = useState('');
  const [temperature, setTemperature] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('start');
  const userType = 'A';

  useEffect(() => {
    // setTempUnit(getUnit(userType)[0]);
    setTempUnit('F');
  }, []);

  useEffect(() => {
    if (tempUnit === 'F') {
      if (temperature > 212) setTemperature(212);
    } else {
      if (temperature < 0) setTemperature(0);
      if (temperature > 100) setTemperature(100);
    }
  }, [temperature, tempUnit]);


  const handleSave = (e) => {
    e.preventDefault();

    if (!startTime || !endTime || !temperature) {
      alert('Please fill out all fields')
      return;
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time')
      return;
    }

    if (tempUnit === 'F' && (temperature < 32 || temperature > 212)) {
      alert('Temperature must be between 32 and 212')
      return;
    }

    if (tempUnit === 'C' && (temperature < 0 || temperature > 100)) {
      alert('Temperature must be between 0 and 100')
      return;
    }

    const newTemperatureSetting = {
      start_time: startTime,
      end_time: endTime,
      temperature: tempUnit === 'F' ? convertFtoC(temperature) : temperature
    }

    dispatch(sqlCreateTemperatureSetting(newTemperatureSetting));
    navigate('/')

    // dispatch a transaction to insert to db

    // db.transaction(tx => { 
    //   tx.executeSql('INSERT INTO temperature_settings (start_time, end_time, temperature) values (?, ?, ?)', 
    //   [newTemperatureSetting.start_time, newTemperatureSetting.end_time, newTemperatureSetting.temperature],
    //   (txObj, resultSet) => {
    //     console.log('resultobject', {...newTemperatureSetting, id: resultSet.insertId});
    //     // dispatch(addTemperatureSetting({...newTemperatureSetting, id: resultSet.insertId}))
    //   },
    //   (txObj, error) => {
    //     console.log('Error', error);
    //   }
    //   );
    // });

    // db.transaction(tx => {
    //   console.log('selecting temp items...')
    //   tx.executeSql('SELECT * FROM temperature_settings', null,
    //     (txObj, resultSet) => {
    //       console.log('all temps', resultSet.rows._array)
    //     },
    //     (txObj, error) => console.log(error)
    //   );
    // });


    // dispatch action to add to state


    // const newItem = dispatch(createTemperatureSetting(newTemperatureSetting));
    // if (newItem) {
    //   navigate('/');
    // } else {
    //   alert('Item could not be created')
    // }
  }

  const showClock = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleClockChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setShow(Platform.OS === 'ios');
    mode === 'start' ? setStartTime(currentTime) : setEndTime(currentTime);
  };


  return (

    <View className="flex flex-col justify-center items-center">
      <View className="flex flex-col align-between justify-center w-full bg-cyan-200 min-h-[300px] p-8 mb-5">
        <View className="flex flex-row items-center justify-start w-full">
          <Text className="min-w-[120px]">Start</Text>
          <Pressable className="bg-blue-500 min-w-[80px] m-5 p-2 text-center h-10" onPress={() => showClock('start')} >
            <Text className="text-white">{formatTime(startTime)}</Text>
          </Pressable>
        </View>
        <View className="flex flex-row items-center text-white justify-start w-full">
          <Text className="min-w-[120px]">End</Text>
          <Pressable className="bg-blue-500 min-w-[80px] m-5 p-2 text-center h-10" onPress={() => showClock('end')} >
            <Text className="text-white">{formatTime(endTime)}</Text>
          </Pressable>
        </View>
        <View className="flex flex-row items-center justify-start w-full">
          <Text className="min-w-[120px]">Temperature ({tempUnit})</Text>
          <TextInput className="bg-blue-500 min-w-[80px] m-5 p-2 text-center text-white h-10" keyboardType='numeric' onChangeText={text => setTemperature(text)} value={temperature} />
        </View>
      </View>

      <Button  title="Save" onPress={handleSave} />
      {show && 
      <DateTimePicker testID="dateTimePicker" value={startTime} mode={'time'}
      is24Hour={false} display="default" onChange={handleClockChange} />
      }
    </View>
  );

}

export default AddTemp;