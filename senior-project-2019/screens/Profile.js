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
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
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
          console.log(items)
          console.log('Found messages')
          // this.props.navigation.navigate("PrivateChat", {
          //   uid: this.state.uid,
          //   userName: this.state.userName
          // });
        } else {
          let messagesID = this.makeid(25);
          console.log(messagesID)
          firebase
          .database()
          .ref("users/" + firebase.auth().currentUser.uid + "/userMessages/" + messagesID)
          .set({
            other_user_uid: this.state.uid
          });
          firebase
          .database()
          .ref("Messages/" + messagesID + "/users/")
          .set({
            other_user_uid: this.state.uid
          });
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
              onPress={() =>
                this.checkUserChat()
              }
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
