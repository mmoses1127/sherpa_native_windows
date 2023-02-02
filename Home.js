import React from "react";
import {View, Text, Button, StyleSheet} from 'react-native';


const Home = ({ navigation }) => {
  console.log(navigation)
  return (
    <View style={styles.container}>
      <Text>This is the home page</Text>
      <Button title="go to login" onPress={() => 5} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;