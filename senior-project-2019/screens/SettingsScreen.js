import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header, Left, Body, Title, Right, Button, Icon } from "native-base";
import * as firebase from 'firebase';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    const ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
    ref.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      console.log(items)
      newState.push({
        id: firebase.auth().currentUser.uid,
        firstName: items.firstName,
        lastName: items.lastName
      });
      this.setState({
        items: newState
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header iosBarStyle={"light-content"} style={{ backgroundColor: "#333333" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="menu"
                style={{ padding: 8, color: "white" }}
                onPress={() => this.props.navigation.openDrawer()}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: "white" }}>Settings</Title>
          </Body>
          <Right />
        </Header>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {this.state.items.map(item => {
            return (
              <View key={item.id}>
                <Title>{item.firstName}</Title>
                <Title>{item.lastName}</Title>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
