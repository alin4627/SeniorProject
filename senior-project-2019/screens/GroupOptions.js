import React from "react";
import { StyleSheet, View } from "react-native";
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
      isAdmin: ""
    };
  }

  componentDidMount() {
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
    ref.on("value", snapshot => {
      let items = snapshot.val();
      var objectKeys = Object.keys(items);
      for (i = 0; i < objectKeys.length; i++) {
        if (items[objectKeys[i]] == firebase.auth().currentUser.uid) {
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

  createRosterCategory() {
    let content = [];
    if (this.state.isAdmin == false) {
      content.push(
        <View key="nonStudentRoster">
          <ListItem
            onPress={() =>
              this.props.navigation.navigate("RosterList", {
                title: this.state.title,
                course_id: this.state.course_id,
                category: this.state.category,
                status: "current"
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
          <ListItem
            onPress={() =>
              this.props.navigation.navigate("RosterList", {
                title: this.state.title,
                course_id: this.state.course_id,
                category: this.state.category,
                status: "pending"
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
        </View>
      );
    } else {
      content.push(
        <ListItem
          key="rosterList"
          onPress={() =>
            this.props.navigation.navigate("RosterList", {
              title: this.state.title,
              course_id: this.state.course_id,
              category: this.state.category
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
    return content;
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
            <ListItem>
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
            <ListItem>
              <Left>
                <Text>Group Settings</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
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
