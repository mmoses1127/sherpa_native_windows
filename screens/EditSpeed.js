import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findSpeedLabel, fetchUnit } from "./Settings";
import formatTime, { convertToLocalTime } from "./clock";
import { Button, Text, View, Pressable, TextInput } from "react-native";
import { getSpeedSetting, fetchSpeedSetting, updateSpeedSetting } from "../store/speedSettings";
import { Slider } from '@miblanchard/react-native-slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { getSpeedUnit, fetchUnits } from "../store/units";


const EditSpeed = ({route}) => {

  const speedItemId = route.params.itemId;
  const speedSetting = useSelector(getSpeedSetting(speedItemId));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('start');
  const speedUnit = useSelector(getSpeedUnit);
  const [speed, setSpeed] = useState('');

  useEffect(() => {
    dispatch(fetchUnits());
  }, []);

  useEffect(() => {
    dispatch(fetchSpeedSetting(speedItemId))
  }, [dispatch, speedItemId]);

  useEffect(() => {
    if (speedSetting) {
      setStartTime(new Date(speedSetting.start_time));
      setEndTime(new Date(speedSetting.end_time));
      setSpeed(speedSetting.speed);
    }
  }, [speedSetting]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!startTime || !endTime || !speed) {
      alert('Please fill out all fields')
      return;
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time')
      return;
    }

    const updatedSpeedSetting = {
      id: speedItemId,
      start_time: startTime,
      end_time: endTime,
      speed
    }

    dispatch(updateSpeedSetting(updatedSpeedSetting));
    
    navigation.navigate('Dashboard');

  };

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

    <View className="w-full h-full flex flex-col justify-center items-center">
      <View className="flex flex-col justify-center items-center">
        <View className="flex flex-col align-between justify-center w-full bg-cyan-200 min-h-[300px] p-8 mb-5">
          <View className="flex flex-row items-center justify-start w-full">
            <Text className="min-w-[120px]">Start</Text>
            <Pressable className="flex flex-row items-center justify-center bg-blue-500 min-w-[80px] m-5 p-2 text-center h-10" onPress={() => showClock('start')} >
              <Text className="text-white">{formatTime(startTime)}</Text>
            </Pressable>
          </View>
          <View className="flex flex-row items-center text-white justify-start w-full">
            <Text className="min-w-[120px]">End</Text>
            <Pressable className="flex flex-row items-center justify-center bg-blue-500 min-w-[80px] m-5 p-2 text-center h-10" onPress={() => showClock('end')} >
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

        <Button  title="Save" onPress={handleUpdate} />
        {show && 
        <DateTimePicker testID="dateTimePicker" value={mode === 'start' ? startTime : endTime} mode={'time'}
        is24Hour={false} display="default" onChange={handleClockChange} />
        }
      </View>
    </View>

  );

};


export default EditSpeed;