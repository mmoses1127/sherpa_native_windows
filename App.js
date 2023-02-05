import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NativeRouter, Routes, Route, Redirect } from 'react-router-native';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import AddSetting from './screens/AddSetting';
import Settings from './screens/Settings';
import EditSetting from './screens/EditSetting';
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
  const user = useSelector(getCurrentUser);
  const Tab = createBottomTabNavigator();


  useEffect(() => {
    console.log('loading db', db)
    db.transaction(tx => {
      // console.log('dropping tables...')
      // tx.executeSql('DROP TABLE IF EXISTS users');
      // tx.executeSql('DROP TABLE IF EXISTS temperature_settings');
      // tx.executeSql('DROP TABLE IF EXISTS speed_settings');
      console.log('creating tables if not exist...')
      tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, user_type TEXT, session_token TEXT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS temperature_settings (id INTEGER PRIMARY KEY AUTOINCREMENT, start_time TIME, end_time TIME, temperature INTEGER)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS speed_settings (id INTEGER PRIMARY KEY AUTOINCREMENT, start_time TIME, end_time TIME, speed INTEGER)');
    });

    
    
    db.transaction(tx => {
      console.log('checking users...')
      tx.executeSql('SELECT * FROM users WHERE email = ? OR email = ?', ["a@test.io", "b@test.io"],
      (txObj, resultSet) => {
        if (resultSet.rows._array.length < 2) {
          console.log('populating users...');
          
          db.transaction(tx => {
            console.log('adding user A...')
            tx.executeSql('INSERT INTO users (email, password, user_type, session_token) values (?, ?, ?, ?)', ['a@test.io', 'password', 'A', null],
            (txObj, resultSet) => {
              console.log('added user B');
            },
            (txObj, error) => console.log(error)
            );
          });

          db.transaction(tx => {
              console.log('adding user B...')
              tx.executeSql('INSERT INTO users (email, password, user_type, session_token) values (?, ?, ?, ?)', ['b@test.io', 'password', 'B', null],
                (txObj, resultSet) => {
                    console.log('added user B');
                  },
                  (txObj, error) => console.log(error)
            );
          });
        }
      },
      (txObj, error) => console.log(error)
      );
    });

    console.log('DB loading complete!')
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
      <Stack.Navigator initialRouteName='Dashboard'>
        {user ? (
        <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="AddSetting" component={AddSetting}/>
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="EditSetting" component={EditSetting} />
          {/* <Stack.Screen name="EditTemp" component={EditTemp} />
          <Stack.Screen name="EditSpeed" component={EditSpeed} /> */}
        </>
        ) : (
        <Stack.Screen name="Login" component={Login} />
        )}
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