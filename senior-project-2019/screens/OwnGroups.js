import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import {
  Header,
  Button,
  Left,
  Body,
  Form,
  Title,
  Item,
  Label,
  Input,
  Picker,
  Right,
  Card,
  CardItem,
  Icon,
  Content
} from "native-base";
import * as firebase from "firebase";

class OwnGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      course_id: "",
      category: "",
      items: []
    };
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header transparent style={{ backgroundColor: "#F8F8F8" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ padding: 10 }}
                onPress={() => this.props.navigation.navigate("Classes")}
              />
            </Button>
          </Left>
          <Body>
            <Title>My Groups</Title>
          </Body>
          <Right>
            <Button
              transparent
              dark
              onPress={() =>
                this.props.navigation.navigate("OpenGroupsScreen", {
                  title: this.state.title,
                  course_id: this.state.course_id,
                  category: this.state.category
                })
              }
            >
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Content padder style={{ backgroundColor: "#F8F8F8" }}>
          <View>{this.createCard()}</View>
        </Content>
      </KeyboardAvoidingView>
    );
  }

  fetchData() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "Unavailable");
    const course_id = navigation.getParam("course_id", "Unavailable");
    const category = navigation.getParam("category", "Unavailable");
    this.setState({
      title: title,
      course_id: course_id,
      category: category
    });
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
            items: newState
          });
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  createCard = () => {
    let card = [];
    for (let i = 0; i < this.state.items.length; i++) {
      card.push(
        <Card key={this.state.items[i].group_title}>
          <CardItem
            button
            onPress={() =>
              this.props.navigation.navigate("ChatroomScreen", {
                course_title: this.state.items[i].course_title,
                group_title: this.state.items[i].group_title,
                category: this.state.items[i].category
              })
            }
          >
            <Body>
              <Text style={styles.cardHeader}>
                {this.state.items[i].group_title}
              </Text>
              <Text style={styles.cardItem}>
                # of members: {this.state.items[i].users_length}
              </Text>
            </Body>
          </CardItem>
        </Card>
      );
    }
    return card;
  };
}

export default OwnGroups;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    width: "80%"
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5
  },
  cardItem: {
    fontSize: 19,
    padding: 5
  },
  item: {
    padding: 15
  }
});
