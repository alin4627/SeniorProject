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
class ClassScreen extends React.Component {
  state = {
    text: ""
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header iosBarStyle={"light-content"} style={{ backgroundColor: "#333333" }}>
          <Left>
            <Button transparent dark onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-back"
                style={{ padding: 10, color: "white" }}
              />
            </Button>
          </Left>
          <Body><Title style={{color: "white" }}>Class</Title></Body>
          <Right>
            <Button transparent dark>
              <Icon ios='md-more' android="md-more" style={{ color: "white" }} />
            </Button>
          </Right>
        </Header>
        <Content padder style={{backgroundColor:"#F8F8F8"}}>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

export default ClassScreen;

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
