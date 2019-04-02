import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AppDrawerNavigator from "./teacher/AppDrawerNavigator";
import CourseNavigator from "./teacher/CourseNavigator";
import TabNavigator from "./teacher/TabNavigator";

export default createAppContainer(
  createSwitchNavigator({
    Main: TabNavigator,
    Course: CourseNavigator
  })
);
