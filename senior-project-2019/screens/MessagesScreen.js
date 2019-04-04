import React from "react";
import {
  StyleSheet,
  Text,
  View,
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
  List,
  ListItem,
  Thumbnail,
  Icon,
  Content
} from "native-base";

class MessagesScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header
          iosBarStyle={"light-content"}
          style={{ backgroundColor: "#333333" }}
        >
          <Left />
          <Body>
            <Title style={{ color: "white" }}>Messages</Title>
          </Body>
          <Right>
            <Button
              transparent
              dark
              onPress={() =>
                this.props.navigation.navigate("RosterList", {
                  source: "all"
                })
              }
            >
              <Icon name="add" style={{ color: "white" }} />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail
                  small
                  source={{
                    uri:
                      "https://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/0-fs5ztag0_600x400.jpg"
                  }}
                />
              </Left>
              <Body>
                <Text>Student 1</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
