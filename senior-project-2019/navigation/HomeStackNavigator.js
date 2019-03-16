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
  Footer,
  FooterTab,
  Icon,
  Content
} from "native-base";import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ChatroomScreen from '../screens/ChatroomScreen';

class OtherGroupsScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header iosBarStyle={"light-content"} style={{ backgroundColor: "#333333" }}>
          <Left>
            <Button transparent dark>
            <Icon
                name="menu"
                style={{ padding: 10, color: "white" }}
                onPress={() => this.props.navigation.openDrawer()}
              />
            </Button>
          </Left>
          <Body><Title style={{color: "white" }}>Messages</Title></Body>
          <Right>
            <Button transparent dark>
              <Icon name="add" style={{color:"white"}}/>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Student 1</Text>
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

const HomeStack = createStackNavigator({
  Home: HomeScreen,
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

OtherGroupStack.navigationOptions = ({ navigation }) => {

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
    Home: { 
        screen: HomeStack,
        navigationOptions: {
              tabBarLabel: 'Home',
              tabBarIcon: ({tintColor, activeTintColor}) => (
                 <Icon name="home" style={{padding:8, fontSize:25, color: tintColor}} />
                 )
            },
      },
      Messages: { 
        screen: OtherGroupStack,
        navigationOptions: {
              tabBarLabel: 'Messages',
              tabBarIcon: ({tintColor, activeTintColor}) => (
                 <Icon name="mail" style={{padding:8, fontSize:25, color: tintColor}} />
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