import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import {
  Header,
  ListItem,
  List,
  Button,
  Left,
  Body,
  Title,
  Right,
  Content,
  Icon
} from "native-base";
import * as firebase from "firebase";
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      request: [],
      userLevel: 1,
      classes: [],
      userGroups: []
    };
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.getUserClasses();
        const ref = firebase
          .database()
          .ref("users/" + firebase.auth().currentUser.uid);
        ref.once("value", snapshot => {
          let items = snapshot.val();
          this.setState({ userLevel: items.userLevel });
        });
        setTimeout(
          function() {
            this.fetchUserGroups();
          }.bind(this),
          200
        );
      }
    );
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  generateState() {
    const ref1 = firebase.database().ref("TeacherReq/pending/"); //ref to all teacher request
    ref1.once(
      "value",
      function(snapshot) {
        let newState = [];
        snapshot.forEach(function(child) {
          let data = {};
          data.id = child.key;
          data.Reasons = child.val().Reasons;
          data.displayName = child.val().displayName;
          data.expertise = child.val().expertise;
          newState.push(data);
        });
        this.setState({ request: newState });
      }.bind(this)
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

  upgradeYes(uid, displayName, expertise, reasons) {
    firebase
      .database()
      .ref("users/" + uid)
      .update({ userLevel: 2 }); // set userLevel to 2
    firebase
      .database()
      .ref("TeacherReq/approved/" + uid) //add request to approved in case abused and open for review in db
      .set({
        Reasons: reasons,
        displayName: displayName,
        expertise: expertise,
        approvedBy:
          firebase.auth().currentUser.displayName +
          " " +
          firebase.auth().currentUser.uid
      });
    firebase
      .database()
      .ref("TeacherReq/pending/" + uid)
      .remove(); //deletes pending request
    this.generateState(); //refreshes list and ui
    //alert('Yes');
  }

  upgradeNo(uid) {
    firebase
      .database()
      .ref("TeacherReq/pending/" + uid)
      .remove(); //deletes pending request
    this.generateState();
  }

  generateContent = () => {
    if (this.state.userLevel == 0) {
      //user is a admin
      this.generateState();
      if (this.state.request.length > 0) {
        let list = [];
        let listitems = [];
        listitems.push(
          <ListItem key="header">
            <Text style={styles.categoryHeader}>Requests to be a Teacher</Text>
          </ListItem>
        );
        for (let i = 0; i < this.state.request.length; i++) {
          listitems.push(
            <ListItem key={this.state.request[i].id}>
              <Left>
                <Text style={styles.listText}>
                  {this.state.request[i].displayName}
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
                          "You are about to give teacher priveledges to user",
                          [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed!")
                            },
                            {
                              text: "OK",
                              onPress: () =>
                                this.upgradeYes(
                                  this.state.request[i].id,
                                  this.state.request[i].displayName,
                                  this.state.request[i].expertise,
                                  this.state.request[i].Reasons
                                )
                              //confirmed to add student upgrade
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
                          "You are about to decline the teacher priveledges to user",
                          [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed!")
                            },
                            {
                              text: "OK",
                              onPress: () =>
                                this.upgradeNo(this.state.request[i].id)
                              //confirmed to decline student upgrade
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
          listitems.push(
            <ListItem key="reason">
              <Text style={styles.listText}>
                Expertise: {this.state.request[i].expertise} {"\n"}Reason:
                {this.state.request[i].Reasons}
              </Text>
            </ListItem>
          );
        }
        list.push(<List key={"Request"}>{listitems}</List>);
        return list;
      } else {
        let list = [];
        let listitems = [];
        listitems.push(
          <ListItem key="requests">
            <Text style={styles.listText}>Requests to be a Teacher</Text>
          </ListItem>
        );
        listitems.push(
          <ListItem key="no-requests">
            <Text style={styles.listText}>No Requests</Text>
          </ListItem>
        );
        list.push(<List key={"Request"}>{listitems}</List>);
        return list;
      }
    }
  };

  generateGroups() {
    let content = [];
    // console.log(this.state.classes);
    // console.log(this.state.userGroups);
    if (this.state.userGroups.length > 0) {
      let course = this.state.userGroups[0].course_title;
      content.push(
        <ListItem itemHeader first key={course}>
          <Text style={styles.classNameHeader}>{course}</Text>
        </ListItem>
      );
      for (i = 0; i < this.state.userGroups.length; i++) {
        if (this.state.userGroups[i].course_title == course) {
          let groupTitle = this.state.userGroups[i].group_title;
          let groupCategory = this.state.userGroups[i].category;
          content.push(
            <ListItem
              key={this.state.userGroups[i].group_title}
              onPress={() =>
                this.props.navigation.navigate("GroupOptionScreen", {
                  course_title: course,
                  group_title: groupTitle,
                  category: groupCategory
                })
              }
            >
              <Left>
                <Text>{this.state.userGroups[i].group_title}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          );
        } else {
          course = this.state.userGroups[i].course_title;
          content.push(
            <ListItem itemHeader first key={course}>
              <Text style={styles.classNameHeader}>{course}</Text>
            </ListItem>
          );
        }
      }
    }
    return content;
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header
          iosBarStyle={"light-content"}
          style={{ backgroundColor: "#333333" }}
        >
          <Left />
          <Body>
            <Title style={{ color: "white" }}>Home</Title>
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
        <Content padder style={{ backgroundColor: "#F8F8F8" }}>
          <View style={styles.classHeader}>
            <View style={styles.classHeader}>
              <Text style={styles.classLabel}>Welcome</Text>
              <Text style={styles.nameHeader}>
                {firebase.auth().currentUser.displayName}
              </Text>
            </View>
          </View>
          {this.generateContent()}
          {this.generateGroups()}
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: 35,
    margin: 10,
    marginBottom: 0,
    width: 300,
    fontSize: 16
  },
  classHeader: {
    padding: 5
  },
  classLabel: {
    fontSize: 15,
    color: "#A8A8A8"
  },
  nameHeader: {
    fontSize: 30,
    fontWeight: "bold"
  },
  classNameHeader: {
    fontSize: 20,
    fontWeight: "bold"
  },
  classIDHeader: {
    fontSize: 25,
    fontWeight: "bold"
  },
  center: {
    alignItems: "center"
  },
  categoryHeader: {
    fontWeight: "bold",
    fontSize: 20
  }
});
