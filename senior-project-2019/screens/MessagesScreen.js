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
import * as firebase from "firebase";

class MessagesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classStatus: false,
      groupsStatus: false,
      classes: [],
      userGroups: []
    };
  }

  fetchUserGroups() {
    let newState = [];
    if (this.state.classes.length > 0) {
      for (let i = 0; i < this.state.classes.length; i++) {
        for (let item in this.state.classes[i]) {
          let courseTitle = this.state.classes[i][item].title;
          let courseCategory = this.state.classes[i][item].category;
          if (item.id != "keys") {
            const ref = firebase
              .database()
              .ref("Courses/" + courseCategory + "/" + courseTitle + "/Groups");
            ref.once(
              "value",
              snapshot => {
                if (snapshot.exists()) {
                  let items = snapshot.val();
                  var objectKeys = Object.keys(items);
                  for (i = 0; i < objectKeys.length; i++) {
                    let subbed = false;
                    let userList = Object.keys(items[objectKeys[i]].users);
                    for (j = 0; j < userList.length; j++) {
                      if (
                        userList[j] == firebase.auth().currentUser.uid ||
                        this.state.userLevel == 0
                      ) {
                        subbed = true;
                      }
                    }
                    let data = {
                      course_title: courseTitle,
                      group_title: objectKeys[i],
                      users_length: Object.keys(items[objectKeys[i]].users)
                        .length,
                      category: courseCategory
                    };
                    if (subbed) {
                      newState.push(data);
                    }
                  }
                  this.setState({
                    userGroups: newState
                  });
                }
              },
              function(errorObject) {
                console.log("The read failed: " + errorObject.code);
              }
            );
          }
        }
      }
    }
  }

  componentDidMount() {
    this.getUserClasses();
    setTimeout(
      function() {
        this.fetchUserGroups();
      }.bind(this),
      1000
    );
  }

  getUserClasses() {
    let newState = [];
    const ref = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid + "/classSubscriptions/");
    ref.once(
      "value",
      snapshot => {
        if (snapshot.exists()) {
          let items = snapshot.val();
          // console.log(items)
          var objectKeys = Object.keys(items);
          for (i = 0; i < objectKeys.length; i++) {
            let data = {};
            data[objectKeys[i]] = {
              id: items[objectKeys[i]].course_id,
              title: items[objectKeys[i]].course_title,
              category: items[objectKeys[i]].category
            };
            newState.push(data);
          }
          this.setState({
            classes: newState,
            classStatus: true
          });
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

  render() {
    console.log(this.state.classes);
    console.log(this.state.userGroups);
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
            <Button
              transparent
              dark
              onPress={() =>
                this.props.navigation.navigate("RosterList", {
                  source: "all"
                })
              }
            >
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

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
