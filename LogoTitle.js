import React from 'react';
import { Text } from 'react-native';
import Colors from './Colors'
import Quicksand from './Quicksand'

class LogoTitle extends React.Component {
  render() {
    return (
      <Text style={[{ fontSize: 30, color: Colors.white }, Quicksand.bold]}>Digitails</Text>
    );
  }
}

export default LogoTitle;