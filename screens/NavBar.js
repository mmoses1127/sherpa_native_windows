import { logout } from '../store/session';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const NavBar = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const handleLogout = async () => {
    await dispatch(logout());
    navigation.navigate('Login'); 
  };

  return (
    <View className='flex flex-row justify-end items-end w-full p-5'>
      <Text className="text-blue-500 m-4" onPress={handleLogout}>Log Out</Text>
      <Text className="text-blue-500 m-4" onPress={() => navigation.navigate('Settings')}>Settings</Text>
    </View>
  )
}

export default NavBar;