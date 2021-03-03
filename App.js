/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {AppNavigator} from './app/navigation.component';
import configureStore from './app/store';

const store = configureStore();

const App: () => React$Node = () => {
  return (
    // <Provider store={store}>
    <AppNavigator />
    // </Provider>
  );
};
// <Provider store={store}>
//       <AppNavigator />
//     </Provider>
export default App;
