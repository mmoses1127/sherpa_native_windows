import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-native';
import { Button } from 'react-native';

const Navigation = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(sessionActions.logout());
    navigate('/login');
  };


  return (
    <div className='flex flex-row justify-end items-end w-full'>
      <Button title="Log Out" onPress={handleLogout} />
      <Button title="Settings" onPress={() => navigate('/settings')} />

    </div>
  )
}

export default Navigation;

{/* <a className='text-blue m-5' onPress={handleLogout} href="/#">Log Out</a>
<a className='text-blue m-5' onPress={() => navigate('/settings')} href="#">Settings</a> */}