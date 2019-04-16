import React from "react";
import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Button,
  Icon,
  Right,
  Title,
  Form,
  Item,
  Label,
  Picker,
  Input,
  Tab,
  Tabs
} from "native-base";
import OwnGroups from "./OwnGroups";
import OpenGroups from "./OpenGroups";
import * as firebase from "firebase";

class GroupTabs extends React.Component {
  constructor(props) {
    super(props);
    // const { navigation } = this.props;
    const title = props.navigation.getParam("title", "Unavailable");
    const course_id = props.navigation.getParam("course_id", "Unavailable");
    const category = props.navigation.getParam("category", "Unavailable");
    this.state = {
      userLevel: 1,
      title: title,
      course_id: course_id,
      category: category,
      userGroups: [],
      openGroups: [],
      invites: [],
      modalVisible: false,
      selected: "open",
      groupName: ""
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  setGroupName() {
    this.setState({
      groupName: ""
    });
  }

  createGroup = () => {
    if (this.state.groupName != "" && this.state.groupName.length > 1) {
      const { navigation } = this.props;
      const title = navigation.getParam("title", "Unavailable");
      const category = navigation.getParam("category", "Unavailable");
      let userData = {};
      userData[firebase.auth().currentUser.uid] = {
        userName: firebase.auth().currentUser.displayName,
        userLevel: 2
      };
      firebase
        .database()
        .ref(
          "Courses/" +
            category +
            "/" +
            title +
            "/Groups/" +
            this.state.groupName
        )
        .set({
          privacy: this.state.selected,
          users: userData
        });
      this.setGroupName();
      this.setModalVisible(false);
      this.fetchUserGroups();
    } else {
      Alert.alert("Invalid group name. Please enter a different group name.");
    }
  };

  fetchUserGroups() {
    // const { navigation } = this.props;
    // const title = navigation.getParam("title", "Unavailable");
    // const category = navigation.getParam("category", "Unavailable");
    const ref = firebase
      .database()
      .ref(
        "Courses/" + this.state.category + "/" + this.state.title + "/Groups"
      );
    ref.once(
      "value",
      snapshot => {
        if (snapshot.exists()) {
          let items = snapshot.val();
          let newState = [];
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
              course_title: this.state.title,
              group_title: objectKeys[i],
              users_length: Object.keys(items[objectKeys[i]].users).length,
              category: this.state.category
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

  fetchOpenGroups() {
    // const { navigation } = this.props;
    // const title = navigation.getParam("title", "Unavailable");
    // const category = navigation.getParam("category", "Unavailable");
    const ref = firebase
      .database()
      .ref(
        "Courses/" + this.state.category + "/" + this.state.title + "/Groups"
      );
    ref.once(
      "value",
      snapshot => {
        if (snapshot.exists()) {
          let items = snapshot.val();
          let newState = [];
          var objectKeys = Object.keys(items);
          for (i = 0; i < objectKeys.length; i++) {
            let open = false;
            let subbed = false;
            let userList = Object.keys(items[objectKeys[i]].users);
            if (items[objectKeys[i]].privacy == "open") {
              open = true;
            }
            for (j = 0; j < userList.length; j++) {
              if (userList[j] == firebase.auth().currentUser.uid) {
                subbed = true;
              }
            }
            let data = {
              course_title: this.state.title,
              group_title: objectKeys[i],
              users_length: Object.keys(items[objectKeys[i]].users).length,
              category: this.state.category
            };
            if (open && !subbed) {
              newState.push(data);
            }
          }
          this.setState({
            openGroups: newState
          });
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

  fetchInvites() {
    // const { navigation } = this.props;
    // const title = navigation.getParam("title", "Unavailable");
    // const category = navigation.getParam("category", "Unavailable");
    const ref = firebase
      .database()
      .ref(
        "Courses/" + this.state.category + "/" + this.state.title + "/Groups"
      );
    ref.once(
      "value",
      snapshot => {
        if (snapshot.exists()) {
          let items = snapshot.val();
          var objectKeys = Object.keys(items);
          let newState = [];
          for (i = 0; i < objectKeys.length; i++) {
            try {
              let invited = false;
              let userList = Object.keys(items[objectKeys[i]].invited);
              for (j = 0; j < userList.length; j++) {
                if (userList[j] == firebase.auth().currentUser.uid) {
                  invited = true;
                }
              }
              let data = {
                course_title: this.state.title,
                group_title: objectKeys[i],
                users_length: Object.keys(items[objectKeys[i]].users).length,
                category: this.state.category
              };
              if (invited) {
                newState.push(data);
              }
            } catch (err) {
              console.log("No invited members");
            }
          }
          this.setState({
            invites: newState
          });
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      () => {
        const ref = firebase
          .database()
          .ref("users/" + firebase.auth().currentUser.uid);
        ref.once("value", snapshot => {
          let items = snapshot.val();
          this.setState({ userLevel: items.userLevel }, function() {
            this.fetchUserGroups();
            this.fetchOpenGroups();
            this.fetchInvites();
          });
        });
      }
    );
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  render() {
    return (
      <Container>
        <Header
          hasTabs
          iosBarStyle={"light-content"}
          style={{ backgroundColor: "#333333" }}
        >
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ color: "white", padding: 10 }}
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>Groups</Title>
          </Body>
          <Right>
            <Button
              transparent
              dark
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Icon name="add" style={{ color: "white" }} />
            </Button>
          </Right>
        </Header>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Header transparent style={{ backgroundColor: "#F8F8F8" }}>
            <Left>
              <Button transparent dark>
                <Icon
                  name="close"
                  style={{ padding: 10 }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                />
              </Button>
            </Left>
          </Header>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F8F8F8"
            }}
          >
            <Title style={{ color: "black" }}>Create a Group</Title>
            <Form style={styles.form}>
              <Item floatingLabel style={styles.item}>
                <Label>Name of Group</Label>
                <Input
                  onChangeText={groupName => this.setState({ groupName })}
                  value={this.state.groupName}
                />
              </Item>
              <Item picker style={styles.item}>
                <Label>Group Privacy</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Public" value="open" />
                  <Picker.Item label="Private" value="private" />
                </Picker>
              </Item>
              <View style={{ marginTop: 15 }}>
                <Button
                  onPress={() => this.createGroup()}
                  style={{
                    padding: "10%",
                    alignSelf: "center",
                    color: "#7e7b7b"
                  }}
                >
                  <Text style={{ color: "white" }}> Create Group </Text>
                </Button>
              </View>
            </Form>
          </View>
        </Modal>
        <Tabs>
          <Tab
            tabStyle={{ backgroundColor: "#333333" }}
            activeTabStyle={{ backgroundColor: "#333333" }}
            activeTextStyle={{ color: "white" }}
            heading="My Groups"
          >
            <OwnGroups
              title={this.state.title}
              course_id={this.state.course_id}
              category={this.state.category}
              navigation={this.props.navigation}
              items={this.state.userGroups}
              invites={this.state.invites}
            />
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: "#333333" }}
            activeTabStyle={{ backgroundColor: "#333333" }}
            activeTextStyle={{ color: "white" }}
            heading="Open Groups"
          >
            <OpenGroups
              title={this.state.title}
              course_id={this.state.course_id}
              category={this.state.category}
              navigation={this.props.navigation}
              items={this.state.openGroups}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default GroupTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    width: "80%"
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5
  },
  cardItem: {
    fontSize: 19,
    padding: 5
  },
  item: {
    padding: 15
  }
});
