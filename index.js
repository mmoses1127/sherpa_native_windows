import { registerRootComponent } from 'expo';
import configureStore from './store';
import { Provider } from 'react-redux';
import App from './App';

const store = configureStore();


const RNRedux = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(RNRedux);



// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);



// import { AppRegistry } from 'react-native';
// import React from 'react';
// import App from './App';
// import { Provider } from 'react-redux';

// import configureStore from './store';

// const store = configureStore()

// const RNRedux = () => (
//   <Provider store = { store }>
//     <App />
//   </Provider>
// )

// AppRegistry.registerComponent('frontend', () => RNRedux);