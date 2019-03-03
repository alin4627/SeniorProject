import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Header,
  Left,
  Icon
} from 'native-base';
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Icon name="menu" style={{padding:10}} onPress={() => this.props.navigation.openDrawer()}/>
          </Left>
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
