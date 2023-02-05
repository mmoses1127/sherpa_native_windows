import { logout } from '../store/session';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-native';
import { Button } from 'react-native';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Navigation = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/'); 
  };

  return (
    <View className='flex flex-row justify-end items-end w-full p-5'>
      <Text className="text-blue-500 m-4" onPress={handleLogout}>Log Out</Text>
      <Text className="text-blue-500 m-4" onPress={() => navigate('/settings')}>Settings</Text>
    </View>
  )
}

export default Navigation;