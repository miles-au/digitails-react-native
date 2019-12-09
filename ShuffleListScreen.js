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
      data: [],
      blockOrder: []
    }
  }

  componentDidMount() {
    console.log("mount")
    this.props.navigation.setParams({ submitList: this.submitList });
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

  deletePressed = (id) => {
    var currentData = this.state.data;
    currentData.splice(id, 1);
    this.setState({ data: currentData })
  }

  submitList = (navigation) => {
    var finalData = this.state.data;
    if (this.state.blockOrder.length > 0) {
      finalData = this.getOrderedData();
    }
    console.log("submit")
    setValue = async () => {
      try {
        await AsyncStorage.setItem('@qrBlocks', JSON.stringify(finalData))
      } catch (e) {
        // save error
      }
      console.log('Done.')
    }
    setValue();
    navigation.navigate('Home')
  }

  getOrderedData = () => {
    const currentData = this.state.data
    const updatedData = this.state.blockOrder.map(({ key }) => {
      return (currentData[key])
    })
    return updatedData
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: <LogoTitle title="Add QR code" />,
      headerLeft: (
        <View style={{ paddingLeft: 15 }}>
          <Icon.Button
            name="cross"
            size={30}
            backgroundColor={Colors.blue}
            color={Colors.white}
            onPress={() => navigation.navigate('Home')}
          ></Icon.Button>
        </View>
      ),
      headerRight: (
        <View>
          <Icon.Button
            name="check"
            size={25}
            backgroundColor={Colors.blue}
            color={Colors.white}
            style={{ textAlign: "right" }}
            onPress={() => params.submitList(navigation)}
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
        <SafeAreaView>
          <ScrollView>
            <SortableGrid
              blockTransitionDuration={400}
              activeBlockCenteringDuration={200}
              itemHeight={60}
              itemWidth={qrSquareWidth}
              dragActivationThreshold={200}
              onDragRelease={({ itemOrder }) => {
                console.log("itemOrder: ", itemOrder)
                this.setState({ blockOrder: itemOrder })
              }}
              onDragStart={() => console.log("Some block is being dragged now!")}
            >
              {
                this.state.data.map(({ target, platform, handle }, index) => {
                  console.log("handle: ", handle)
                  return (
                    <QRBlockEdit
                      key={index}
                      id={index}
                      platform={platform}
                      handle={handle}
                      qrSquareWidth={qrSquareWidth}
                      deletePressed={this.deletePressed}
                    />
                  )
                })
              }
            </SortableGrid>
          </ScrollView>
        </SafeAreaView>
      </View >
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
