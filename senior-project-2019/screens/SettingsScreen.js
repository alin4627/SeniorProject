import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import {
  Header,
  Left,
  Body,
  Title,
  Right,
  Button,
  Toast,
  Content
} from "native-base";
import * as firebase from "firebase";

class SettingsScreen extends React.Component {
  signOutUser = async () => {
    await firebase
      .auth()
      .signOut()
      .then(
        () => {
          Toast.show({
            text: "You succesfully logged out"
          });
          this.props.navigation.navigate("Login");
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    const ref = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid);
    ref.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
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
        <Header
          iosBarStyle={"light-content"}
          style={{ backgroundColor: "#333333" }}
        >
          <Left />
          <Body>
            <Title style={{ color: "white" }}>Profile</Title>
          </Body>
          <Right />
        </Header>
        <Content>
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
            <Button
              light
              onPress={this.signOutUser}
              style={{ padding: "10%", alignSelf: "center" }}
            >
              <Text> Sign Out </Text>
            </Button>
          </View>
        </Content>
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
