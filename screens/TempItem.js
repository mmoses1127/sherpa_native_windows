import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTemperatureSetting, sqlDeleteTemperatureSetting } from "../store/temperatureSettings";
import { findUnitCookie, convertCtoF } from "./Settings";
import { Button, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';


const TempItem = ({temperatureSetting}) => {
  
  const db = SQLite.openDatabase('example.db');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unit = 'F';
  const temp = unit === 'F' ? convertCtoF(temperatureSetting.temperature) : temperatureSetting.temperature;

  const sqlDeleteTemperatureSetting = (db, temperatureSettingId) => {
    db.transaction(tx => {
      tx.executeSql(
        `delete from temperature_settings where id = ?`,
        [temperatureSettingId],
        (txtObj, resultSet) => {
          if (resultSet.rows._array.length) {
            // dispatch(removeTemperatureSetting(temperatureSettingId))
            console.log('deleted temperature setting number ', temperatureSettingId)
          } else {
            console.log('no temperature setting found')
          }
        },
        (txtObj, error) => console.log('error', error)
      );
    }
    );
  }

  const handleDelete = (e) => {
    e.preventDefault();
    sqlDeleteTemperatureSetting(db, temperatureSetting.id);
    // dispatch(deleteTemperatureSetting(temperatureSetting.id))
    alert('Deleted')
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // navigate(`/temps/${temperatureSetting.id}`)
  };

  return (
    <View className="flex flex-row justify-between items-center bg-lightBlue m-3 h-12 p-3 min-w-[600px]" key={temperatureSetting.id}>
      <Text>Start: {String(temperatureSetting.start_time).slice(11,16)}  End: {String(temperatureSetting.end_time).slice(11,16)}  Temperature: {temp[temp.length - 1] === '0' ? temp.slice(0,-2) : temp}°{unit}</Text>
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