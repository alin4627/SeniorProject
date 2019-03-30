import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Header,
  List,
  ListItem,
  Button,
  Left,
  Body,
  Title,
  Right,
  Content,
  Text,
  Icon
} from "native-base";
import * as firebase from "firebase";

class ClassScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "Unavailable");
    const course_id = navigation.getParam("course_id", "Unavailable");
    const category = navigation.getParam("category", "Unavailable");
    return (
      <View behavior="padding" style={styles.container}>
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
            <Title style={{ color: "white" }}>{course_id}</Title>
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
        <Content
          padder
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
          style={{ backgroundColor: "#F8F8F8" }}
        >
          <List>
            <ListItem itemHeader first>
              <Text>Groups</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate('OwnGroups', { title: title, course_id: course_id, category: category })} >
                <Left>
                    <Text>My Groups</Text>
                </Left>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>
            <ListItem last>
                <Left>
                    <Text>Open Groups</Text>
                </Left>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>
            <ListItem itemHeader>
              <Text>Roster</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate('RosterList', { title: title, course_id: course_id, category: category })}>
                <Left>
                    <Text>View Course Roster</Text>
                </Left>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>
          </List>
        </Content>
      </View>
    );
  }
}

export default ClassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: "center"
  },
  textHeaders: {
    padding: 20
  }
});
