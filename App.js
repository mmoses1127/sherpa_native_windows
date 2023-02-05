import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NativeRouter, Routes, Route, Redirect } from 'react-router-native';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import AddSetting from './screens/AddSetting';
import Settings from './screens/Settings';
import EditTemp from './screens/EditTemp';
import EditSpeed from './screens/EditSpeed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import * as SQLite from 'expo-sqlite';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { getCurrentUser } from './store/session';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const App = () => {

  const db = SQLite.openDatabase('example.db');
  const [isLoading, setIsLoading] = useState(true);
  // const [users, setUsers] = useState([]);
  const user = useSelector(getCurrentUser);
  const Tab = createBottomTabNavigator();


  useEffect(() => {
    console.log('loading db', db)
    db.transaction(tx => {
      console.log('creating tables...')
      // tx.executeSql('DROP TABLE IF EXISTS users');
      // tx.executeSql('DROP TABLE IF EXISTS temperature_settings');
      // tx.executeSql('DROP TABLE IF EXISTS speed_settings');
      tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, user_type TEXT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS temperature_settings (id INTEGER PRIMARY KEY AUTOINCREMENT, start_time TIME, end_time TIME, temperature INTEGER)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS speed_settings (id INTEGER PRIMARY KEY AUTOINCREMENT, start_time TIME, end_time TIME, speed INTEGER)');
    });

    // db.transaction(tx => {
    //   console.log('adding user a...')
    //   tx.executeSql('INSERT INTO users (email, password, user_type) values (?, ?, ?)', ['a@test.io', 'password', 'A'],
    //     (txObj, resultSet) => {
    //       console.log(resultSet.rows._array)
    //     },
    //     (txObj, error) => console.log(error)
    //   );
    // });

    // db.transaction(tx => {
    //   console.log('adding user b...')
    //   tx.executeSql('INSERT INTO users (email, password, user_type) values (?, ?, ?)', ['b@test.io', 'password', 'B'],
    //     (txObj, resultSet) => {
    //       console.log(resultSet.rows._array)
    //     },
    //     (txObj, error) => console.log(error)
    //   );
    // });

    // db.transaction(tx => {
    //   console.log('selecting users...')
    //   tx.executeSql('SELECT * FROM users', null,
    //     (txObj, resultSet) => {
    //       console.log(resultSet.rows._array)
    //       // setUsers(resultSet.rows._array)
    //     },
    //     (txObj, error) => console.log(error)
    //   );
    // });

    setIsLoading(false);

  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddSetting" component={AddSetting} options={{ headerShown: false }}/>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="EditTemp" component={EditTemp} />
        <Stack.Screen name="EditSpeed" component={EditSpeed} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;