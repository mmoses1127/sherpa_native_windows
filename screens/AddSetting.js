import { useSelector } from "react-redux";
import { getCurrentUser, getUserType } from "../store/session";
import AddTemp from "./AddTemp";
import AddSpeed from "./AddSpeed";
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from "./Settings";
import Icon from 'react-native-vector-icons/FontAwesome';



const AddSetting = () => {

  const userType = useSelector(getUserType);
  const Tab = createBottomTabNavigator();


  return (

      <Tab.Navigator>
        {userType === 'A' ? <Tab.Screen name="Add Temp" component={AddTemp} options={{
          tabBarLabel: 'Add Item',
          tabBarIcon: () => (
            <Icon name='plus' size={30} color='blue' />
          ),
        }}
        /> : 
        <Tab.Screen name="Add Speed" component={AddSpeed} options={{
          tabBarLabel: 'Add Item',
          tabBarIcon: () => (
            <Icon name='plus' size={30} color='blue' />
          ),
        }}
        />
        }

        
        <Tab.Screen name="Settings" component={Settings} options={{
          tabBarLabel: 'AddTemp',
          tabBarIcon: () => (
            <Icon name='gear' size={30} color='blue' />
          ),
        }}/>
      </Tab.Navigator>

  )
};

export default AddSetting;