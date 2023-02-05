import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigate } from 'react-router-dom';
import * as SQLite from 'expo-sqlite';

const Login = ( {navigation} ) => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleLogin = (email, password) => {
    dispatch(sessionActions.sqlLogin({email, password}));
    navigation.navigate('Dashboard');
  }

  return (
    <View className="w-full h-full flex flex-col justify-center items-center">
      <View className="w-1/2 min-w-[300px] flex flex-col justify-center items-center">
        <View className="flex flex-row">
          <Button title="User A Login" onPress={() => handleLogin('a@test.io', 'password')} />
          <Button title="User B Login" onPress={() => handleLogin('b@test.io', 'password')} />
        </View>
        <Text className="text-lg">Welcome to App</Text>
        <View className="w-3/4 flex flex-col justify-center items-center">
          {errors.length > 0 && (
            <View className="w-4/4 text-red m-2">
              {errors.map((error, idx) => <Text key={idx}>{error}</Text>)}
            </View>
          )}
          <Text className="text-md text-left w-full">Email</Text>
          <TextInput onChangeText={text => setEmail(text)} autoCapitalize={'none'} className="w-full h-10 m-2 bg-cyan-200 autofill:bg-cyan-200" />
          <Text className="text-md text-left w-full">Password</Text>
          <TextInput onChangeText={text => setPassword(text)} autoCapitalize={'none'} secureTextEntry={true} className="w-full h-10 m-2 bg-cyan-200 autofill:bg-cyan-200" />
          <Button className="bg-blue m-2 w-1/4 min-w-[75px]" title="Login" onPress={() => handleLogin(email, password)} />
        </View>
      </View>
    </View>
  )

}

export default Login;