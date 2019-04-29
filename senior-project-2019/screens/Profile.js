import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import {
  Header,
  Button,
  Left,
  Body,
  Title,
  Right,
  Thumbnail,
  Icon,
  Content
} from "native-base";
import * as firebase from "firebase";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      userName: ""
    };
  }

  makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  componentDidMount() {
    const { navigation } = this.props;
    const uid = navigation.getParam("userID", "Unavailable");
    const userName = navigation.getParam("userName", "Unavailable");
    this.setState({
      uid: uid,
      userName: userName
    });
  }

  makeChat() {
    let messagesID = this.makeid(25);
    console.log(messagesID);
    firebase
      .database()
      .ref(
        "users/" +
          firebase.auth().currentUser.uid +
          "/userMessages/" +
          messagesID
      )
      .set({
        other_user_uid: this.state.uid,
        other_user_username: this.state.userName
      });
    firebase
      .database()
      .ref("users/" + this.state.uid + "/userMessages/" + messagesID)
      .set({
        other_user_uid: firebase.auth().currentUser.uid,
        other_user_username: firebase.auth().currentUser.displayName
      });
    firebase
      .database()
      .ref(
        "Messages/" + messagesID + "/users/" + firebase.auth().currentUser.uid
      )
      .set({
        userName: firebase.auth().currentUser.displayName
      });
    firebase
      .database()
      .ref("Messages/" + messagesID + "/users/" + this.state.uid)
      .set({
        userName: this.state.userName
      });
    this.props.navigation.navigate("PrivateChat", {
      chat_uid: messagesID
    });
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
          let foundChat = false;
          // console.log(items);
          console.log("Found messages");
          var objectKeys = Object.keys(items);
          // console.log(objectKeys);
          for (i = 0; i < objectKeys.length; i++) {
            // console.log(items[objectKeys[i]]);
            console.log(items[objectKeys[i]].other_user_uid);
            if (items[objectKeys[i]].other_user_uid == this.state.uid) {
              foundChat = true;
              this.props.navigation.navigate("PrivateChat", {
                chat_uid: objectKeys[i]
              });
            }
          }
          if (!foundChat) {
            this.makeChat();
          }
        } else {
          this.makeChat();
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

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
            <Title style={{ color: "white" }}>Profile</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Thumbnail
              large
              style={styles.userPic}
              source={{
                uri:
                  "https://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/0-fs5ztag0_600x400.jpg"
              }}
            />
            <Text style={styles.userNameHeader}>{this.state.userName}</Text>
            <Button
              style={{ padding: "10%", alignSelf: "center" }}
              onPress={() => this.checkUserChat()}
            >
              <Text style={{ color: "white" }}> Message User </Text>
            </Button>
          </View>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  classHeader: {
    padding: 5
  },
  userPic: {
    padding: 10
  },
  userNameHeader: {
    padding: 10,
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
