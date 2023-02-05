import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSpeedSetting } from "../store/speedSettings";
import { findSpeedLabel, findUnitCookie, fetchUnit } from "./Settings";
import { Button, TextInput, View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Slider } from '@miblanchard/react-native-slider';
import formatTime from "./clock";


const AddSpeed = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(new Date('July 1, 1999, 12:00:00'));
  const [endTime, setEndTime] = useState(new Date('July 1, 1999, 12:00:00'));
  const [speed, setSpeed] = useState(1);
  const [speedUnit, setSpeedUnit] = useState('Labels');
  // const unit = findUnitCookie('speed');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('start');

  useEffect(() => {

    const setUnit = async () => {
      let unit = await fetchUnit('B');
      setSpeedUnit(unit);
    }

    setUnit();

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
      speed
    }
    
    dispatch(createSpeedSetting(newSpeedSetting));
    navigate('/');

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

    <Button  title="Save" onPress={handleSave} />
    {show && 
    <DateTimePicker testID="dateTimePicker" value={startTime} mode={'time'}
    is24Hour={false} display="default" onChange={handleClockChange} />
    }
  </View>
  );
  
}

export default AddSpeed;