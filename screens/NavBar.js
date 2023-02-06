import { logout } from '../store/session';
import { useDispatch } from 'react-redux';
import { View, Text } from 'react-native';


const NavBar = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View className='flex flex-row justify-end items-end w-full p-5'>
      <Text className="text-blue-500 m-4" onPress={handleLogout}>Log Out</Text>
    </View>
  )
}

export default NavBar;