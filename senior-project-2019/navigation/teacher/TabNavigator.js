import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import {
  Header,
  Button,
  Left,
  Body,
  Title,
  Right,
  List,
  ListItem,
  Thumbnail,
  Icon,
  Content
} from "native-base";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import HomeScreen from "../../screens/HomeScreen";
import MessageStack from "../MessageStack";
import SettingsScreen from "../../screens/SettingsScreen";
import CourseNavigator from "./CourseNavigator";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

CourseNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "ChatroomScreen") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

MessageStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "PrivateChat" || routeName == "ChatroomScreen") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: HomeStack,
        navigationOptions: {
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor, activeTintColor }) => (
            <Icon
              name="home"
              style={{ padding: 8, fontSize: 25, color: tintColor }}
            />
          )
        }
      },
      Courses: {
        screen: CourseNavigator,
        navigationOptions: {
          tabBarLabel: "Courses",
          tabBarIcon: ({ tintColor, activeTintColor }) => (
            <Icon
              name="school"
              style={{ padding: 8, fontSize: 25, color: tintColor }}
            />
          )
        }
      },
      Messages: {
        screen: MessageStack,
        navigationOptions: {
          tabBarLabel: "Messages",
          tabBarIcon: ({ tintColor, activeTintColor }) => (
            <Icon
              name="mail"
              style={{ padding: 8, fontSize: 25, color: tintColor }}
            />
          )
        }
      },
      Profile: {
        screen: SettingsScreen,
        navigationOptions: {
          tabBarLabel: "Profile",
          tabBarIcon: ({ tintColor, activeTintColor }) => (
            <Icon
              name="person"
              style={{ padding: 8, fontSize: 25, color: tintColor }}
            />
          )
        }
      }
    },
    {
      defaultNavigationOptions: {
        header: null
      },
      tabBarOptions: {
        activeTintColor: "#407CCA",
        inactiveTintColor: "#7e7b7b",
        showIcon: true,
        showLabel: true,
        labelStyle: {
          fontSize: 12
        }
      }
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
