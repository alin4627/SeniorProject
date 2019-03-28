import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AppDrawerNavigator from "./teacher/AppDrawerNavigator";
import CourseNavigator from "./teacher/CourseNavigator";

export default createAppContainer(
  createSwitchNavigator({
    Main: AppDrawerNavigator,
    Course: CourseNavigator
  })
);
