import { useDispatch, useSelector } from "react-redux";
import { deleteSpeedSetting } from "../store/speedSettings";
import { findSpeedLabel, fetchUnit } from "./Settings";
import { useEffect, useState } from "react";
import { Button, Text, View } from 'react-native';
import { getUserType } from "../store/session";
import { useNavigation } from '@react-navigation/native';
import { convertToLocalTime } from "./clock";


const SpeedItem = ({ speedSetting }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userType = useSelector(getUserType);
  const [speedUnit, setSpeedUnit] = useState('Labels');
  const speed = speedUnit === 'Labels' ? findSpeedLabel(speedSetting.speed) : speedSetting.speed;

  useEffect(() => {

    const setUnit = async () => {
      let unit = await fetchUnit(userType);
      setSpeedUnit(unit);
    }

    setUnit();

  }, [userType]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpeedSetting(speedSetting.id))
    alert('Deleted')
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    navigation.navigate('EditSetting', {itemId: speedSetting.id});
  };


  return (
    <View className="flex flex-row justify-center items-center bg-cyan-300 m-3 h-12 p-3 w-full min-w-[300px]" key={speedSetting.id}>
      <Text>
        Start: {convertToLocalTime(speedSetting.start_time).slice(11,16)}  End: {convertToLocalTime(speedSetting.end_time).slice(11,16)}  Speed: {speed}
      </Text>
      <View className="flex flex-row items-center jusitfy-end ml-2 w-[80px] h-10">
        <Button color='red' title="Delete" onPress={handleDelete} />
        <Button title="Edit" onPress={handleUpdate} />
      </View>
    </View>
  )

}

export default SpeedItem;