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
import ClassesScreen from "../screens/ClassesScreen";
import UpcomingScreen from "../screens/UpcomingScreen";
import { ScrollView } from "react-native-gesture-handler";
import GroupScreen from "../screens/GroupsScreen";
import DrawerContentComponent from "./DrawerContentComponent";

const AppDrawer = createDrawerNavigator(
  {
    Home: HomeScreen,
    Groups: GroupScreen,
    Classes: ClassesScreen,
    Upcoming: UpcomingScreen,
    Settings: SettingsScreen
  },
  {
    contentComponent: DrawerContentComponent,
    drawerType: "slide"
  }
);

const AppDrawerNavigator = createAppContainer(AppDrawer);

export default AppDrawerNavigator;
