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
      userLevel: 1
    };
  }

  componentDidMount() {
    const ref = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid);
    ref.once("value", snapshot => {
      let items = snapshot.val();
      this.setState({ userLevel: items.userLevel }, function() {
        this.generateState();
      });
    });
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
      if (this.state.request.length > 0) {
        let list = [];
        let listitems = [];
        listitems.push(
          <ListItem key="header">
            <Text style={styles.listText}>Requests to be a Teacher</Text>
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
            <ListItem>
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
          <ListItem key="header">
            <Text style={styles.listText}>Requests to be a Teacher</Text>
          </ListItem>
        );
        listitems.push(
          <ListItem key="header">
            <Text style={styles.listText}>No Requests</Text>
          </ListItem>
        );
        list.push(<List key={"Request"}>{listitems}</List>);
        return list;
      }
    }
  };

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
              <Text style={styles.classNameHeader}>
                {firebase.auth().currentUser.displayName}
              </Text>
            </View>
          </View>
          {this.generateContent()}
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
