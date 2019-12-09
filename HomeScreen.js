import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Button, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from './Colors'
import Quicksand from './Quicksand'
import QRBlock from './components/QRBlock';
import LogoTitle from './LogoTitle'
import Icon from 'react-native-vector-icons/Entypo';
import SortableGrid from 'react-native-sortable-grid-with-fixed'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';

class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount = () => {
    this.updateData();
  }

  updateData = async () => {
    try {
      const value = await AsyncStorage.getItem('@qrBlocks')
      const parsed_value = JSON.parse(value)
      if (value != null) {
        this.props.navigation.setParams({ data: parsed_value })
        this.setState({ data: parsed_value })
      } else {
        this.props.navigation.setParams({ data: [] })
      }
    } catch (e) {
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerTitle: <LogoTitle title="Digitails" />,
      headerLeft: (
        <View style={{ paddingLeft: 15 }}>
          <Icon.Button
            name="shuffle"
            size={25}
            backgroundColor={Colors.blue}
            color={Colors.white}
            onPress={() => navigation.navigate('ShuffleList')}
          ></Icon.Button>
        </View>
      ),
      headerRight: (
        <View>
          <Icon.Button
            name="plus"
            size={30}
            backgroundColor={Colors.blue}
            color={Colors.white}
            style={{ textAlign: "right" }}
            onPress={() => navigation.navigate('AddQRBlock', { data: params.data })}
          ></Icon.Button>
        </View>
      ),
      headerStyle: {
        backgroundColor: Colors.blue
      },
      headerTitleStyle: {
        fontSize: 30,
        fontFamily: 'Quicksand-Bold'
      }
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
        <NavigationEvents
          onWillFocus={payload => this.updateData()}
        // onDidFocus={payload => console.log('did focus', payload)}
        // onWillBlur={payload => console.log('will blur', payload)}
        // onDidBlur={payload => console.log('did blur', payload)}
        />
        <SafeAreaView>
          <ScrollView style={{ paddingBottom: 50 }}>
            <SortableGrid
              blockTransitionDuration={400}
              activeBlockCenteringDuration={200}
              itemHeight={qrSquareWidth + 90}
              itemWidth={qrSquareWidth}
              dragActivationThreshold={200}
              onDragRelease={(itemOrder) => console.log("Drag was released, the blocks are in the following order: ", itemOrder)}
              onDragStart={() => console.log("Some block is being dragged now!")}>
              {
                this.state.data.map(({ target, platform, handle }, index) => {
                  return (
                    <QRBlock
                      inactive={true}
                      key={index}
                      target={target}
                      platform={platform}
                      handle={handle}
                      qrSquareWidth={qrSquareWidth}
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

export default HomeScreen;
