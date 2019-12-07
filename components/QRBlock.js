import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import Colors from '../Colors';
import Quicksand from '../Quicksand'
import QRCode from 'react-native-qrcode-svg';
import platform_icons from '../platform_icons'

const QRBlock = ({ id, target, platform, handle, isShuffling }) => {
  var { height, width } = Dimensions.get('window');
  var qrSquareSize = 0;
  if (width < 700) { // width suggests mobile screen
    qrSquareSize = width - 20.0
  } else if (width < 800) { // width suggests smaller iPad screen
    qrSquareSize = width / 2 - 20.0
  } else if (width < 1100) { // width suggests larger iPad screen in portrait
    qrSquareSize = width / 3 - 20.0
  } else { // width suggests larger iPad screen in landscape
    qrSquareSize = width / 4 - 20.0
  }
  var titleText = platform;
  var displayed = "flex"
  if (isShuffling) {
    titleText = handle
    displayed = "none"
  }

  return (
    <View>
      <View style={{ flex: 1, flexDirection: 'row', padding: 10, alignItems: 'center', width: "100%" }}>
        <Image
          style={{ width: 50, height: 50, marginRight: 10 }}
          source={platform_icons[platform]}
        />
        <Text style={[{ fontSize: 25, color: Colors.white }, Quicksand.bold]} >{titleText}</Text>
      </View>
      <View style={{ width: width, paddingLeft: 10, display: displayed }}>
        <QRCode
          style={{ padding: 10 }}
          value={target}
          size={qrSquareSize}
          color={Colors.white}
          backgroundColor={Colors.blue}
        />
      </View>
      <Text style={[{ fontSize: 25, color: Colors.white, width: "100%", textAlign: "center", display: displayed }, Quicksand.regular]} >{handle}</Text>
    </View>
  )
}

export default QRBlock;