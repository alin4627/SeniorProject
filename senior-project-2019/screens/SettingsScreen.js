import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import {
  Header,
  Left,
  Body,
  Title,
  Right,
  Button,
  Icon
} from 'native-base';
import * as firebase from "firebase";
class SettingsScreen extends React.Component {

  signOutUser = async () => {
    await firebase.auth().signOut() 
    .then(() => { Alert.alert("you succesfully logged out"); 
    this.props.navigation.navigate('Login');  }, 
    (error) => { Alert.alert(error.message); });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor: '#fff'}}>
        <Left>
            <Button transparent dark>
              <Icon name='menu' style={{padding:8}} onPress={() => this.props.navigation.openDrawer()}/>
              <Title>Settings</Title>
            </Button>
          </Left>
          <Body />
          <Right>
            <Button transparent dark>
              <Icon name='more' />
            </Button>
          </Right>
        </Header>
        <View style={{flex: 1,alignItems: 'center', justifyContent:'center'}}>
          <Text>Settings</Text>
          <Button light onPress={this.signOutUser}>
                  <Text> Sign Out </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
