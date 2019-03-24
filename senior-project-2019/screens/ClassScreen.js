import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import {
  Header,
  H2,
  Button,
  Left,
  Body,
  Title,
  Right,
  Content,
  Text,
  Icon
} from "native-base";
import * as firebase from 'firebase';

class ClassScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'Unavailable');
    const course_id = navigation.getParam('course_id', 'Unavailable');
    const category = navigation.getParam('category', 'Unavailable');
    return (
      <View behavior="padding" style={styles.container}>
        <Header iosBarStyle={"light-content"} style={{ backgroundColor: "#333333" }}>
          <Left>
            <Button transparent dark onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-back"
                style={{ padding: 10, color: "white" }}
              />
            </Button>
          </Left>
          <Body><Title style={{color: "white" }}>{course_id}</Title></Body>
          <Right>
            <Button transparent dark>
              <Icon ios='md-more' android="md-more" style={{ color: "white" }} />
            </Button>
          </Right>
        </Header>
        <Content padder contentContainerStyle={{ justifyContent: 'center', flex: 1 }} style={{backgroundColor:"#F8F8F8"}}>
            <View style={styles.center}>
                <H2 style={styles.textHeaders}>Name: {title}</H2>
                <H2 style={styles.textHeaders}>Course ID: {course_id}</H2>
                <Text style={styles.textHeaders}>View past students</Text>
                <View style={styles.textHeaders}>
                    <Button style={{alignSelf: "center" }} onPress={() => this.addClass(title, course_id, category)}>
                        <Text>Request Access</Text>
                    </Button>
                </View>
            </View>
        </Content>
      </View>
    );
  }

  addClass(title, course_id, category) {
    firebase.database()
      .ref(
        'users/' + firebase.auth().currentUser.uid +
          "/classSubscriptions/" +
          title
      )
      .set({
        category: category,
        course_title: title,
        course_id: course_id
      });
  }
}

export default ClassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: "center", 
  },
  textHeaders: {
      padding: 20
  }
});
