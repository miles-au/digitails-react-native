import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Colors from '../Colors';
import Quicksand from '../Quicksand'
import platform_icons from '../platform_icons'
import Icon from 'react-native-vector-icons/Ionicons';

const QRBlockEdit = ({ id, platform, handle, qrSquareWidth, deletePressed }) => {
  var titleText = platform;

  return (
    <View style={{
      flex: 1, padding: 10, marginTop: 5, width: "100%", alignItems: 'center', flexDirection: "row", justifyContent: "space-between"
    }}>
      < Image
        style={{ width: 50, height: 50, marginRight: 10 }}
        source={platform_icons[platform]}
      />
      <Text numberOfLines={1} style={[{ fontSize: 25, color: Colors.white, flexShrink: 1, paddingLeft: 5, paddingLeft: 5 }, Quicksand.bold]} >{handle}</Text>
      <Icon.Button
        name="md-trash"
        backgroundColor={Colors.blue}
        color={Colors.white}
        size={30}
        onPress={() => deletePressed(id)}
      ></Icon.Button>
    </View >
  )
}

export default QRBlockEdit;