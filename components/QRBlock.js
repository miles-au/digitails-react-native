import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Colors from '../Colors';
import Quicksand from '../Quicksand'
import QRCode from 'react-native-qrcode-svg';
import platform_icons from '../platform_icons'

const QRBlock = ({ target, platform, handle, qrSquareWidth }) => {
  var titleText = platform;

  return (
    <View style={{ height: qrSquareWidth + 90, paddingTop: 5 }}>
      <View style={{ flex: 1, flexDirection: 'row', padding: 10, alignItems: 'center', width: "100%" }}>
        <Image
          style={{ width: 50, height: 50, marginRight: 10 }}
          source={platform_icons[platform]}
        />
        <Text style={[{ fontSize: 25, color: Colors.white }, Quicksand.bold]} >{titleText}</Text>
      </View>
      <View style={{ width: qrSquareWidth, paddingLeft: 10, marginTop: 10 }}>
        <QRCode
          style={{ padding: 10 }}
          value={target}
          size={qrSquareWidth}
          color={Colors.white}
          backgroundColor={Colors.blue}
        />
      </View>
      <Text style={[{ fontSize: 25, color: Colors.white, width: "100%", textAlign: "center" }, Quicksand.regular]} >{handle}</Text>
    </View>
  )
}

export default QRBlock;