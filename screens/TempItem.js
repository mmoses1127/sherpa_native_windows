import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTemperatureSetting, sqlDeleteTemperatureSetting } from "../store/temperatureSettings";
import { convertCtoF, fetchUnit } from "./Settings";
import { Button, Text, View } from 'react-native';
import { useEffect, useState } from "react";
import { getUserType } from "../store/session";



const TempItem = ({temperatureSetting}) => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userType = useSelector(getUserType);
  const [tempUnit, setTempUnit] = useState('F');
  const temp = tempUnit === 'F' ? convertCtoF(temperatureSetting.temperature) : temperatureSetting.temperature;

  useEffect(() => {

    const setUnit = async () => {
      let unit = await fetchUnit(userType);
      setTempUnit(unit[0]);
    }

    setUnit();

  }, [userType]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTemperatureSetting(temperatureSetting.id));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    navigate(`/temps/${temperatureSetting.id}`)
  };

  const date = new Date(String(temperatureSetting.start_time));
  const convertedDate = date.toString();
  console.log('date is', date)
  console.log('convertedDate is', convertedDate)

  return (
    <View className="flex flex-row justify-between items-center bg-cyan-300 m-3 h-12 p-3 w-[90%] min-w-[300px]" key={temperatureSetting.id}>
      <Text>Start: {String(temperatureSetting.start_time).slice(11,16)}  End: {String(temperatureSetting.end_time).slice(11,16)}  Temperature: {temp[temp.length - 1] === '0' ? temp.slice(0,-2) : temp}°{tempUnit}</Text>
      <View className="flex flex-row items-center ml-2 w-[80px] h-10">
        <Button color='red' title="Delete" onPress={handleDelete} />
        <Button title="Edit" onPress={handleUpdate} />
      </View>
    </View>
  )

}

export default TempItem;