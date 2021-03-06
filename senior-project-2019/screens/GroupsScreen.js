import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
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
  Card,
  CardItem,
  Icon,
  Content
} from "native-base";import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import OwnGroupScreen from './OwnGroups';
import ChatroomScreen from './ChatroomScreen';
import * as firebase from 'firebase';

class OtherGroupsScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header iosBarStyle={"light-content"} style={{ backgroundColor: "#333333" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ padding: 10, color: "white" }}
                onPress={() => this.props.navigation.navigate("Classes")}
              />
            </Button>
          </Left>
          <Body><Title style={{color: "white" }}>Open Groups</Title></Body>
          <Right>
            <Button transparent dark>
              <Icon name="add" style={{color:"white"}}/>
            </Button>
          </Right>
        </Header>
        <Content padder style={{backgroundColor:"#F8F8F8"}}>
          <Card>
            <CardItem header bordered>
              <Text>Group 1</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text># of members: 15</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Study Buddies</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text># of members: 6</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

const OwnGroupStack = createStackNavigator({
  OwnGroups: OwnGroupScreen,
  Chat: ChatroomScreen
}, {
  defaultNavigationOptions: {
    header: null
  }
});

const OtherGroupStack = createStackNavigator({
  OtherGroups: OtherGroupsScreen,
  Chat: ChatroomScreen
}, {
  defaultNavigationOptions: {
    header: null
  }
});

OwnGroupStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'Chat' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}


export default createAppContainer(createBottomTabNavigator(
  {
    Personal: { 
      screen: OwnGroupStack,
      navigationOptions: {
            tabBarLabel: 'Personal',
            tabBarIcon: ({tintColor, activeTintColor}) => (
               <Icon name="person" style={{padding:8, fontSize:25, color: tintColor}} />
               )
          },
    },
    Open: { 
      screen: OtherGroupStack,
      navigationOptions: {
            tabBarLabel: 'Open',
            tabBarIcon: ({tintColor, activeTintColor}) => (
               <Icon name="people" style={{padding:8, fontSize:25, color: tintColor}} />
               )
          },
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: '#407CCA',
      inactiveTintColor: '#7e7b7b',
      showIcon: true,
      showLabel: true,
      labelStyle: {
       fontSize: 12,
      }
  }
  }
));

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});