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