import React from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, TouchableNativeFeedback, Dimensions } from 'react-native';
import Colors from './Colors'
import Quicksand from './Quicksand'
import { ScrollView } from 'react-native-gesture-handler';
import platform_icons from './platform_icons'
import Platform_Icon from './Platform_Icon'

class AddQRBlockScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedPlatform: "",
      fieldType: "URL/Target"
    }
  }

  updateSelectedPlatform = (newPlatform) => {
    switch (newPlatform) {
      case "Email":
        this.setState({ selectedPlatform: newPlatform, fieldType: "Email" })
        break;
      case "Telephone":
        this.setState({ selectedPlatform: newPlatform, fieldType: "Phone Number" })
        break;
      case "Instagram":
      case "Twitter":
        this.setState({ selectedPlatform: newPlatform, fieldType: "Handle" })
        break;
      default:
        this.setState({ selectedPlatform: newPlatform, fieldType: "URL" })
    }
  }

  static navigationOptions = {
    title: 'Add QR Code',
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
    const { navigate } = this.props.navigation;
    var { height, width } = Dimensions.get('window');

    return (
      <ScrollView style={[{ padding: 5 }, styles.container]}>
        <Text style={[{ padding: 5, color: Colors.white, fontSize: 25 }, Quicksand.semibold]}>{`Platform: ${this.state.selectedPlatform}`}</Text>
        <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
          {
            Object.keys(platform_icons).map((key, index) => {
              return (
                <TouchableNativeFeedback
                  key={index}
                  onPress={() => this.updateSelectedPlatform(key)}
                >
                  <View>
                    <Platform_Icon
                      key={index}
                      selectedPlatform={this.state.selectedPlatform}
                      platform={key}
                    />
                  </View>
                </TouchableNativeFeedback>
              )
            })
          }
        </View>
        <Text style={[{ padding: 5, color: Colors.white, fontSize: 25 }, Quicksand.semibold]}>{`${this.state.fieldType}:`}</Text>
        <TextInput style={{ backgroundColor: Colors.white, width: width - 20, alignSelf: "center", marginTop: 5, marginBottom: 5 }}></TextInput>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlue
  }
});

export default AddQRBlockScreen
