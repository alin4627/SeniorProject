import React from "react";
import {
  StyleSheet,
  Clipboard,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import {
  Header,
  Button,
  Left,
  ActionSheet,
  Body,
  Title,
  Right,
  Icon
} from "native-base";
import PropTypes from "prop-types";
import SlackMessage from "../components/SlackMessage";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from "firebase";

var BUTTONS = ["Copy Text ", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

class PrivateChat extends React.Component {
  static navigationOptions = {
    tabBarVisible: false
  };
  state = {
    messages: [],
    clicked: "none",
    users: []
  };

  componentDidMount() {
    const { navigation } = this.props;
    const chat_uid = navigation.getParam("chat_uid", "Unavailable");
    this.fetchUsers();
    const ref = firebase
      .database()
      .ref("Messages/" + chat_uid + "/user_messages/")
      .orderByChild("createdAt");
    ref.on(
      "value",
      snapshot => {
        if (snapshot.exists()) {
          let newState = [];
          snapshot.forEach(function(child) {
            let items = child.val();
            newState.push(items);
            // var objectKeys = Object.keys(items);
            // console.log(objectKeys)
            // for (i = 0; i < objectKeys.length; i++) {
            //     newState.push(items[objectKeys[i]])
            // }
          });
          newState.reverse();
          this.setState({
            messages: newState
          });
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

  fetchUsers() {
    const chat_uid = this.props.navigation.getParam("chat_uid", "Unavailable");
    const ref = firebase.database().ref("Messages/" + chat_uid + "/users/");
    ref.once(
      "value",
      snapshot => {
        if (snapshot.exists()) {
          let items = snapshot.val();
          console.log(items);
          var objectKeys = Object.keys(items);
          console.log(objectKeys);
          this.setState({
            users: objectKeys
          });
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

  onSend(messages = []) {
    const { navigation } = this.props;
    const chat_uid = navigation.getParam("chat_uid", "Unavailable");
    const users = navigation.getParam("users", "Unavailable");

    for (i = 0; i < messages.length; i++) {
      console.log(messages[i]);
      firebase
        .database()
        .ref("Messages/" + chat_uid + "/user_messages/" + messages[i]._id)
        .set({
          _id: messages[i]._id,
          createdAt: messages[i].createdAt.toISOString(),
          text: messages[i].text,
          user: messages[i].user
        });

      for (j = 0; j < this.state.users.length; j++) {
        firebase
          .database()
          .ref("users/" + this.state.users[j] + "/userMessages/" + chat_uid)
          .update({
            createdAt: messages[i].createdAt.toISOString(),
            last_message: messages[i].text
          });
      }
    }
  }
  renderMessage(props) {
    const {
      currentMessage: { text: currText }
    } = props;
    let messageTextStyle;

    // // Make "pure emoji" messages much bigger than plain text.
    // if (currText) {
    //   messageTextStyle = {
    //     fontSize: 15,
    //     // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
    //     lineHeight: Platform.OS === 'android' ? 34 : 30,
    //   };
    // }

    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />;
  }

  render() {
    var user = firebase.auth().currentUser;
    var s = "";
    if (user) {
      s = user.displayName;
    } else {
      s = "Not logged In";
    }
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Header style={{ backgroundColor: "#fff" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ padding: 10 }}
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body>
            <Title>Private Chatroom</Title>
          </Body>
          <Right>
            <Button transparent dark>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          onLongPress={(ctx, currentMessage) =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Testing ActionSheet"
              },
              buttonIndex => {
                switch (buttonIndex) {
                  case 0:
                    Clipboard.setString(currentMessage.text);
                    break;
                  case 1:
                    const { navigation } = this.props;
                    const uid = navigation.getParam("uid", "Unavailable");
                    const users = navigation.getParam("users", "Unavailable");
                    const refCheckAdmin = firebase
                      .database()
                      .ref("users/" + firebase.auth().currentUser.uid);
                    isAdmin = false;
                    isGroupMod = false;
                    refCheckAdmin.on("value", snapshot => {
                      let items = snapshot.val();
                      if (items.userLevel == 0) {
                        isAdmin = true;
                      } // check if user is a admin on app userLevel == 0
                    });
                    const refCheckGroupMod = firebase
                      .database()
                      .ref(
                        "users/" +
                          uid +
                          "/User_Chat/" +
                          users +
                          "/users/" +
                          firebase.auth().currentUser.uid
                      );
                    refCheckGroupMod.on("value", snapshot => {
                      let items = snapshot.val();
                      if (items.userLevel == 2) {
                        isGroupMod = true;
                      } // Checks if user is a moderator of the group userLevel == 2
                    });

                    if (isAdmin == true || isGroupMod == true) {
                      //alert('first delete as teacher')
                      firebase
                        .database()
                        .ref(
                          "users/" +
                            uid +
                            "/User_Chat/" +
                            users +
                            "/messages/" +
                            currentMessage._id
                        )
                        .remove();
                      alert(
                        currentMessage.text +
                          " written by " +
                          currentMessage.user.name +
                          " has been deleted"
                      );
                    } else {
                      if (
                        currentMessage.user._id ==
                        firebase.auth().currentUser.uid
                      ) {
                        //alert('2 delete as student')
                        firebase
                          .database()
                          .ref(
                            "users/" +
                              uid +
                              "/User_Chat/" +
                              users +
                              "/messages/" +
                              currentMessage._id
                          )
                          .remove();
                        alert(
                          currentMessage.text +
                            " written by " +
                            currentMessage.user.name +
                            " has been deleted"
                        );
                      } else {
                        alert("Cannot delete other Users Messages");
                      }
                    }
                }
              }
            )
          }
          user={{
            _id: firebase.auth().currentUser.uid,
            name: user.displayName,
            avatar: user.photoURL
          }}
          renderMessage={this.renderMessage}
        />
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
      </KeyboardAvoidingView>
    );
  }
}

export default PrivateChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20
  }
});
