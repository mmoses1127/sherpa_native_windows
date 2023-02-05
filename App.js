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

const App = () => {

  const db = SQLite.openDatabase('example.db');
  const [isLoading, setIsLoading] = useState(true);
  // const [users, setUsers] = useState([]);
  const user = useSelector(getCurrentUser);

  // const exportDB = async () => {
  //   await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/example.db');
  // };

  // const importDb = async () => {
  //   let result = await DocumentPicker.getDocumentAsync({
  //     copyTocacheDirectory: true
  //   });

  //   if (result.type === 'success') {
  //     setIsLoading(true);

  //     if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
  //       await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  //     }

  //     const base64 = await FileSystem.readAsStringAsync(
  //       result.uri, 
  //       { encoding: FileSystem.EncodingType.Base64 } 
  //     );

  //     await FileSystem.writeAsStringAsync(FileSystem.documentDirectory 
  //       + 'SQLite/example.db', 
  //       base64, 
  //       { encoding: FileSystem.EncodingType.Base64 
  //       }
  //     );

  //     await db.closeAsync();
  //     setDb(SQLite.openDatabase('example.db'));
  //   }
  // };

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


  // const showUsers = () => {
  //   return users.map((user, index) => {
  //     return (
  //       <Text key={index}>{user.email}</Text>
  //     )
  //   })
  // }

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
        <Stack.Screen name="AddSetting" component={AddSetting} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="EditTemp" component={EditTemp} />
        <Stack.Screen name="EditSpeed" component={EditSpeed} />
      </Stack.Navigator>
    </NavigationContainer>
  )

  // return (
  //   <NativeRouter>
  //     <View style={styles.container}>
  //       {/* <Button title="Export DB" onPress={exportDB} />
  //       <Button title="Import DB" onPress={importDb} /> */}
  //       <Routes>
  //         <Route exact path="/" element={user ? <Dashboard /> : <Login />} />
  //         <Route exact path="/dashboard" element={user ? <Dashboard /> : <Login />} />
  //         <Route exact path="/add-setting" element={user ? <AddSetting /> : <Login />} />
  //         <Route exact path="/temps/:tempItemId" element={user ? <EditTemp /> : <Login />} />
  //         <Route exact path="/speeds/:speedItemId" element={user ? <EditSpeed /> : <Login />} />
  //         <Route exact path="/settings" element={user ? <Settings /> : <Login />} />
  //       </Routes>
  //     </View>
  //   </NativeRouter>
  // );
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