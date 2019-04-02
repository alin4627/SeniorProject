import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import TabNavigator from "./student/TabNavigator";
import CourseNavigator from "./student/CourseNavigator";

export default createAppContainer(
  createSwitchNavigator({
    Main: TabNavigator,
    Course: CourseNavigator
  })
);
