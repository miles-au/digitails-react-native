import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import Colors from '../Colors';
import Quicksand from '../Quicksand'
import QRCode from 'react-native-qrcode-svg';

const styles = StyleSheet.create({
});

const platform_icons = {
  Email: require('../images/Email.png'),
  Facebook: require('../images/Facebook.png'),
  GitHub: require('../images/GitHub.png'),
  Instagram: require('../images/Instagram.png'),
  LinkedIn: require('../images/LinkedIn.png'),
  Telephone: require('../images/Telephone.png'),
  Twitter: require('../images/Twitter.png'),
  Website: require('../images/Website.png'),
};

const QRBlock = ({ id, target, platform, handle }) => {
  var { height, width } = Dimensions.get('window');

  return (
    <View>
      <View style={{ flex: 1, flexDirection: 'row', padding: 10, alignItems: 'center', width: "100%" }}>
        <Image
          style={{ width: 50, height: 50, marginRight: 10 }}
          source={platform_icons[platform]}
        />
        <Text style={[{ fontSize: 25, color: Colors.white }, Quicksand.bold]} >{platform}</Text>
      </View>
      <View style={{ width: width, paddingLeft: 10 }}>
        <QRCode
          style={{ padding: 10 }}
          value={target}
          size={width - 20}
          color={Colors.white}
          backgroundColor={Colors.blue}
        />
      </View>
      <Text style={[{ fontSize: 25, color: Colors.white, width: "100%", textAlign: "center" }, Quicksand.regular]} >{handle}</Text>
    </View>
  )
}

export default QRBlock;