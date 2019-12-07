import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Button } from 'react-native';
import Colors from './Colors'
import Quicksand from './Quicksand'
import QRBlock from './components/QRBlock';

const DATA = [
  {
    id: '1',
    platform: 'Telephone',
    target: '778-801-9205',
    handle: 'mobile',
  },
  {
    id: '2',
    platform: 'Instagram',
    target: 'https://www.instagram.com/airmilesss',
    handle: 'airmilesss',
  },
  {
    id: '3',
    platform: 'Facebook',
    target: 'https://www.facebook.com/miles.au',
    handle: 'miles.au',
  },
  {
    id: '4',
    platform: 'Telephone',
    target: '778-801-9205',
    handle: 'mobile',
  },
  {
    id: '5',
    platform: 'Instagram',
    target: 'https://www.instagram.com/airmilesss',
    handle: 'airmilesss',
  },
  {
    id: '6',
    platform: 'Facebook',
    target: 'https://www.facebook.com/miles.au',
    handle: 'miles.au',
  },
  {
    id: '7',
    platform: 'Telephone',
    target: '778-801-9205',
    handle: 'mobile',
  },
  {
    id: '8',
    platform: 'Instagram',
    target: 'https://www.instagram.com/airmilesss',
    handle: 'airmilesss',
  },
  {
    id: '9',
    platform: 'Facebook',
    target: 'https://www.facebook.com/miles.au',
    handle: 'miles.au',
  },
  {
    id: '10',
    platform: 'Telephone',
    target: '778-801-9205',
    handle: 'mobile',
  },
  {
    id: '11',
    platform: 'Instagram',
    target: 'https://www.instagram.com/airmilesss',
    handle: 'airmilesss',
  },
  {
    id: '12',
    platform: 'Facebook',
    target: 'https://www.facebook.com/miles.au',
    handle: 'miles.au',
  },
];

class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  static navigationOptions = {
    title: 'Digitails',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          title="+"
          onPress={() => navigate('AddQRBlock')}
        />
        <SafeAreaView>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <QRBlock
                id={item.id}
                target={item.target}
                platform={item.platform}
                handle={item.handle}
              />
            )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue
  }
});

export default HomeScreen;
