import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

const Login = ({db}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('1');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const sqlLogin = async (e) => {
    e.preventDefault();
    db.transaction(tx => {
      console.log('selecting names')
      tx.executeSql('SELECT * FROM users WHERE email = ? AND password = ?;', [email, password],
        (txObj, resultSet) => {
          console.log('result set', resultSet.rows._array)
          if (resultSet.rows._array.length) {
            completeLogin(email, password);
          } else {
            setErrors(['Incorrect email or password'])
            sessionActions.storeCurrentUser(null);
            dispatch(sessionActions.sqlLogout(dispatch));
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const completeLogin = async (email, password) => {
    // await AsyncStorage.setItem('userType', email[0].toUpperCase());
    // let token = await AsyncStorage.getItem('userType');
    // console.log('login token is', token)
    dispatch(sessionActions.addCurrentUser({id: 'notSet', email, password, userType: 'notSet'}));
    navigate('/dashboard');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await AsyncStorage.setItem('userType', email[0].toUpperCase());
    let token = await AsyncStorage.getItem('userType');
    console.log('login token is', token)
    // await dispatch(sessionActions.login({email, password}))
    // .catch(async (res) => {
    //   let data;
    //   try {
    //     // .clone() essentially allows you to read the response body twice
    //     data = await res.clone().json();
    //   } catch {
    //     data = await res.text(); // Will hit this case if the server is down
    //   }
    //   if (data?.errors) setErrors(data.errors);
    //   else if (data) setErrors([data]);
    //   else setErrors([res.statusText]);
    // });
    // navigate('/dashboard');
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
        <Button className="bg-blue m-2 w-1/4 min-w-[75px]" title="Login" onPress={sqlLogin} />
      </View>
    </View>
  )

}

export default Login;