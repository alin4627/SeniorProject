import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import GroupsScreen from "../screens/GroupsScreen";
import ClassesScreen from "../screens/ClassesScreen";

const CourseNavigator = createStackNavigator({
  Classes: ClassesScreen,
  Groups: GroupsScreen
});

export default createAppContainer(CourseNavigator);
