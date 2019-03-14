import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import * as firebase from "firebase";

export default class drawerContentComponents extends Component {
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
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{s}</Text>
        </View>
        <View style={styles.screenContainer}>
          <Text>Pages</Text>
          <TouchableOpacity
            style={styles.screenStyle}
            onPress={this.navigateToScreen("Home")}
          >
            <Icon name="home" style={{ fontSize: 25 }} />
            <Text style={styles.screenTextStyle}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.screenStyle}
            onPress={this.navigateToScreen("Courses")}
          >
            <Icon name="settings" style={{ fontSize: 25 }} />
            <Text style={styles.screenTextStyle}>Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.screenStyle}
            onPress={this.navigateToScreen("Settings")}
          >
            <Icon name="settings" style={{ fontSize: 25 }} />
            <Text style={styles.screenTextStyle}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20
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
    height: 30,
    flexDirection: "row",
    marginTop: 15
  },
  screenTextStyle: {
    fontSize: 20,
    paddingTop: 2,
    marginLeft: 10
  }
});
