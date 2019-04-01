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

class ClassScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      course_id: "",
      category: "",
      isStudent: ""
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
      .ref("users/" + firebase.auth().currentUser.uid);
    ref.on("value", snapshot => {
      let items = snapshot.val();
      if (items.userLevel != 1) {
        this.setState({
          isStudent: false
        });
      } else {
        this.setState({
          isStudent: true
        });
      }
    });
  }

  createRosterCategory() {
    console.log(this.state.isStudent);
    let content = [];
    if (this.state.isStudent == false) {
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
              <Text>View Course Roster</Text>
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
              <Text>View Requested Students</Text>
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
            <Text>View Course Roster</Text>
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
              <Text>My Courses</Text>
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content padder style={{ backgroundColor: "#F8F8F8" }}>
          <View style={styles.classHeader}>
            <View style={styles.classHeader}>
              <Text style={styles.classLabel}>Class Name</Text>
              <Text style={styles.classNameHeader}>{this.state.title}</Text>
            </View>
            <View style={styles.classHeader}>
              <Text style={styles.classLabel}>Course ID</Text>
              <Text style={styles.classIDHeader}>{this.state.course_id}</Text>
            </View>
          </View>
          <List>
            <ListItem itemHeader first>
              <Icon name="chatboxes" style={{ paddingRight: 10 }} />
              <Text style={styles.categoryHeader}>GROUPS</Text>
            </ListItem>
            <ListItem
              onPress={() =>
                this.props.navigation.navigate("OwnGroups", {
                  title: this.state.title,
                  course_id: this.state.course_id,
                  category: this.state.category
                })
              }
            >
              <Left>
                <Text>My Groups</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem last>
              <Left>
                <Text>Open Groups</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem itemHeader>
              <Icon name="contacts" style={{ paddingRight: 10 }} />
              <Text style={styles.categoryHeader}>ROSTER</Text>
            </ListItem>
            {this.createRosterCategory()}
          </List>
        </Content>
      </View>
    );
  }
}

export default ClassScreen;

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
