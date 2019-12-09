import React from 'react';
import { Text } from 'react-native';
import Colors from './Colors'
import Quicksand from './Quicksand'

const LogoTitle = ({ title }) => {
  return (
    <Text style={[{ fontSize: 30, color: Colors.white }, Quicksand.bold]}>{title}</Text>
  );
}

export default LogoTitle;