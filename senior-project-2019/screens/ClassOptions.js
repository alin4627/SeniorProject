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
        <Header transparent style={{ backgroundColor: "#F8F8F8" }}>
          <Left>
            <Button
              transparent
              dark
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" style={{ padding: 5}} />
              <Text>My Courses</Text>
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content
          padder
          style={{ backgroundColor: "#F8F8F8" }}
        >
        <View style={styles.classHeader}>
          <View style={styles.classHeader}>
            <Text style={styles.classLabel}>Class Name</Text>
            <Text style={styles.classNameHeader}>{title}</Text>
          </View>
          <View style={styles.classHeader}>
            <Text style={styles.classLabel}>Course ID</Text>
          <Text style={styles.classIDHeader}>{course_id}</Text>
          </View>
        </View>
          <List>
            <ListItem itemHeader first>
              <Icon name="chatboxes" style={{paddingRight: 10}}/>
              <Text style={styles.categoryHeader}>GROUPS</Text>
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
              <Icon name="contacts" style={{paddingRight: 10}}/>
              <Text style={styles.categoryHeader}>ROSTER</Text>
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
  classHeader: {
    padding: 5
  },
  classLabel: {
    fontSize: 15,
    color: "#A8A8A8"
  },
  classNameHeader: {
    fontSize: 30, 
    fontWeight:"bold"
  },
  classIDHeader: {
    fontSize: 25, 
    fontWeight:"bold"
  },
  center: {
    alignItems: "center"
  },
  categoryHeader: {
    fontWeight: "bold"
  }
});
