import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Header, Left, Body, Title, Right, Button, Icon } from "native-base";
import * as firebase from "firebase";
class SettingsScreen extends React.Component {
  signOutUser = async () => {
    await firebase
      .auth()
      .signOut()
      .then(
        () => {
          Alert.alert("You succesfully logged out");
          this.props.navigation.navigate("Login");
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };

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
          <Body><Title style={{color: "white" }}>Settings</Title></Body>
          <Right />
        </Header>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Settings</Text>
          <Button
            light
            onPress={this.signOutUser}
            style={{ padding: "10%", alignSelf: "center" }}
          >
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
    flex: 1
  }
});
