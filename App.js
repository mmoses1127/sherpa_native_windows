import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Routes, Route} from 'react-router-native';
// import Login from '../app/screens/Login';
import Home from './Home';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import AddSetting from './screens/AddSetting';
import Settings from './screens/Settings';


export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Routes>
          <Route exact path="/" element={1 ? <Login /> : <Home />} />
          <Route exact path="/dashboard" element={1 ? <Dashboard /> : <Login />} />
          <Route exact path="/add-setting" element={0 ? <Login /> : <AddSetting />} />
          {/* <Route exact path="/temps/:tempItemId" element={0 ? <Login /> : <EditTemp />} /> */}
          {/* <Route exact path="/speeds/:speedItemId" element={0 ? <Login /> : <EditSpeed />} /> */}
          <Route exact path="/settings" element={0 ? <Login /> : <Settings />} />
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
