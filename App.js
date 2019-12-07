import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen'
import AddQRBlockScreen from './AddQRBlockScreen'

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    AddQRBlock: {
      screen: AddQRBlockScreen,
    }
  },
  {
    initialRouteName: "Home"
  }
);

const App = createAppContainer(MainNavigator);

export default App;