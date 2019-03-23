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
  Content,
  List,
  ListItem,
  Icon
} from "native-base";
import { NavigationActions } from "react-navigation";
import * as firebase from 'firebase';

class ClassesSelectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    const ref = firebase.database().ref('Courses/');
    ref.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      var objectKeys = Object.keys(items);
      for (i = 0; i < objectKeys.length; i++) {
        let data = {};
        data.id = objectKeys[i]
        for (let item in items[objectKeys[i]])
        {
          data[item] = {
              id: items[objectKeys[i]][item].course_id,
              title: items[objectKeys[i]][item].course_title
          }
        }
        newState.push(data)
      }
      this.setState({
        items: newState
      });
    });
  }

  createList = () => {
    let list = []
    for (let i = 0; i < this.state.items.length; i++) {
      let children = []

      for (let item in this.state.items[i])
      {
        if (item != 'id') {
          children.push( 
            <ListItem key={this.state.items[i][item].id} onPress={() => this.props.navigation.navigate('Class', { title: this.state.items[i][item].title, course_id: this.state.items[i][item].id })}>
              <Left>
                <Text>{this.state.items[i][item].title}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          )
        }
      }
      list.push(
        <View key={this.state.items[i].id}>
          <ListItem itemDivider style={{backgroundColor:'#EEEEEE'}}>
            <Text>{this.state.items[i].id}</Text>
          </ListItem>
          {children}
        </View>
      )
    }
    return list
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header iosBarStyle={"light-content"} style={{ backgroundColor: "#333333" }}>
          <Left>
            <Button transparent dark onPress={() => this.props.navigation.goBack()}>
            <Icon
                name="arrow-back"
                style={{ padding: 10, color:"white" }}
              />
            </Button>
          </Left>
          <Body><Title style={{color:"white"}}>All Courses</Title></Body>
          <Right />
        </Header>
        <Content style={{backgroundColor:"#F8F8F8"}}>
        <List>
          {
            this.createList()
          }
        </List>
          {/* <List>
            <ListItem onPress={() => this.props.navigation.navigate("Class")}>
              <Left>
                <Text>Theory Computation (CSCI 610)</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Senior Project (CSCI 455)</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Artificial Intelligence 1 (CSCI 355)</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List> */}
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

export default ClassesSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
