import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const AppLoginNavigator = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
}, {
    defaultNavigationOptions: {
      header: null
    }
  });

export default createAppContainer(AppLoginNavigator);