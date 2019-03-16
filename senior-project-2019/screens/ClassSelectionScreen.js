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
  List,
  ListItem,
  Icon
} from "native-base";
import { NavigationActions } from "react-navigation";

class ClassesSelectionScreen extends React.Component {
  state = {
    text: ""
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header iosBarStyle={"light-content"} style={{ backgroundColor: "#333333" }}>
          <Left>
            <Button transparent dark>
            <Icon
                name="arrow-back"
                style={{ padding: 10, color:"white" }}
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body><Title style={{color:"white"}}>All Courses</Title></Body>
          <Right />
        </Header>
        <Content>
          <List>
            <ListItem onPress={() => this.props.navigation.navigate("")}>
              <Left>
                <Text>Theory Computation (CSCI 610)</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Senior Project (CSCI 455)</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Artificial Intelligence 1 (CSCI 355)</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

export default ClassesSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
