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
  Tabs,
  Tab,
  List,
  ListItem,
  Spinner,
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
      loadingGroups: true,
      classes: [],
      userGroups: [],
      userMessages: []
    };
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

  checkUserChat() {
    let newState = [];
    const ref = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid + "/userMessages/");
    ref.once(
      "value",
      snapshot => {
        if (snapshot.exists()) {
          let items = snapshot.val();
          var objectKeys = Object.keys(items);
          console.log(objectKeys);
          for (i = 0; i < objectKeys.length; i++) {
            let data = {
              chat_uid: objectKeys[i],
              other_user: items[objectKeys[i]].other_user_username,
              last_text: items[objectKeys[i]].last_message
            };
            newState.push(data);
          }
          this.setState({
            userMessages: newState
          });
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
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
    this.setState({
      loadingGroups: false
    });
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.getUserClasses();
        this.checkUserChat();
        setTimeout(
          function() {
            this.fetchUserGroups();
          }.bind(this),
          500
        );
      }
    );
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  createList = () => {
    let list = [];
    if (this.state.userGroups.length > 0) {
      for (let i = 0; i < this.state.userGroups.length; i++) {
        list.push(
          <ListItem
            key={this.state.userGroups[i].group_title}
            onPress={() =>
              this.props.navigation.navigate("ChatroomScreen", {
                group_title: this.state.userGroups[i].group_title,
                course_title: this.state.userGroups[i].course_title,
                category: this.state.userGroups[i].category
              })
            }
          >
            <Body>
              <Text style={styles.courseTitle}>
                {this.state.userGroups[i].course_title}
              </Text>
              <Text>{this.state.userGroups[i].group_title}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        );
      }
    } else {
      list.push(<Text key="empty_groups">Not in any groups currently.</Text>);
    }
    return list;
  };

  createMessageList = () => {
    let list = [];
    if (this.state.userMessages.length > 0) {
      for (let i = 0; i < this.state.userMessages.length; i++) {
        list.push(
          <ListItem
            key={this.state.userMessages[i].chat_uid}
            onPress={() =>
              this.props.navigation.navigate("PrivateChat", {
                chat_uid: this.state.userMessages[i].chat_uid
              })
            }
          >
            <Body>
              <Text style={styles.courseTitle}>
                {this.state.userMessages[i].other_user}
              </Text>
              <Text>{this.state.userMessages[i].last_text}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        );
      }
    } else {
      list.push(<Text key="emptymessages">No private messages.</Text>);
    }
    return list;
  };

  isLoading() {
    if (this.state.loadingGroups) {
      return (
        <View>
          <Spinner color="blue" />
        </View>
      );
    } else {
      <View>
        <List>{this.createList()}</List>
      </View>;
    }
  }

  render() {
    if (this.state.loadingGroups) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Header
            hasTabs
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
          <Tabs>
            <Tab
              tabStyle={{ backgroundColor: "#333333" }}
              activeTabStyle={{ backgroundColor: "#333333" }}
              activeTextStyle={{ color: "white" }}
              heading="Group Chatrooms"
            >
              <View>
                <Spinner color="blue" />
              </View>
            </Tab>
            <Tab
              tabStyle={{ backgroundColor: "#333333" }}
              activeTabStyle={{ backgroundColor: "#333333" }}
              activeTextStyle={{ color: "white" }}
              heading="Direct Messages"
            />
          </Tabs>
        </KeyboardAvoidingView>
      );
    }

    // console.log(this.state.userGroups);
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header
          hasTabs
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
        <Tabs>
          <Tab
            tabStyle={{ backgroundColor: "#333333" }}
            activeTabStyle={{ backgroundColor: "#333333" }}
            activeTextStyle={{ color: "white" }}
            heading="Group Chatrooms"
          >
            <View>
              <List>{this.createList()}</List>
            </View>
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: "#333333" }}
            activeTabStyle={{ backgroundColor: "#333333" }}
            activeTextStyle={{ color: "white" }}
            heading="Direct Messages"
          >
            <View>{this.createMessageList()}</View>
          </Tab>
        </Tabs>
      </KeyboardAvoidingView>
    );
  }
}

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  courseTitle: {
    fontWeight: "bold"
  }
});
