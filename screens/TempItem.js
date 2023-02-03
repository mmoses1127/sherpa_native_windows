import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTemperatureSetting } from "../store/temperatureSettings";
import { findUnitCookie, convertCtoF } from "./Settings";
import { Button, Text, View } from 'react-native';


const TempItem = ({temperatureSetting}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unit = findUnitCookie('temp').slice(0,1);
  const temp = unit === 'F' ? convertCtoF(temperatureSetting.temperature) : temperatureSetting.temperature;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTemperatureSetting(temperatureSetting.id))
    alert('Deleted')
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    navigate(`/temps/${temperatureSetting.id}`)
  };

  return (
    <View className="flex flex-row justify-between items-center bg-lightBlue m-3 h-12 p-3 min-w-[600px]" key={temperatureSetting.id}>
      <Text>Start: {temperatureSetting.startTime.slice(11,16)}  End: {temperatureSetting.endTime.slice(11,16)}  Temperature: {temp[temp.length - 1] === '0' ? temp.slice(0,-2) : temp}°{unit}</Text>
      <View className="ml-12">
        {/* <button onClick={handleDelete} className="bg-red m-3">Delete</button>
        <button onClick={handleUpdate} className="m-3 bg-blue">Edit</button> */}
        <Button color='red' title="Delete" onPress={handleDelete} />
        <Button title="Edit" onPress={handleUpdate} />
      </View>
    </View>
  )

}

export default TempItem;