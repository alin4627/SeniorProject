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

class ClassesScreen extends React.Component {
  state = {
    text: ""
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header style={{ backgroundColor: "#fff" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="menu"
                style={{ padding: 10 }}
                onPress={() => this.props.navigation.openDrawer()}
              />
            </Button>
          </Left>
          <Body><Title>My Courses</Title></Body>
          <Right>
            <Button transparent dark>
              <Icon name="add" onPress={() => this.props.navigation.navigate("ClassesSelection")} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem onPress={() => this.props.navigation.navigate("Groups")}>
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

export default ClassesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
