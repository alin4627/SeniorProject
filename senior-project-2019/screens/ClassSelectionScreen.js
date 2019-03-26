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
import * as firebase from "firebase";

class ClassesSelectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    const ref = firebase.database().ref("Courses/");
    ref.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      var objectKeys = Object.keys(items);
      for (i = 0; i < objectKeys.length; i++) {
        let data = {};
        data.id = objectKeys[i];
        for (let item in items[objectKeys[i]]) {
          data[item] = {
            id: items[objectKeys[i]][item].course_id,
            title: items[objectKeys[i]][item].course_title,
            category: objectKeys[i]
          };
        }
        newState.push(data);
      }
      this.setState({
        items: newState
      });
    });
  }

  createList = () => {
    let list = [];
    for (let i = 0; i < this.state.items.length; i++) {
      let children = [];

      for (let item in this.state.items[i]) {
        if (item != "id") {
          children.push(
            <ListItem
              key={this.state.items[i][item].id}
              onPress={() =>
                this.props.navigation.navigate("Class", {
                  title: this.state.items[i][item].title,
                  course_id: this.state.items[i][item].id,
                  category: this.state.items[i][item].category
                })
              }
            >
              <Left>
                <Text>{this.state.items[i][item].title}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          );
        }
      }
      list.push(
        <View key={this.state.items[i].id}>
          <ListItem itemDivider style={{ backgroundColor: "#EEEEEE" }}>
            <Text style={{ fontWeight: "bold" }}>{this.state.items[i].id}</Text>
          </ListItem>
          {children}
        </View>
      );
    }
    return list;
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header
          iosBarStyle={"light-content"}
          style={{ backgroundColor: "#333333" }}
        >
          <Left>
            <Button
              transparent
              dark
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" style={{ padding: 10, color: "white" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>All Courses</Title>
          </Body>
          <Right>
            <Button transparent dark onPress={() => this.props.navigation.navigate("ClassCreate")}>
              <Icon name="add" style={{color: "white" }} />
            </Button>
          </Right>
        </Header>
        <Content style={{ backgroundColor: "#F8F8F8" }}>
          <List>{this.createList()}</List>
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
