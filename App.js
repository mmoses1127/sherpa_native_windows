import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Routes, Route, Redirect} from 'react-router-native';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import AddSetting from './screens/AddSetting';
import Settings from './screens/Settings';

const loggedIn = async () => {
  let token = await AsyncStorage.getItem('userType');
  console.log('token is', token)
  if (token.length) {
    return token;
  } else {
    return false;
  }
}


export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        {!loggedIn ? 
        <Routes>
          <Route exact path="/" element={<Dashboard/>} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/add-setting" element={<AddSetting />} />
          {/* <Route exact path="/temps/:tempItemId" element={0 ? <Login /> : <EditTemp />} /> */}
          {/* <Route exact path="/speeds/:speedItemId" element={0 ? <Login /> : <EditSpeed />} /> */}
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
          :  
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        }
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
