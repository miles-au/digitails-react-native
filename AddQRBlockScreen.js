import React from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, TouchableNativeFeedback, Alert, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LogoTitle from './LogoTitle'
import Icon from 'react-native-vector-icons/Entypo';
import Colors from './Colors'
import Quicksand from './Quicksand'
import platform_icons from './platform_icons'
import Platform_Icon from './Platform_Icon'
import AsyncStorage from '@react-native-community/async-storage';

class AddQRBlockScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedPlatform: "",
      fieldType: "URL/Target",
      target: ""
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ submitPlatform: this.submitPlatform });
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

  checkURLAndPlatform = (url, platform) => {
    // check that the url is a valid url
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    if (!!pattern.test(url)) {
      //check to see url contains platform
      if (url.indexOf(platform.toLowerCase()) > -1) {
        return true
      }
    }
    return false
  }

  getHandle = (platform, url) => {
    var handle = ""
    var target = url
    if (target.last == "/") {
      target = target.slice(0, -1);
    }

    switch (platform) {
      case "Telephone":
      case "Email":
      case "Website":
        handle = target
        break;
      case "Facebook":
      case "LinkedIn":
      case "GitHub":
        handle = target.split("/").slice(-1).pop();
        break;
      case "Instagram":
      case "Twitter":
        handle = `@${target.split("/").slice(-1).pop()}`
        break;
      default:
        handle = ""
    }

    return handle
  }

  submitPlatform = (navigation) => {
    var { selectedPlatform, target } = this.state
    if (target == "") {
      Alert.alert(
        'Please include a platform and a url/target', '',
        [{ text: 'Continue', onPress: () => console.log('continue pressed') },],
        { cancelable: true },
      );
    } else {
      // validate URL
      var legitTarget = false
      switch (selectedPlatform) {
        case "Facebook":
        case "LinkedIn":
        case "GitHub":
          legitTarget = this.checkURLAndPlatform(target, selectedPlatform)
          break;
        case "Instagram":
        case "Twitter":
          if (target.charAt(0) == "@") {
            target = target.substr(1);
          }
          target = `https://www.${platform.toLowerCase()}.com/${target}`
          break;
        default:
          legitTarget = true
      }

      if (legitTarget || selectedPlatform == "Twitter" || selectedPlatform == "Instagram") {
        // valid entry, write to file
        var data = this.props.navigation.state.params.data
        let handle = this.getHandle(selectedPlatform, target)
        data.push({ platform: this.state.selectedPlatform, target: this.state.target, handle: handle, })
        setValue = async () => {
          try {
            await AsyncStorage.setItem('@qrBlocks', JSON.stringify(data))
          } catch (e) {
            // save error
          }
          console.log('Done.')
        }
        setValue()
        navigation.navigate('Home')
      } else {
        Alert.alert(
          "The url is either invalid or doesn't match the platform", '',
          [{ text: 'Continue', onPress: () => console.log('continue pressed') },],
          { cancelable: true },
        );
      }
    }
  }

  onChangeTargetText(text) {
    this.setState({ target: text })
    console.log("text: ", text)
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
            onPress={() => params.submitPlatform(navigation)}
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
        <TextInput
          style={{ backgroundColor: Colors.white, width: width - 20, alignSelf: "center", marginTop: 5, marginBottom: 5 }}
          onChangeText={text => this.onChangeTargetText(text)}></TextInput>
        {/* <TouchableNativeFeedback
          onPress={() => {
            this.props.navigation.navigate('Home', {
              addPlatform: this.state.selectedPlatform,
              addTarget: this.state.target
            });
          }}
          // onPress={this._onPressButton}
          background={TouchableNativeFeedback.Ripple()}>
          <View style={{ width: width - 20, backgroundColor: Colors.white, padding: 10, margin: 5 }}>
            <Text style={{ fontSize: 20, color: Colors.blue, alignSelf: "center" }}>Add QR Code</Text>
          </View>
        </TouchableNativeFeedback> */}
      </ScrollView >
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
