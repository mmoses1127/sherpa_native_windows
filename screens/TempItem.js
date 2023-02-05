import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTemperatureSetting, sqlDeleteTemperatureSetting } from "../store/temperatureSettings";
import { findUnitCookie, convertCtoF } from "./Settings";
import { Button, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';


const TempItem = ({temperatureSetting}) => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unit = 'F';
  const temp = unit === 'F' ? convertCtoF(temperatureSetting.temperature) : temperatureSetting.temperature;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTemperatureSetting(temperatureSetting.id));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    navigate(`/temps/${temperatureSetting.id}`)
  };

  return (
    <View className="flex flex-row justify-between items-center bg-cyan-300 m-3 h-12 p-3 w-[90%] min-w-[300px]" key={temperatureSetting.id}>
      <Text>Start: {String(temperatureSetting.start_time).slice(11,16)}  End: {String(temperatureSetting.end_time).slice(11,16)}  Temperature: {temp[temp.length - 1] === '0' ? temp.slice(0,-2) : temp}°{unit}</Text>
      <View className="flex flex-row items-center ml-2 w-[80px] h-10">
        {/* <button onClick={handleDelete} className="bg-red m-3">Delete</button>
        <button onClick={handleUpdate} className="m-3 bg-blue">Edit</button> */}
        <Button color='red' title="Delete" onPress={handleDelete} />
        <Button title="Edit" onPress={handleUpdate} />
      </View>
    </View>
  )

}

export default TempItem;