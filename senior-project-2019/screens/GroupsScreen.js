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
import ChatroomScreen from './ChatroomScreen';

class OwnGroupScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header style={{ backgroundColor: "#fff" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ padding: 10 }}
                onPress={() => this.props.navigation.goBack()}
              />
              <Title>My Groups</Title>
            </Button>
          </Left>
          <Body />
          <Right>
            <Button transparent dark>
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Group 1</Text>
            </CardItem>
            <CardItem button bordered onPress={() => this.props.navigation.navigate("Chat")}>
              <Body>
                <Text># of members: 15</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

class OtherGroupsScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header style={{ backgroundColor: "#fff" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ padding: 10 }}
                onPress={() => this.props.navigation.goBack()}
              />
              <Title>Open Groups</Title>
            </Button>
          </Left>
          <Body />
          <Right>
            <Button transparent dark>
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Content padder>
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
    Personal: OwnGroupStack,
    Open: OtherGroupStack,
  },
  {
    navigationOptions: {
      header: null
    }
  }
));

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});