import { useSelector } from "react-redux";
import { getCurrentUser, getUserType } from "../store/session";
import EditTemp from "./EditTemp";
import EditSpeed from "./EditSpeed";
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from "./Settings";
import Icon from 'react-native-vector-icons/FontAwesome';



const EditSetting = ({route, navigation}) => {

  const userType = useSelector(getUserType);
  const Tab = createBottomTabNavigator();
  const id = route.params.itemId;


  return (

      <Tab.Navigator initialRouteName={userType === 'A' ? 'Edit Temp' : 'Edit Speed'}>
        {userType === 'A' ? <Tab.Screen name="Edit Temp" component={EditTemp} initialParams={{itemId: id}} options={{
          tabBarLabel: 'Edit Item',
          tabBarIcon: () => (
            <Icon name='plus' size={30} color='blue' />
          ),
        }}
        /> : <Tab.Screen name="Edit Speed" component={EditSpeed} initialParams={{itemId: id}} options={{
          tabBarLabel: 'Edit Item',
          tabBarIcon: () => (
            <Icon name='plus' size={30} color='blue' />
          ),
        }}
        />}
        <Tab.Screen name="Settings" component={Settings} options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <Icon name='gear' size={30} color='blue' />
          ),
        }}/>
      </Tab.Navigator>

  )
};

export default EditSetting;