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
import * as firebase from "firebase";

class ClassesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    const userLevelref = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid);
      userLevelref.on("value", snapshot => {
      let items = snapshot.val(); // userLevel 
      this.setState({ userLevel: items.userLevel });
      if (items.userLevel == 0 ){ // if user is a admin saves list of all courses
        const ref = firebase.database().ref("Courses/");
        ref.on("value", snapshot => {
        let items = snapshot.val();
        let newState = [];
       var objectKeys = Object.keys(items);
        for (i = 0; i < objectKeys.length; i++) {
          let data = {};
          
          for (let item in items[objectKeys[i]]) {
            data[item] = {
              id: items[objectKeys[i]][item].course_id,
              title: items[objectKeys[i]][item].course_title,
              category: objectKeys[i]
            };
          }
          newState.push(data);
        }
        this.setState({
          items: newState
        });
      });
      }
      else{ // if user isn't a admin it generates a list of courses they are subed to
        const ref = firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid + "/classSubscriptions/");
        ref.on(
        "value",
        snapshot => {
          if (snapshot.exists()) {
            let items = snapshot.val();
            let newState = [];
            // console.log(items)
            var objectKeys = Object.keys(items);
            for (i = 0; i < objectKeys.length; i++) {
              let data = {};
              data[objectKeys[i]] = {
                id: items[objectKeys[i]].course_id,
                title: items[objectKeys[i]].course_title,
                category: items[objectKeys[i]].category
              };
              newState.push(data);
            }
            this.setState({
              items: newState
            });
          }
        },
        function(errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
      }
    })

    
  }

  createList = () => {
    if (this.state.items.length > 0) {
      let list = [];
      let listitems = [];
      for (let i = 0; i < this.state.items.length; i++) {
        for (let item in this.state.items[i]) {
          if( item.id != "keys")
          {listitems.push(
            <ListItem
              key={this.state.items[i][item].id}
              onPress={() =>
                this.props.navigation.navigate("ClassOptions", {
                  title: this.state.items[i][item].title,
                  course_id: this.state.items[i][item].id,
                  category: this.state.items[i][item].category
                })
              }
            >
              <Left>
                <Text>{this.state.items[i][item].title}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          );}
        }
      }
      list.push(<List key={"SubClasses"}>{listitems}</List>);
      return list;
    } else {
      let content = [];
      content.push(
        <View key={"emptyList"} style={styles.content}>
          <Text>No classes subscribed. Please add a class</Text>
        </View>
      );
      return content;
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header
          iosBarStyle={"light-content"}
          style={{ backgroundColor: "#333333" }}
        >
          <Left />
          <Body>
            <Title style={{ color: "white" }}>My Courses</Title>
          </Body>
          <Right>
            <Button
              transparent
              dark
              onPress={() => this.props.navigation.navigate("ClassesSelection")}
            >
              <Icon name="add" style={{ color: "white" }} />
            </Button>
          </Right>
        </Header>
        <Content>{this.createList()}</Content>
      </KeyboardAvoidingView>
    );
  }
}

export default ClassesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: "center"
  },
  content: {
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    width: "90%"
  }
});
