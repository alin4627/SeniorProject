import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

export default class drawerContentComponents extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            onPress={this.navigateToScreen("Classes")}
            style={styles.headerText}
          >
            CSCI 335
          </Text>
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
            onPress={this.navigateToScreen("Groups")}
          >
            <Icon name="people" style={{ fontSize: 25 }} />
            <Text style={styles.screenTextStyle}>Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.screenStyle}
            onPress={this.navigateToScreen("Upcoming")}
          >
            <Icon name="calendar" style={{ fontSize: 25 }} />
            <Text style={styles.screenTextStyle}>Upcoming</Text>
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
    fontSize: 30
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
