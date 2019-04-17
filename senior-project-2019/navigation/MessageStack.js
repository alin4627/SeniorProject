import { createStackNavigator, createAppContainer } from "react-navigation";
import Messages from "../screens/MessagesScreen";
import RosterList from "../screens/RosterList";
import PrivateChat from "../screens/PrivateChat";
import ProfileScreen from "../screens/Profile";

const MessageStack = createStackNavigator(
  {
    Messages: Messages,
    RosterList: RosterList,
    PrivateChat: PrivateChat,
    ProfileScreen: ProfileScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(MessageStack);
