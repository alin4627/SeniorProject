import React from 'react';
import {
  StyleSheet,
  Text,
  View,
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

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header>
        <Left>
            <Button transparent>
              <Icon name='menu' style={{padding:8}} onPress={() => this.props.navigation.openDrawer()}/>
              <Title>Settings</Title>
            </Button>
          </Left>
          <Body />
          <Right>
            <Button transparent>
              <Icon name='more' />
            </Button>
          </Right>
        </Header>
        <View style={{flex: 1,alignItems: 'center', justifyContent:'center'}}>
          <Text>Settings</Text>
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
