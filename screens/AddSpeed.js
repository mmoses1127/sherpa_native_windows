import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpeedSetting } from "../store/speedSettings";
import { findSpeedLabel, findUnitCookie, fetchUnit } from "./Settings";
import { Button, View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Slider } from '@miblanchard/react-native-slider';
import formatTime from "./clock";
import { getSpeedUnit, fetchUnits } from "../store/units";


const AddSpeed = ({ navigation }) => {

  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [speed, setSpeed] = useState(1);
  const speedUnit = useSelector(getSpeedUnit);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('start');

  useEffect(() => {
    dispatch(fetchUnits())
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    if (!startTime || !endTime || !speed) {
      alert('Please fill out all fields')
      return;
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time')
      return;
    }

    const newSpeedSetting = {
      
      start_time: startTime,
      end_time: endTime,
      speed: parseInt(speed)
    }
    
    dispatch(createSpeedSetting(newSpeedSetting));
    navigation.navigate('Dashboard');

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

  const loadClockTime = (mode) => {
    if (mode === 'start')  {
      return startTime ? startTime : new Date();
    } else {
      return endTime ? endTime : new Date();
    }
  };

  return (

    <View className="w-full h-full flex flex-col justify-center items-center">
      <View className="flex flex-col justify-center items-center">
        <View className="flex flex-col align-between justify-center w-full bg-cyan-200 min-h-[300px] p-8 mb-5">
          <View className="flex flex-row items-center justify-start w-full">
            <Text className="min-w-[120px]">Start</Text>
            <Pressable className="flex flex-row items-center justify-center bg-blue-500 min-w-[80px] m-5 p-2 text-center h-10" onPress={() => showClock('start')} >
              <Text className="text-white">{startTime === '' ? startTime : formatTime(startTime)}</Text>
            </Pressable>
          </View>
          <View className="flex flex-row items-center text-white justify-start w-full">
            <Text className="min-w-[120px]">End</Text>
            <Pressable className="flex flex-row items-center justify-center bg-blue-500 min-w-[80px] m-5 p-2 text-center h-10" onPress={() => showClock('end')} >
              <Text className="text-white">{endTime === '' ? endTime : formatTime(endTime)}</Text>
            </Pressable>
          </View>
          <View className="flex flex-row items-center justify-start w-full">
          <Text className="min-w-[120px]">Speed: {speedUnit === 'Labels' ? findSpeedLabel(parseInt(speed)) : speed}</Text>
          <Slider
          containerStyle={{width: 150, height: 40}}
            minimumValue={1}
            maximumValue={3}
            step={1}
            value={speed}
            onValueChange={value => setSpeed(String(value))}
          />
        </View>
      </View>
    </View>

    <Button  title="Save" onPress={handleSave} />
    {show && 
    <DateTimePicker testID="dateTimePicker" value={loadClockTime(mode)} mode={'time'}
    is24Hour={false} display="default" onChange={handleClockChange} />
    }
  </View>
  );
  
}

export default AddSpeed;