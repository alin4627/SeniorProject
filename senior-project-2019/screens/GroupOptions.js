import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import {
  Header,
  List,
  ListItem,
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

class GroupOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_title: "",
      course_title: "",
      category: "",
      isAdmin: "",
      privacy: "open",
      groupUsers: [],
      groupPendingUsers: []
    };
  }

  getAdminStatus() {
    const { navigation } = this.props;
    const group_title = navigation.getParam("group_title", "Unavailable");
    const course_title = navigation.getParam("course_title", "Unavailable");
    const category = navigation.getParam("category", "Unavailable");
    this.setState({
      group_title: group_title,
      course_title: course_title,
      category: category
    });
    const ref = firebase
      .database()
      .ref(
        "Courses/" +
          category +
          "/" +
          course_title +
          "/Groups/" +
          group_title +
          "/users"
      );
    ref.once("value", snapshot => {
      let items = snapshot.val();
      var objectKeys = Object.keys(items);
      for (i = 0; i < objectKeys.length; i++) {
        if (objectKeys[i] == firebase.auth().currentUser.uid) {
          if (items[objectKeys[i]].userLevel == 2) {
            this.setState({
              isAdmin: true
            });
          } else {
            this.setState({
              isAdmin: false
            });
          }
        }
      }
    });
  }

  getGroupPrivacy() {
    const { navigation } = this.props;
    const group_title = navigation.getParam("group_title", "Unavailable");
    const course_title = navigation.getParam("course_title", "Unavailable");
    const category = navigation.getParam("category", "Unavailable");
    const ref = firebase
      .database()
      .ref(
        "Courses/" + category + "/" + course_title + "/Groups/" + group_title
      );
    ref.once("value", snapshot => {
      let items = snapshot.val();
      // console.log(items["privacy"]);
      if (items["privacy"] == "private") {
        this.setState({
          privacy: "private"
        });
      }
    });
  }

  getGroupUsers() {
    const { navigation } = this.props;
    const group_title = navigation.getParam("group_title", "Unavailable");
    const course_title = navigation.getParam("course_title", "Unavailable");
    const category = navigation.getParam("category", "Unavailable");
    const ref = firebase
      .database()
      .ref(
        "Courses/" +
          category +
          "/" +
          course_title +
          "/Groups/" +
          group_title +
          "/users/"
      );
    ref.once("value", snapshot => {
      let items = snapshot.val();
      var objectKeys = Object.keys(items);
      this.setState({
        groupUsers: objectKeys
      });
    });
  }

  getGroupPendingUsers() {
    const { navigation } = this.props;
    const group_title = navigation.getParam("group_title", "Unavailable");
    const course_title = navigation.getParam("course_title", "Unavailable");
    const category = navigation.getParam("category", "Unavailable");
    const ref = firebase
      .database()
      .ref(
        "Courses/" +
          category +
          "/" +
          course_title +
          "/Groups/" +
          group_title +
          "/users/pending"
      );
    ref.once("value", snapshot => {
      if (snapshot.exists()) {
        let items = snapshot.val();
        var objectKeys = Object.keys(items);
        this.setState({
          groupPendingUsers: objectKeys
        });
      }  
    });
  }

  componentDidMount() {
    this.getAdminStatus();
    this.getGroupPrivacy();
    this.getGroupUsers();
    this.getGroupPendingUsers();
  }

  createRequestList() {
    let content = []
    if (this.state.groupPendingUsers.length > 0)
    {
      content.push(
        <ListItem
          key="groupPendingUserList"
          onPress={() =>
            this.props.navigation.navigate("RosterList", {
              group_title: this.state.group_title,
              title: this.state.course_title,
              category: this.state.category,
              status: "pending",
              source: "group"
            })
          }
        >
        <Left>
          <Text>View Pending Members</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem> 
      )
    }
    return content;
  }

  createRosterCategory() {
    let content = [];
    if (this.state.isAdmin == true) {
      content.push(
        <View key="nonStudentRoster">
          <ListItem
            onPress={() =>
              this.props.navigation.navigate("RosterList", {
                group_title: this.state.group_title,
                title: this.state.course_title,
                category: this.state.category,
                status: "current",
                source: "group"
              })
            }
          >
            <Left>
              <Text>View Group Roster</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          {/* <ListItem
            onPress={() =>
              this.props.navigation.navigate("RosterList", {
                group_title: this.state.group_title,
                title: this.state.course_title,
                category: this.state.category,
                status: "pending",
                source: "group"
              })
            }
          >
            <Left>
              <Text>View Pending Members</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem> */}
          {this.createRequestList()}
        </View>
      );
    } else {
      content.push(
        <ListItem
          key="rosterList"
          onPress={() =>
            this.props.navigation.navigate("RosterList", {
              group_title: this.state.title,
              course_id: this.state.course_id,
              category: this.state.category,
              source: "group"
            })
          }
        >
          <Left>
            <Text>View Group Roster</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    }
    if (this.state.isAdmin && this.state.privacy == "private") {
      content.push(
        <ListItem
          key="invite"
          onPress={() =>
            this.props.navigation.navigate("RosterList", {
              title: this.state.course_title,
              course_id: this.state.course_id,
              category: this.state.category,
              groupUsers: this.state.groupUsers,
              group_title: this.state.group_title,
              source: "invite"
            })
          }
        >
          <Left>
            <Text>Invite people</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    }
    return content;
  }

  leaveGroup() {
    let oneUser = false;
    const ref = firebase
      .database()
      .ref(
        "Courses/" +
          this.state.category +
          "/" +
          this.state.course_title +
          "/Groups/" +
          this.state.group_title +
          "/users/"
      );
    ref.once("value", snapshot => {
      let items = snapshot.val();
      var objectKeys = Object.keys(items);
      if (objectKeys.length == 1) {
        oneUser = true;
      }
    });
    if (!oneUser) {
      const ref = firebase
        .database()
        .ref(
          "Courses/" +
            this.state.category +
            "/" +
            this.state.course_title +
            "/Groups/" +
            this.state.group_title +
            "/users/" +
            firebase.auth().currentUser.uid
        );
      ref.remove();
      this.props.navigation.navigate("GroupTabs");
    } else {
      Alert.alert(
        "Warning",
        "You are the only person in this group. Leaving the group will delete it. Are you sure?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed!")
          },
          {
            text: "OK",
            onPress: () => this.removeGroup()
          }
        ],
        { cancelable: false }
      );
    }
  }

  createGroupSettings() {
    let content = []
    if(this.state.isAdmin) {
      content.push(
        <View key="adminGroupSettings">
          <ListItem
              onPress={() =>
                this.props.navigation.navigate("GroupSettings", {
                  group_title: this.state.group_title,
                  course_title: this.state.course_title,
                  category: this.state.category
                })
              }
            >
              <Left>
                <Text>Group Settings</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              onPress={() =>
                Alert.alert(
                  "Confirmation",
                  "You are about to leave this group",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed!")
                    },
                    {
                      text: "OK",
                      onPress: () => this.leaveGroup()
                    }
                  ],
                  { cancelable: false }
                )
              }
            >
              <Left>
                <Text>Leave Group</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
        </View>
      )
    } else {
      content.push(
            <ListItem
              key="normalGroupSettings"
              onPress={() =>
                Alert.alert(
                  "Confirmation",
                  "You are about to leave this group",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed!")
                    },
                    {
                      text: "OK",
                      onPress: () => this.leaveGroup()
                    }
                  ],
                  { cancelable: false }
                )
              }
            >
              <Left>
                <Text>Leave Group</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
      )
    }
    return content;
  }

  removeGroup() {
    const ref = firebase
      .database()
      .ref(
        "Courses/" +
          this.state.category +
          "/" +
          this.state.course_title +
          "/Groups/" +
          this.state.group_title
      );
    ref.remove();
    this.props.navigation.navigate("GroupTabs");
  }

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <Header transparent style={{ backgroundColor: "#F8F8F8" }}>
          <Left>
            <Button
              transparent
              dark
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" style={{ padding: 5 }} />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content padder style={{ backgroundColor: "#F8F8F8" }}>
          <View style={styles.classHeader}>
            <View style={styles.classHeader}>
              <Text style={styles.classLabel}>Group Name</Text>
              <Text style={styles.classNameHeader}>
                {this.state.group_title}
              </Text>
            </View>
          </View>
          <List>
            <ListItem itemHeader first>
              <Icon name="chatboxes" style={{ paddingRight: 10 }} />
              <Text style={styles.categoryHeader}>DISCUSSION</Text>
            </ListItem>
            <ListItem
              onPress={() =>
                this.props.navigation.navigate("ChatroomScreen", {
                  group_title: this.state.group_title,
                  course_title: this.state.course_title,
                  category: this.state.category
                })
              }
            >
              <Left>
                <Text>Chatroom</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem itemHeader first>
              <Icon name="document" style={{ paddingRight: 10 }} />
              <Text style={styles.categoryHeader}>UPLOADS</Text>
            </ListItem>
            <ListItem
              onPress={() => this.props.navigation.navigate("UploadScreen")}
            >
              <Left>
                <Text>Files/Uploads</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem itemHeader first>
              <Icon name="contacts" style={{ paddingRight: 10 }} />
              <Text style={styles.categoryHeader}>ROSTER</Text>
            </ListItem>
            {this.createRosterCategory()}
            <ListItem itemHeader first>
              <Icon name="settings" style={{ paddingRight: 10 }} />
              <Text style={styles.categoryHeader}>SETTINGS</Text>
            </ListItem>
            {this.createGroupSettings()}
          </List>
        </Content>
      </View>
    );
  }
}

export default GroupOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  classHeader: {
    padding: 5
  },
  classLabel: {
    fontSize: 15,
    color: "#A8A8A8"
  },
  classNameHeader: {
    fontSize: 30,
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
    fontWeight: "bold"
  }
});
