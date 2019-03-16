import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Icon } from "native-base";
import * as firebase from "firebase";

export default class drawerContentComponents extends Component {
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

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    var user = firebase.auth().currentUser;
    var s = "";
    if (user) {
      s = user.email;
    } else {
      s = "Not logged In";
    }
    return (
      <View style={styles.container}>
      <ScrollView>
      <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{s}</Text>
        </View>
        <View style={styles.screenContainer}>
          <Text style={{marginBottom:10}}>Pages</Text>
          <TouchableOpacity
            style={styles.screenStyle}
            onPress={this.navigateToScreen("Home")}
          >
            <Icon name="home" style={styles.iconStyle} />
            <Text style={styles.screenTextStyle}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.screenStyle}
            onPress={this.navigateToScreen("Courses")}
          >
            <Icon name="school" style={styles.iconStyle} />
            <Text style={styles.screenTextStyle}>Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.screenStyle}
            onPress={this.navigateToScreen("Settings")}
          >
            <Icon name="settings" style={styles.iconStyle} />
            <Text style={styles.screenTextStyle}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.footerContainer} onPress={this.signOutUser}>
      <Icon name="exit" style={styles.iconStyle} />
        <Text style={styles.screenTextStyle}>Sign Out</Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginLeft:20,
    flex: 1
  },
  headerContainer: {
    height: 100
  },
  headerText: {
    paddingTop: 65,
    fontSize: 20
  },
  screenContainer: {
    paddingTop: 20
  },
  screenStyle: {
    height: 35,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10
  },
  screenTextStyle: {
    fontSize: 20,
    paddingTop: 2,
    marginLeft: 10
  },
  iconStyle: {
    fontSize: 25, 
  },
  footerContainer: {
    flexDirection: "row",
    paddingBottom: 50
  }
});
