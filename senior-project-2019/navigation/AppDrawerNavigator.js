import React from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import {
  createDrawerNavigator,
  DrawerItems,
  createAppContainer,
  SafeAreaView
} from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import UpcomingScreen from "../screens/UpcomingScreen";
import { ScrollView } from "react-native-gesture-handler";
import CourseNavigator from "./CourseNavigator";
import DrawerContentComponent from "./DrawerContentComponent";

const AppDrawer = createDrawerNavigator(
  {
    Home: HomeScreen,
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
