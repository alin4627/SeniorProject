import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AppDrawerNavigator from "./student/AppDrawerNavigator";
import CourseNavigator from "./student/CourseNavigator";

export default createAppContainer(
  createSwitchNavigator({
    Main: AppDrawerNavigator,
    Course: CourseNavigator
  })
);
