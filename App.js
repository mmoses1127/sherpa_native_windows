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
import * as sql from './sqlite';



const App = () => {

  const [db, setDb] = useState(sql.SQLite.openDatabase('sherpa.db'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    sql.createTable(db);
    setIsLoading(false);

  }, [db]);




  // const [userType, setUserType] = useState('A');
  const userType = useSelector(state => state.session);
  console.log(userType)

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


  return (
    <NativeRouter>
      <View style={styles.container}>
        <Routes>
          <Route exact path="/" element={userType ? <Dashboard/> : <Login />} />
          <Route exact path="/dashboard" element={userType ? <Dashboard/> : <Login />} />
          <Route exact path="/add-setting" element={userType ? <AddSetting /> : <Login />} />
          {/* <Route exact path="/temps/:tempItemId" element={0 ? <Login /> : <EditTemp />} /> */}
          {/* <Route exact path="/speeds/:speedItemId" element={0 ? <Login /> : <EditSpeed />} /> */}
          <Route exact path="/settings" element={userType ? <Settings /> : <Login />} />
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