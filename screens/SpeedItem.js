import { useDispatch, useSelector } from "react-redux";
import { deleteSpeedSetting } from "../store/speedSettings";
import { findSpeedLabel } from "./Settings";
import { useEffect } from "react";
import { Pressable, Text, View } from 'react-native';
import { getUserType } from "../store/session";
import { useNavigation } from '@react-navigation/native';
import { convertToLocalTime } from "./clock";
import { fetchUnits } from "../store/units";


const SpeedItem = ({ speedSetting, speedUnit }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userType = useSelector(getUserType);
  const speed = speedUnit === 'Labels' ? findSpeedLabel(speedSetting.speed) : speedSetting.speed;

  useEffect(() => {
    dispatch(fetchUnits());
  }, [userType]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpeedSetting(speedSetting.id))
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    navigation.navigate('Edit Setting', {itemId: speedSetting.id});
  };


  return (
    <View className="flex flex-row justify-between items-center bg-cyan-300 m-3 h-12 p-3 w-full min-w-[300px]" key={speedSetting.id}>
      <Text className="text-xs">
        Start: {convertToLocalTime(speedSetting.start_time).slice(11,16)}  End: {convertToLocalTime(speedSetting.end_time).slice(11,16)}  Sp: {speed}
      </Text>
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

export default SpeedItem;