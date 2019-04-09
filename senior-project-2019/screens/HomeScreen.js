import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
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
  Icon
} from "native-base";
import * as firebase from "firebase";
class HomeScreen extends React.Component {
  state = {
    text: ""
  };

  componentDidMount() {
    const ref = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid);
    ref.on("value", snapshot => {
      let items = snapshot.val();
      this.setState({ userLevel: items.userLevel });
    })
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
  }
});
