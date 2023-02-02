import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  // return (
  //   <View>
  //     <Text>Welcome to App</Text>
  //   </View>
  // )

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.login({email, password}))
    .catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
    navigate('/dashboard');
  }

  return (
    <View className="w-1/2 min-w-[300px] flex flex-col justify-center items-center">
      <Button title="go to dashboard" onPress={() => navigate('/dashboard')} />
      <Text className="text-lg">Welcome to App</Text>
      <View className="w-3/4 flex flex-col justify-center items-center">
        {errors.length > 0 && (
          <ul className="w-4/4 text-red m-2">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        )}
        <TextInput onChangeText={e => setEmail} className="text-black w-full h-10 m-2 bg-lightBlue autofill:bg-lightBlue" placeholder="Email" />
        <TextInput onChangeText={e => setPassword} className="text-black w-full h-10 m-2 bg-lightBlue" placeholder="Password" />
        {/* <label className="m-2 w-full" htmlFor="email">Email</label>
        <input onChange={e => setEmail(e.target.value)} className="text-black w-full h-10 m-2 bg-lightBlue autofill:bg-lightBlue" type="email" name="email" id="email" />
        <label className="m-2 w-full" htmlFor="password">Password</label>
        <input onChange={e => setPassword(e.target.value)} className="text-black w-full h-10 m-2 bg-lightBlue" type="password" name="password" id="password" /> */}
        {/* <button className="bg-blue m-2 w-1/4 min-w-[75px]" onClick={handleLogin}>Login</button> */}
        <Button className="bg-blue m-2 w-1/4 min-w-[75px]" title="Login" onPress={handleLogin} />
      </View>
    </View>
  )

}

export default Login;