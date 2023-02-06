import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTemperatureSettings, getTemperatureSettings } from "../store/temperatureSettings";
import { fetchSpeedSettings, getSpeedSettings } from "../store/speedSettings";
import TempItem from "./TempItem";
import SpeedItem from "./SpeedItem";
import { Button, ScrollView } from 'react-native';
import NavBar from "./NavBar";
import { View } from 'react-native';
import { getUserType } from "../store/session";
import { fetchUnits, getTempUnit, getSpeedUnit } from "../store/units";


const Dashboard = ( { navigation } ) => {

  const dispatch = useDispatch();
  const speedSettings = useSelector(getSpeedSettings);
  const userType = useSelector(getUserType);
  const tempUnit = useSelector(getTempUnit);
  const speedUnit = useSelector(getSpeedUnit);
  const temperatureSettings = useSelector(getTemperatureSettings);

  useEffect(() => {
    dispatch(fetchUnits())
  }, [userType, dispatch]);

  useEffect(() => {
    
  if (userType === 'A') {
    dispatch(fetchTemperatureSettings());
  } else {
    dispatch(fetchSpeedSettings());
  }

  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    navigation.navigate('Add Setting');
  };

  return (
    <View className="w-full min-h-full flex flex-col justify-center items-center">
      <View className="flex flex-col justify-center items-center">
        <NavBar />
        <ScrollView className="flex flex-col h-3/4 portrait: w-1/2 landscape: w-1/2">
          {userType === 'A' && temperatureSettings.map(temperatureSetting => <TempItem temperatureSetting={temperatureSetting} tempUnit={tempUnit} key={temperatureSetting.id} />
          )}
          
          {userType === 'B' && speedSettings.map(speedSetting => <SpeedItem speedSetting={speedSetting} speedUnit={speedUnit} key={speedSetting.id} />
          )}
        <View className="w-full flex flex-row justify-center items-center">
          <Button className="bg-blue m-2 w-1/4 min-w-[75px]" title="Add" onPress={handleAdd} />
        </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Dashboard;
