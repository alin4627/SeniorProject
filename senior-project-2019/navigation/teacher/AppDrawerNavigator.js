import React from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import {
  createDrawerNavigator,
  DrawerItems,
  createAppContainer,
  SafeAreaView
} from "react-navigation";

import SettingsScreen from "../../screens/SettingsScreen";
import UpcomingScreen from "../../screens/UpcomingScreen";
import CourseNavigator from "./CourseNavigator";
import DrawerContentComponent from "../DrawerContentComponent";
import HomeStackNavigator from "../HomeStackNavigator";

const AppDrawer = createDrawerNavigator(
  {
    Home: HomeStackNavigator,
    Upcoming: UpcomingScreen,
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
