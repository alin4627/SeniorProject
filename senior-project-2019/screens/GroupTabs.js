import React, { Component } from 'react';
import { Container, Header, Left, Body, Button, Icon, Right, Title, Tab, Tabs } from 'native-base';
import OwnGroups from "./OwnGroups"
import OpenGroups from "./OpenGroups"
import * as firebase from "firebase";

class GroupTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          title: "",
          course_id: "",
          category: "",
          userGroups: [],
          openGroups: []
        };
      }

    fetchUserGroups() {
        const { navigation } = this.props;
        const title = navigation.getParam("title", "Unavailable");
        const category = navigation.getParam("category", "Unavailable");
        const ref = firebase
          .database()
          .ref("Courses/" + category + "/" + title + "/Groups");
        ref.once(
          "value",
          snapshot => {
            if (snapshot.exists()) {
              let items = snapshot.val();
              let newState = [];
              var objectKeys = Object.keys(items);
              for (i = 0; i < objectKeys.length; i++) {
                let subbed = false;
                let userList = Object.keys(items[objectKeys[i]].users);
                for (j = 0; j < userList.length; j++) {
                  if (userList[j] == firebase.auth().currentUser.uid) {
                    subbed = true;
                  }
                }
                let data = {
                  course_title: title,
                  group_title: objectKeys[i],
                  users_length: Object.keys(items[objectKeys[i]].users).length,
                  category: category
                };
                if (subbed) {
                  newState.push(data);
                }
              }
              this.setState({
                userGroups: newState
              });
            }
          },
          function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
      }

      fetchOpenGroups() {
        const { navigation } = this.props;
        const title = navigation.getParam("title", "Unavailable");
        const category = navigation.getParam("category", "Unavailable");
        const ref = firebase
          .database()
          .ref("Courses/" + category + "/" + title + "/Groups");
        ref.on(
          "value",
          snapshot => {
            if (snapshot.exists()) {
              let items = snapshot.val();
              let newState = [];
              var objectKeys = Object.keys(items);
              for (i = 0; i < objectKeys.length; i++) {
                let open = false;
                let subbed = false;
                let userList = Object.keys(items[objectKeys[i]].users);
                if (items[objectKeys[i]].privacy == "open") {
                  open = true;
                }
                for (j = 0; j < userList.length; j++) {
                  if (userList[j] == firebase.auth().currentUser.uid) {
                    subbed = true;
                  }
                }
                let data = {
                  course_title: title,
                  group_title: objectKeys[i],
                  users_length: Object.keys(items[objectKeys[i]].users).length,
                  category: category
                };
                if (open && !subbed) {
                  newState.push(data);
                }
              }
              this.setState({
                openGroups: newState
              });
            }
          },
          function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
      }
      
    componentDidMount() {
        const { navigation } = this.props;
        const title = navigation.getParam("title", "Unavailable");
        const course_id = navigation.getParam("course_id", "Unavailable");
        const category = navigation.getParam("category", "Unavailable");
        this.setState({
            title: title,
            course_id: course_id,
            category: category
        });
        this.fetchUserGroups();
        this.fetchOpenGroups();
      }

    render() {
        return (
        <Container>
            <Header hasTabs style={{ backgroundColor: "#F8F8F8" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ padding: 10 }}
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body>
            <Title>Groups</Title>
          </Body>
          <Right />
        </Header>
            <Tabs>
            <Tab heading="My Groups">
                <OwnGroups title={this.state.title} course_id={this.state.course_id} category={this.state.category} navigation={this.props.navigation} items={this.state.userGroups}/>
            </Tab>
            <Tab heading="Open Groups">
                <OpenGroups title={this.state.title} course_id={this.state.course_id} category={this.state.category} navigation={this.props.navigation} items={this.state.openGroups}/>
            </Tab>
            </Tabs>
        </Container>
        );
    }
}

export default GroupTabs;