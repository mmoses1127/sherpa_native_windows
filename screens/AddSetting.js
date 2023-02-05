import { useSelector } from "react-redux";
import { getCurrentUser, getUserType } from "../store/session";
import AddTemp from "./AddTemp";
import AddSpeed from "./AddSpeed";
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from "./Settings";


const AddSetting = () => {

  const userType = useSelector(getUserType);
  const Tab = createBottomTabNavigator();


  return (

      <Tab.Navigator>
        {userType === 'A' ? <Tab.Screen name="AddTemp" component={AddTemp} /> : <Tab.Screen name="AddItem" component={AddTemp} />}
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>

  )
};

export default AddSetting;