import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ClassesScreen from "../../screens/ClassesScreen";
import ClassesSelectionScreen from "../../screens/ClassSelectionScreen";
import ClassScreen from "../../screens/ClassScreen";
import ClassCreateScreen from "../../screens/ClassCreateScreen";
import ClassOptions from "../../screens/ClassOptions";
import RosterList from "../../screens/RosterList";
import ChatroomScreen from "../../screens/ChatroomScreen";
import GroupOptionScreen from "../../screens/GroupOptions";
import ProfileScreen from "../../screens/Profile";
import GroupSettings from "../../screens/GroupSettings";
import GroupTabs from "../../screens/GroupTabs";
import UploadScreen from "../../screens/UploadScreen";
import BeTeacherReq from "../../screens/BeTeacherReq";
import SettingsScreen from "../../screens/SettingsScreen";
import PrivateChat from "../../screens/PrivateChat"

const CourseNavigator = createStackNavigator(
  {
    Classes: ClassesScreen,
    ClassesSelection: ClassesSelectionScreen,
    Class: ClassScreen,
    Settings: SettingsScreen,
    ClassCreate: ClassCreateScreen,
    ClassOptions: ClassOptions,
    RosterList: RosterList,
    ChatroomScreen: ChatroomScreen,
    GroupOptionScreen: GroupOptionScreen,
    ProfileScreen: ProfileScreen,
    GroupSettings: GroupSettings,
    GroupTabs: GroupTabs,
    UploadScreen: UploadScreen,
    BeTeacherReq: BeTeacherReq,
    PrivateChat: PrivateChat
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(CourseNavigator);
