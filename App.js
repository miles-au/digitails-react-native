import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen'
import AddQRBlockScreen from './AddQRBlockScreen'
import ShuffleListScreen from './ShuffleListScreen'

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    AddQRBlock: {
      screen: AddQRBlockScreen,
    },
    ShuffleList: {
      screen: ShuffleListScreen,
    },
  },
  {
    initialRouteName: "Home",
    headerLayoutPreset: 'center',
  }
);

const App = createAppContainer(MainNavigator);

export default App;