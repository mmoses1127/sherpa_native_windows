import { useSelector } from "react-redux";
import { getUserType } from "../store/session";
import EditTemp from "./EditTemp";
import EditSpeed from "./EditSpeed";
import Settings from "./Settings";
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();



const EditSetting = ({route}) => {

  const userType = useSelector(getUserType);
  const id = route.params.itemId;
  



  return (
      <Tab.Navigator>
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