import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import GroupsScreen from "../../screens/OwnGroups";
import OpenGroupsScreen from "../../screens/OpenGroups";
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
import InvitedGroupList from "../../screens/InvitedGroupList";

const CourseNavigator = createStackNavigator(
  {
    Classes: ClassesScreen,
    Groups: GroupsScreen,
    ClassesSelection: ClassesSelectionScreen,
    Class: ClassScreen,
    ClassCreate: ClassCreateScreen,
    ClassOptions: ClassOptions,
    RosterList: RosterList,
    ChatroomScreen: ChatroomScreen,
    OpenGroupsScreen: OpenGroupsScreen,
    GroupOptionScreen: GroupOptionScreen,
    ProfileScreen: ProfileScreen,
    GroupSettings: GroupSettings,
    GroupTabs: GroupTabs,
    UploadScreen: UploadScreen,
    InvitedGroupList: InvitedGroupList
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(CourseNavigator);
