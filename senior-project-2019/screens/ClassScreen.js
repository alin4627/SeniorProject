import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Header,
  H2,
  Button,
  Left,
  Body,
  Title,
  Right,
  Content,
  Text,
  Icon
} from "native-base";
import * as firebase from "firebase";

class ClassScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      course_id: "",
      category: "",
      hasAccess: false,
      isPending: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "Unavailable");
    const course_id = navigation.getParam("course_id", "Unavailable");
    const category = navigation.getParam("category", "Unavailable");
    this.setState({
      title: title,
      course_id: course_id,
      category: category
    });
    const ref = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid + "/classSubscriptions");
    ref.on("value", snapshot => {
      if (snapshot.exists()) {
        let items = snapshot.val();
        var objectKeys = Object.keys(items);
        for (i = 0; i < objectKeys.length; i++) {
          if (objectKeys[i] == title) {
            this.setState({
              hasAccess: true
            });
          }
        }
      }
    });
    const ref1 = firebase
      .database()
      .ref("Courses/" + category + "/" + title + "/users/pending/");
    ref1.on("value", snapshot => {
      if (snapshot.exists()) {
        let items = snapshot.val();
        var objectKeys = Object.keys(items);
        console.log(objectKeys);
        for (i = 0; i < objectKeys.length; i++) {
          if (objectKeys[i] == firebase.auth().currentUser.uid) {
            this.setState({
              isPending: true
            });
          }
        }
      }
    });
  }

  renderButton() {
    let content = [];
    if (this.state.hasAccess == true) {
      content.push(
        <Button
          disabled
          key="disabledrequest"
          style={{ alignSelf: "center" }}
          onPress={() =>
            this.requestClass(this.state.title, this.state.category)
          }
        >
          <Text>You already have access</Text>
        </Button>
      );
    } else if (this.state.isPending == true) {
      content.push(
        <Button
          disabled
          key="disabledrequest"
          style={{ alignSelf: "center" }}
          onPress={() =>
            this.requestClass(this.state.title, this.state.category)
          }
        >
          <Text>You are waiting for approval</Text>
        </Button>
      );
    } else {
      content.push(
        <Button
          key="request"
          style={{ alignSelf: "center" }}
          onPress={() =>
            this.requestClass(this.state.title, this.state.category)
          }
        >
          <Text>Request Access</Text>
        </Button>
      );
    }
    return content;
  }

  render() {
    return (
      <View behavior="padding" style={styles.container}>
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
            <Title style={{ color: "white" }}>{this.state.course_id}</Title>
          </Body>
          <Right>
            <Button transparent dark>
              <Icon
                ios="md-more"
                android="md-more"
                style={{ color: "white" }}
              />
            </Button>
          </Right>
        </Header>
        <Content
          padder
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
          style={{ backgroundColor: "#F8F8F8" }}
        >
          <View style={styles.center}>
            <H2 style={styles.textHeaders}>Name: {this.state.title}</H2>
            <H2 style={styles.textHeaders}>
              Course ID: {this.state.course_id}
            </H2>
            <Text style={styles.textHeaders}>View past students</Text>
            <View style={styles.textHeaders}>{this.renderButton()}</View>
          </View>
        </Content>
      </View>
    );
  }

  requestClass(title, category) {
    firebase
      .database()
      .ref(
        "Courses/" +
          category +
          "/" +
          title +
          "/users/pending/" +
          firebase.auth().currentUser.uid
      )
      .set({
        userName: firebase.auth().currentUser.displayName,
        userLevel: 1
      });
  }
}

export default ClassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: "center"
  },
  textHeaders: {
    padding: 20
  }
});
