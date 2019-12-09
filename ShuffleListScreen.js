import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Button, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from './Colors'
import Quicksand from './Quicksand'
import QRBlockEdit from './components/QRBlockEdit';
import LogoTitle from './LogoTitle'
import Icon from 'react-native-vector-icons/Entypo';
import SortableGrid from 'react-native-sortable-grid-with-fixed'
import AsyncStorage from '@react-native-community/async-storage';

class ShuffleListScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      data: [
        { id: '1', platform: 'Telephone', target: '778-801-9205', handle: 'mobile', },
        { id: '2', platform: 'Instagram', target: 'https://www.instagram.com/airmilesss', handle: 'airmilesss', },
        { id: '3', platform: 'Facebook', target: 'https://www.facebook.com/miles.au', handle: 'miles.au', },
        { id: '4', platform: 'Telephone', target: '778-801-9205', handle: 'mobile', },
        { id: '5', platform: 'Instagram', target: 'https://www.instagram.com/airmilesss', handle: 'airmilesss', },
        { id: '6', platform: 'Facebook', target: 'https://www.facebook.com/miles.au', handle: 'miles.au', },
        { id: '7', platform: 'Telephone', target: '778-801-9205', handle: 'mobile', },
        { id: '8', platform: 'Instagram', target: 'https://www.instagram.com/airmilesss', handle: 'airmilesss', },
        { id: '9', platform: 'Facebook', target: 'https://www.facebook.com/miles.au', handle: 'miles.au', },
      ],
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ shuffleFunction: this.switchShuffling });
  }

  static navigationOptions = {
    title: 'Shuffle/Edit',
    headerStyle: {
      backgroundColor: Colors.blue
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      fontSize: 30,
      fontFamily: 'Quicksand-Bold'
    }
  };

  render() {
    var { height, width } = Dimensions.get('window');
    var qrSquareWidth = 0;
    if (width < 700) { // width suggests mobile screen
      qrSquareWidth = width - 20.0
    } else if (width < 800) { // width suggests smaller iPad screen
      qrSquareWidth = width / 2 - 20.0
    } else if (width < 1100) { // width suggests larger iPad screen in portrait
      qrSquareWidth = width / 3 - 20.0
    } else { // width suggests larger iPad screen in landscape
      qrSquareWidth = width / 4 - 20.0
    }
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <SortableGrid
              blockTransitionDuration={400}
              activeBlockCenteringDuration={200}
              itemHeight={60}
              itemWidth={qrSquareWidth}
              dragActivationThreshold={200}
              onDragRelease={(itemOrder) => console.log("Drag was released, the blocks are in the following order: ", itemOrder)}
              onDragStart={() => console.log("Some block is being dragged now!")} >
              {
                this.state.data.map(({ id, target, platform, handle }) => {
                  return (
                    <QRBlockEdit
                      key={id}
                      id={id}
                      platform={platform}
                      handle={handle}
                      qrSquareWidth={qrSquareWidth}
                      isShuffling={this.state.isShuffling}
                    />
                  )
                })
              }
            </SortableGrid>
          </ScrollView>
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

export default ShuffleListScreen;
