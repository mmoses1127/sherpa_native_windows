import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Routes, Route, Redirect} from 'react-router-native';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import AddSetting from './screens/AddSetting';
import Settings from './screens/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import * as SQLite from 'expo-sqlite';
import { getCurrentUser } from './store/session';



const App = () => {

  const db = SQLite.openDatabase('example.db');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    async () => {

      console.log('loading db', db)
      await db.transaction(tx => {
        console.log('creating table')
        tx.executeSql('CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, user_type TEXT, password TEXT, UNIQUE(email);');
      });
  
      await db.transaction( tx => {
        tx.executeSql('INSERT OR IGNORE INTO members (email, user_type, password) VALUES (?, ?, ?);', ['a@test.io', 'A', 'password'],
          (txObj, resultSet) => {
            console.log('inserted', resultSet)
            },
            (txObj, error) => console.log(error)
            );
      });
  
      await db.transaction( tx => {
        tx.executeSql('INSERT OR IGNORE INTO members (email, user_type, password) VALUES (?, ?, ?);', ['b@test.io', 'B', 'password'],
          (txObj, resultSet) => {
            console.log('inserted', resultSet)
            },
            (txObj, error) => console.log(error)
            );
      });

    }

    console.log('created table');
    setIsLoading(false);

  }, [db]);




  // const [userType, setUserType] = useState('A');
  const currentUser = useSelector(getCurrentUser);
  console.log(currentUser)

  const loggedIn = async () => {
    console.log('checking user')
    let token = await AsyncStorage.getItem('userType');
    console.log('token is', token)
    if (token.length) {
      return token;
    } else {
      return false;
    }
  }

  // useEffect(() => {
  //   async () => {
  //     console.log('usertype', userType)
  //     const type = await loggedIn();
  //     setUserType(type);
  //   }
  // }, []);

  if (isLoading) {
    return <Text>Loading...</Text>
  }


  return (
    <NativeRouter>
      <View style={styles.container}>
        <Routes>
          <Route exact path="/" element={currentUser ? <Dashboard db={db}/> : <Login db={db}/>} />
          <Route exact path="/dashboard" element={currentUser ? <Dashboard db={db}/> : <Login db={db}/>} />
          <Route exact path="/add-setting" element={currentUser ? <AddSetting db={db}/> : <Login />} />
          {/* <Route exact path="/temps/:tempItemId" element={0 ? <Login /> : <EditTemp />} /> */}
          {/* <Route exact path="/speeds/:speedItemId" element={0 ? <Login /> : <EditSpeed />} /> */}
          <Route exact path="/settings" element={currentUser ? <Settings /> : <Login />} />
        </Routes>
      </View>
    </NativeRouter>
  );
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