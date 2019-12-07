import React from 'react';
import { View, Button, Text, Image, Dimensions } from 'react-native';
import platform_icons from './platform_icons';
import Colors from './Colors';

const Platform_Icon = ({ selectedPlatform, platform }) => {
  var { height, width } = Dimensions.get('window');
  var border = 0
  if (selectedPlatform == platform) {
    border = 3
  }
  return (
    <View style={{ padding: 5 }}>
      <Image
        style={{ width: (width - 50) / 4, height: (width - 50) / 4, borderColor: Colors.white, borderWidth: border }}
        source={platform_icons[platform]}
      />
    </View>
  )
}

export default Platform_Icon;