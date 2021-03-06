import React from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import {
  createDrawerNavigator,
  DrawerItems,
  createAppContainer,
  SafeAreaView
} from "react-navigation";

import HomeScreen from "../../screens/HomeScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import CourseNavigator from "./CourseNavigator";
import DrawerContentComponent from "../DrawerContentComponent";
import HomeStackNavigator from "../HomeStackNavigator";

const AppDrawer = createDrawerNavigator(
  {
    Home: HomeStackNavigator,
    Settings: SettingsScreen,
    Courses: CourseNavigator
  },
  {
    contentComponent: DrawerContentComponent,
    drawerType: "slide"
  }
);

const AppDrawerNavigator = createAppContainer(AppDrawer);

export default AppDrawerNavigator;
