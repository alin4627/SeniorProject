import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import {
  Header,
  Button,
  Left,
  Body,
  Title,
  Right,
  List,
  ListItem,
  Thumbnail,
  Icon,
  Content
} from "native-base";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import HomeScreen from "../../screens/HomeScreen";
import ChatroomScreen from "../../screens/ChatroomScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import CourseNavigator from "./CourseNavigator";
class OtherGroupsScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header
          iosBarStyle={"light-content"}
          style={{ backgroundColor: "#333333" }}
        >
          <Left />
          <Body>
            <Title style={{ color: "white" }}>Messages</Title>
          </Body>
          <Right>
            <Button transparent dark>
              <Icon name="add" style={{ color: "white" }} />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail
                  small
                  source={{
                    uri:
                      "https://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/0-fs5ztag0_600x400.jpg"
                  }}
                />
              </Left>
              <Body>
                <Text>Student 1</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const OtherGroupStack = createStackNavigator(
  {
    OtherGroups: OtherGroupsScreen,
    Chat: ChatroomScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

CourseNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "ChatroomScreen") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: HomeStack,
        navigationOptions: {
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor, activeTintColor }) => (
            <Icon
              name="home"
              style={{ padding: 8, fontSize: 25, color: tintColor }}
            />
          )
        }
      },
      Courses: {
        screen: CourseNavigator,
        navigationOptions: {
          tabBarLabel: "Courses",
          tabBarIcon: ({ tintColor, activeTintColor }) => (
            <Icon
              name="school"
              style={{ padding: 8, fontSize: 25, color: tintColor }}
            />
          )
        }
      },
      Messages: {
        screen: OtherGroupStack,
        navigationOptions: {
          tabBarLabel: "Messages",
          tabBarIcon: ({ tintColor, activeTintColor }) => (
            <Icon
              name="mail"
              style={{ padding: 8, fontSize: 25, color: tintColor }}
            />
          )
        }
      },
      Profile: {
        screen: SettingsScreen,
        navigationOptions: {
          tabBarLabel: "Profile",
          tabBarIcon: ({ tintColor, activeTintColor }) => (
            <Icon
              name="person"
              style={{ padding: 8, fontSize: 25, color: tintColor }}
            />
          )
        }
      }
    },
    {
      defaultNavigationOptions: {
        header: null
      },
      tabBarOptions: {
        activeTintColor: "#407CCA",
        inactiveTintColor: "#7e7b7b",
        showIcon: true,
        showLabel: true,
        labelStyle: {
          fontSize: 12
        }
      }
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});