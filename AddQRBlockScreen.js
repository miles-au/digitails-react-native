import React from 'react';
import { Text } from 'react-native';
import Colors from './Colors'
import Quicksand from './Quicksand'

class AddQRBlockScreen extends React.Component {
  static navigationOptions = {
    title: 'Add QR Code',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Text>Hello</Text>
    );
  }
}

export default AddQRBlockScreen
