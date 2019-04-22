import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import {
  Header,
  Button,
  Left,
  Body,
  Form,
  Title,
  Item,
  Label,
  Input,
  Textarea,
  Right,
  Icon,
  Content
} from "native-base";
import * as firebase from "firebase";

class BeTeacherReq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      study: "",
      text: ""
    };
  }

  createReq() {
    firebase
      .database()
      .ref("TeacherReq/pending/" + firebase.auth().currentUser.uid)
      .set({
        displayName: firebase.auth().currentUser.displayName,
        expertise: this.state.study,
        Reasons: this.state.text
      });
    this.props.navigation.navigate("Settings");
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header
          iosBarStyle={"light-content"}
          style={{ backgroundColor: "#333333" }}
        >
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ padding: 10, color: "white" }}
                onPress={() => this.props.navigation.navigate("Settings")}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>Request</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={{ backgroundColor: "#F8F8F8" }}>
          <Form style={styles.form}>
            <Item floatingLabel style={styles.item}>
              <Label>Area of Expertise</Label>
              <Input
                onChangeText={study => this.setState({ study })}
                value={this.state.study}
              />
            </Item>

            <Textarea
              rowSpan={5}
              placeholder="Reason for Teacher privileges"
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />

            <Button
              onPress={() => this.createReq()}
              style={{
                padding: "10%",
                alignSelf: "center",
                color: "#7e7b7b"
              }}
            >
              <Text style={{ color: "white" }}> Submit Request </Text>
            </Button>
          </Form>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

export default BeTeacherReq;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    width: "80%"
  },
  item: {
    padding: 15
  }
});
