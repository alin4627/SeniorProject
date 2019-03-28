import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import GroupsScreen from "../../screens/GroupsScreen";
import ClassesScreen from "../../screens/ClassesScreen";
import ClassesSelectionScreen from "../../screens/ClassSelectionScreen";
import ClassScreen from "../../screens/ClassScreen";
import ClassCreateScreen from "../../screens/ClassCreateScreen";

const CourseNavigator = createStackNavigator({
  Classes: ClassesScreen,
  Groups: GroupsScreen,
  ClassesSelection: ClassesSelectionScreen,
  Class: ClassScreen,
  ClassCreate: ClassCreateScreen,
}, {
  defaultNavigationOptions: {
    header: null
  }
});

export default createAppContainer(CourseNavigator);
