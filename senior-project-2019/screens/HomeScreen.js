import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Header,
  Button,
  Left,
  Body,
  Title,
  Right,
  Icon
} from 'native-base';
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' style={{padding:10}} onPress={() => this.props.navigation.openDrawer()}/>
              <Title>Home</Title>
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
          <Text>Hi</Text>
        </View>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
