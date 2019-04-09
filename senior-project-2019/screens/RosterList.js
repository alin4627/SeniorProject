import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
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

class RosterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      course_id: "",
      category: "",
      group_title: "",
      status: "",
      source: "",
      items: []
    };
  }

  addClass(uid, displayName) {
    firebase
      .database()
      .ref("users/" + uid + "/classSubscriptions/" + this.state.title)
      .set({
        category: this.state.category,
        course_title: this.state.title,
        course_id: this.state.course_id
      });
    firebase
      .database()
      .ref(
        "Courses/" +
          this.state.category +
          "/" +
          this.state.title +
          "/users/approved/" +
          uid
      )
      .set({
        userName: displayName
      });
    firebase
      .database()
      .ref(
        "Courses/" +
          this.state.category +
          "/" +
          this.state.title +
          "/Groups/Default Group/users/" +
          uid
      )
      .set({
        userName: displayName,
        userLevel: 1
      });
    const ref = firebase
      .database()
      .ref(
        "Courses/" +
          this.state.category +
          "/" +
          this.state.title +
          "/users/pending/" +
          uid
      );
    ref.remove();
    this.fetchData();
  }

  removeRequest(uid) {
    const ref = firebase
      .database()
      .ref(
        "Courses/" +
          this.state.category +
          "/" +
          this.state.title +
          "/users/pending/" +
          uid
      );
    ref.remove();
    this.fetchData();
  }

  sendInvite(uid, username) {
    firebase
      .database()
      .ref(
        "Courses/" +
          this.state.category +
          "/" +
          this.state.title +
          "/Groups/" +
          this.state.group_title +
          "/invited/" +
          uid
      )
      .set({
        userName: username,
        userLevel: 1
      });
  }

  fetchData() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "Unavailable");
    const group_title = navigation.getParam("group_title", "Unavailable");
    const category = navigation.getParam("category", "Unavailable");
    const course_id = navigation.getParam("course_id", "Unavailable");
    const status = navigation.getParam("status", "Unavailable");
    const source = navigation.getParam("source", "Unavailable");
    const groupUsers = navigation.getParam("groupUsers", []);
    this.setState({
      title: title,
      course_id: course_id,
      category: category,
      group_title: group_title,
      source: source
    });
    if (source == "class") {
      if (status == "pending") {
        this.setState({
          status: "pending"
        });
        const ref = firebase
          .database()
          .ref("Courses/" + category + "/" + title + "/users/pending");
        ref.on(
          "value",
          snapshot => {
            if (snapshot.exists()) {
              let items = snapshot.val();
              let newState = [];
              var objectKeys = Object.keys(items);
              for (i = 0; i < objectKeys.length; i++) {
                let data = {};
                data[objectKeys[i]] = {
                  userID: objectKeys[i],
                  userName: items[objectKeys[i]].userName
                };
                newState.push(data);
              }
              this.setState({
                items: newState
              });
            }
          },
          function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
      } else {
        const ref = firebase
          .database()
          .ref("Courses/" + category + "/" + title + "/users/approved/");
        ref.on(
          "value",
          snapshot => {
            if (snapshot.exists()) {
              let items = snapshot.val();
              let newState = [];
              var objectKeys = Object.keys(items);
              for (i = 0; i < objectKeys.length; i++) {
                if (objectKeys[i] != firebase.auth().currentUser.uid) {
                  let data = {};
                  data[objectKeys[i]] = {
                    userID: objectKeys[i],
                    userName: items[objectKeys[i]].userName
                  };
                  newState.push(data);
                }
              }
              this.setState({
                items: newState
              });
            }
          },
          function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
      }
    } else if (source == "group") {
      if (status == "pending") {
        this.setState({
          status: "pending"
        });
        const ref = firebase
          .database()
          .ref(
            "Courses/" +
              category +
              "/" +
              title +
              "/Groups/" +
              group_title +
              "/pending"
          );
        ref.on(
          "value",
          snapshot => {
            if (snapshot.exists()) {
              let items = snapshot.val();
              let newState = [];
              var objectKeys = Object.keys(items);
              for (i = 0; i < objectKeys.length; i++) {
                let data = {};
                data[objectKeys[i]] = {
                  userID: objectKeys[i],
                  userName: items[objectKeys[i]].userName
                };
                newState.push(data);
              }
              this.setState({
                items: newState
              });
            }
          },
          function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
      } else {
        const ref = firebase
          .database()
          .ref(
            "Courses/" +
              category +
              "/" +
              title +
              "/Groups/" +
              group_title +
              "/users/"
          );
        ref.on(
          "value",
          snapshot => {
            if (snapshot.exists()) {
              let items = snapshot.val();
              let newState = [];
              var objectKeys = Object.keys(items);
              for (i = 0; i < objectKeys.length; i++) {
                if (objectKeys[i] != firebase.auth().currentUser.uid) {
                  let data = {};
                  data[objectKeys[i]] = {
                    userID: objectKeys[i],
                    userName: items[objectKeys[i]].userName
                  };
                  newState.push(data);
                }
              }
              this.setState({
                items: newState
              });
            }
          },
          function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
      }
    } else if (source == "all") {
      const ref = firebase.database().ref("users/");
      ref.on(
        "value",
        snapshot => {
          if (snapshot.exists()) {
            let items = snapshot.val();
            let newState = [];
            var objectKeys = Object.keys(items);
            for (i = 0; i < objectKeys.length; i++) {
              if (objectKeys[i] != firebase.auth().currentUser.uid) {
                let data = {};
                data[objectKeys[i]] = {
                  userID: objectKeys[i],
                  userName:
                    items[objectKeys[i]].firstName +
                    " " +
                    items[objectKeys[i]].lastName
                };
                newState.push(data);
              }
            }
            this.setState({
              items: newState
            });
          }
        },
        function(errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
    } else if (source == "invite") {
      const ref = firebase
        .database()
        .ref("Courses/" + category + "/" + title + "/users/approved/");
      ref.on(
        "value",
        snapshot => {
          if (snapshot.exists()) {
            let items = snapshot.val();
            let newState = [];
            var objectKeys = Object.keys(items);
            for (i = 0; i < objectKeys.length; i++) {
              if (!groupUsers.includes(objectKeys[i])) {
                let data = {};
                data[objectKeys[i]] = {
                  userID: objectKeys[i],
                  userName: items[objectKeys[i]].userName
                };
                newState.push(data);
              }
            }
            this.setState({
              items: newState
            });
          }
        },
        function(errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  createList = () => {
    if (this.state.items.length > 0) {
      let list = [];
      let listitems = [];
      for (let i = 0; i < this.state.items.length; i++) {
        for (let item in this.state.items[i]) {
          if (this.state.source == "invite") {
            listitems.push(
              <ListItem key={this.state.items[i][item].userID}>
                <Left>
                  <Text style={styles.listText}>
                    {this.state.items[i][item].userName}
                  </Text>
                </Left>
                <Right>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.button}>
                      <Button
                        transparent
                        onPress={() =>
                          Alert.alert(
                            "Confirmation",
                            "You are about to invite this student into the group",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed!")
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  this.sendInvite(
                                    this.state.items[i][item].userID,
                                    this.state.items[i][item].userName
                                  )
                              }
                            ],
                            { cancelable: false }
                          )
                        }
                      >
                        <Icon name="add" style={{ fontSize: 30 }} />
                      </Button>
                    </View>
                  </View>
                </Right>
              </ListItem>
            );
          } else if (this.state.status == "pending") {
            listitems.push(
              <ListItem key={this.state.items[i][item].userID}>
                <Left>
                  <Text style={styles.listText}>
                    {this.state.items[i][item].userName}
                  </Text>
                </Left>
                <Right>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.button}>
                      <Button
                        transparent
                        onPress={() =>
                          Alert.alert(
                            "Confirmation",
                            "You are about to accept this student into the course",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed!")
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  this.addClass(
                                    this.state.items[i][item].userID,
                                    this.state.items[i][item].userName
                                  )
                              }
                            ],
                            { cancelable: false }
                          )
                        }
                      >
                        <Icon
                          name="checkmark"
                          style={{ color: "green", fontSize: 30 }}
                        />
                      </Button>
                    </View>
                    <View style={styles.button}>
                      <Button
                        transparent
                        onPress={() =>
                          Alert.alert(
                            "Confirmation",
                            "You are about to decline the request of this student",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed!")
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  this.removeRequest(
                                    this.state.items[i][item].userID
                                  )
                              }
                            ],
                            { cancelable: false }
                          )
                        }
                      >
                        <Icon
                          name="close"
                          style={{ color: "red", fontSize: 30 }}
                        />
                      </Button>
                    </View>
                  </View>
                </Right>
              </ListItem>
            );
          } else {
            listitems.push(
              <ListItem
                key={this.state.items[i][item].userID}
                onPress={() =>
                  this.props.navigation.navigate("ProfileScreen", {
                    userID: this.state.items[i][item].userID,
                    userName: this.state.items[i][item].userName
                  })
                }
              >
                <Left>
                  <Text style={styles.listText}>
                    {this.state.items[i][item].userName}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            );
          }
        }
      }
      list.push(<List key={"Roster"}>{listitems}</List>);
      return list;
    } else {
      let content = [];
      if (this.state.status == "pending") {
        content.push(
          <View key={"emptyList"} style={styles.content}>
            <Text>There are no pending students</Text>
          </View>
        );
      } else {
        content.push(
          <View key={"emptyList"} style={styles.content}>
            <Text>No one is registered in this course</Text>
          </View>
        );
      }
      return content;
    }
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
            <Title style={{ color: "white" }}>Course Roster</Title>
          </Body>
          <Right />
        </Header>
        <Content>{this.createList()}</Content>
      </KeyboardAvoidingView>
    );
  }
}

export default RosterList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: "center"
  },
  content: {
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    paddingLeft: 5,
    paddingRight: 5
  },
  listText: {
    fontSize: 20,
    paddingLeft: 5
  }
});
