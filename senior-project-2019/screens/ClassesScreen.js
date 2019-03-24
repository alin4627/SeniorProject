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
import * as firebase from 'firebase';

class ClassesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    try {
    const ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/classSubscriptions/');
    ref.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      // console.log(items)
      var objectKeys = Object.keys(items);
      for (i = 0; i < objectKeys.length; i++) {
        let data = {};
        data[objectKeys[i]] = {
              id: items[objectKeys[i]].course_id,
              title: items[objectKeys[i]].course_title,
              category: items[objectKeys[i]].category
        }
        newState.push(data)
      }
      this.setState({
        items: newState
      });
    })
    } catch (err) {
      console.log(err)
    }
  }

  createList = () => {
    let list = []
    for (let i = 0; i < this.state.items.length; i++) {
      for (let item in this.state.items[i])
      {
        list.push(
          <ListItem key={this.state.items[i][item].id} onPress={() => this.props.navigation.navigate('Groups', { title: this.state.items[i][item].title, course_id: this.state.items[i][item].id, category: this.state.items[i][item].category })}>
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
    return list
  }

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
          <Body><Title style={{color: "white" }}>My Courses</Title></Body>
          <Right>
            <Button transparent dark onPress={() => this.props.navigation.navigate("ClassesSelection")}>
              <Icon name="add" style={{color: "white" }} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {this.createList()}
            {/* <ListItem onPress={() => this.props.navigation.navigate("Groups")}>
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
            </ListItem> */}
          </List>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

export default ClassesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
