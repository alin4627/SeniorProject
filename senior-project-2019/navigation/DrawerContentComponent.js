import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, ImageBackground } from "react-native";

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
          <View style={styles.screenStyle}>
            <Text
              style={styles.screenTextStyle}
              onPress={this.navigateToScreen("Home")}
            >
              Home
            </Text>
          </View>
          <View style={styles.screenStyle}>
            <Text
              style={styles.screenTextStyle}
              onPress={this.navigateToScreen("Groups")}
            >
              Groups
            </Text>
          </View>
          <View style={styles.screenStyle}>
            <Text
              style={styles.screenTextStyle}
              onPress={this.navigateToScreen("Upcoming")}
            >
              Upcoming
            </Text>
          </View>
          <View style={styles.screenStyle}>
            <Text
              style={styles.screenTextStyle}
              onPress={this.navigateToScreen("Settings")}
            >
              Settings
            </Text>
          </View>
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
    marginTop: 15
  },
  screenTextStyle: {
    fontSize: 20
  }
});
