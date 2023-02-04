import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

const Login = () => {

  const db = SQLite.openDatabase('example.db');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleLogin = () => {
    dispatch(sessionActions.sqlLogin({email, password}));
  }

  return (
    <View className="w-1/2 min-w-[300px] flex flex-col justify-center items-center">
      <Button title="go to dashboard" onPress={() => navigate('/dashboard')} />
      <Text className="text-lg">Welcome to App</Text>
      <View className="w-3/4 flex flex-col justify-center items-center">
        {errors.length > 0 && (
          <View className="w-4/4 text-red m-2">
            {errors.map((error, idx) => <Text key={idx}>{error}</Text>)}
          </View>
        )}
        <Text className="text-md text-left w-full">Email</Text>
        <TextInput onChangeText={text => setEmail(text)} className="w-full h-10 m-2 bg-cyan-200 autofill:bg-cyan-200" />
        <Text className="text-md text-left w-full">Password</Text>
        <TextInput onChangeText={text => setPassword(text)} className="w-full h-10 m-2 bg-cyan-200 autofill:bg-cyan-200" />
        <Button className="bg-blue m-2 w-1/4 min-w-[75px]" title="Login" onPress={handleLogin} />
      </View>
    </View>
  )

}

export default Login;