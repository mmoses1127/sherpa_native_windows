import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-native';
import { Button } from 'react-native';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigation = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userType');
    let notoken = await AsyncStorage.getItem('token');
    console.log('logging out', notoken)
    // .catch(err => console.log(err));
    // await dispatch(sessionActions.logout());
    await dispatch(sessionActions.sqlLogout());
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

{/* <a className='text-blue m-5' onPress={handleLogout} href="/#">Log Out</a>
<a className='text-blue m-5' onPress={() => navigate('/settings')} href="#">Settings</a> */}

{/* <Button className="text-blue-500 p-10 bg-red-300" title="Log Out" onPress={handleLogout} />
<Button title="Settings" onPress={() => navigate('/settings')} /> */}