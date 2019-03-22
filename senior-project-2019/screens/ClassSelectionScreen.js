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
      console.log(items)
      for (let item in items) {
        console.log(items[item])
      }
      // newState.push({
      //   id: firebase.auth().currentUser.uid,
      //   firstName: items.firstName,
      //   lastName: items.lastName
      // });
      // this.setState({
      //   items: newState
      // });
    });
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
          </List>
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
