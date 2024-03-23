import {StatusBar, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
// import {lightTheme} from './src/theme/Theme';
import {Provider} from 'react-redux';
// import store from './src/redux/store/Store';

const App = () => {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={'light-content'}
      />
      <RootNavigator />
    </NavigationContainer>
    // </Provider>
  );
};

export default App;
