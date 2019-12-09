import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Colors from '../Colors';
import Quicksand from '../Quicksand'
import platform_icons from '../platform_icons'

const QRBlockEdit = ({ id, platform, handle, qrSquareWidth }) => {
  var titleText = platform;

  return (
    <View style={{ flex: 1, flexDirection: 'row', padding: 10, marginTop: 5, alignItems: 'center', width: "100%" }}>
      <Image
        style={{ width: 50, height: 50, marginRight: 10 }}
        source={platform_icons[platform]}
      />
      <Text style={[{ fontSize: 25, color: Colors.white }, Quicksand.bold]} >{handle}</Text>
    </View>
  )
}

export default QRBlockEdit;