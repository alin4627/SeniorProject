import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
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
import * as firebase from 'firebase';

class RosterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "Unavailable");
    const category = navigation.getParam("category", "Unavailable");
    const ref = firebase.database().ref("Courses/" +category + "/" + title + "/users/");
    ref.on("value", snapshot => {
      if (snapshot.exists()) {
        let items = snapshot.val();
        let newState = [];
        console.log(items)
        var objectKeys = Object.keys(items);
        console.log(objectKeys)
        for (i = 0; i < objectKeys.length; i++) {
          let data = {}
          data[objectKeys[i]] = {
            userID: objectKeys[i],
            userName: items[objectKeys[i]].userName
          }
          newState.push(data)
        }
        this.setState({
          items: newState
        });
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
  }

  createList = () => {
    if(this.state.items.length > 0) {
      let list = []
      let listitems = []
      for (let i = 0; i < this.state.items.length; i++) {
        for (let item in this.state.items[i])
        {
          listitems.push(
            <ListItem key={this.state.items[i][item].userID}>
              <Left>
                <Text>{this.state.items[i][item].userName}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          )
        }
      }
      list.push(<List key={'Roster'}>{listitems}</List>)
      return list
    }
    else{
      let content = []
      content.push(
        <View key={'emptyList'} style={styles.content}>
          <Text>No one is registered in this course</Text>
        </View>
      )
      return content
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header iosBarStyle={"light-content"} style={{ backgroundColor: "#333333" }}>
          <Left>
          <Button
              transparent
              dark
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" style={{ padding: 10, color: "white" }} />
            </Button>
          </Left>
          <Body><Title style={{color: "white" }}>Course Roster</Title></Body>
          <Right />
        </Header>
        <Content>
            {this.createList()}
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

export default RosterList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: "center", 
  },
  content: {
    alignItems: "center",
    justifyContent: "center"
  }
});
