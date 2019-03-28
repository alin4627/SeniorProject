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
import OwnGroupScreen from '../../screens/OwnGroups';
import ChatroomScreen from '../../screens/ChatroomScreen';
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
          <Body><Title style={{color: "white" }}>Pending students</Title></Body>
          <Right>
            <Button transparent dark>
              <Icon name="add" style={{color:"white"}}/>
            </Button>
          </Right>
        </Header>
        <Content padder style={{backgroundColor:"#F8F8F8"}}>
          
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
            tabBarLabel: 'Groups',
            tabBarIcon: ({tintColor, activeTintColor}) => (
               <Icon name="person" style={{padding:8, fontSize:25, color: tintColor}} />
               )
          },
    },
    Open: { 
      screen: OtherGroupStack,
      navigationOptions: {
            tabBarLabel: 'Pending',
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