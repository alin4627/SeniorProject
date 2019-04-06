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
        {/* <Header transparent style={{ backgroundColor: "#F8F8F8" }}>
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
          <Right />
        </Header> */}
        <Content padder style={{ backgroundColor: "#F8F8F8" }}>
          <View>{this.createCard()}</View>
        </Content>
      </KeyboardAvoidingView>
    );
  }

  fetchData() {
    // const { navigation } = this.props;
    // const title = navigation.getParam("title", "Unavailable");
    // const course_id = navigation.getParam("course_id", "Unavailable");
    // const category = navigation.getParam("category", "Unavailable");
    // const title = this.props.title
    // const course_id = this.props.course_id;
    // const category = this.props.category;
    const ref = firebase
      .database()
      .ref("Courses/" + this.props.category + "/" + this.props.title + "/Groups");
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
              course_title: this.props.title,
              group_title: objectKeys[i],
              users_length: Object.keys(items[objectKeys[i]].users).length,
              category: this.props.category
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
    console.log(this.props.category)
    this.fetchData();
  }

  createCard = () => {
    let card = [];
    if (this.props.items.length > 0) {
      for (let i = 0; i < this.props.items.length; i++) {
        card.push(
          <Card key={this.props.items[i].group_title}>
            <CardItem
              button
              onPress={() =>
                this.props.navigation.navigate("GroupOptionScreen", {
                  course_title: this.props.items[i].course_title,
                  group_title: this.props.items[i].group_title,
                  category: this.props.items[i].category
                })
              }
            >
              <Body>
                <Text style={styles.cardHeader}>
                  {this.props.items[i].group_title}
                </Text>
                <Text style={styles.cardItem}>
                  # of members: {this.props.items[i].users_length}
                </Text>
              </Body>
            </CardItem>
          </Card>
        );
      }
    } else {
      card.push(
        <View key="nogroupstext">
          <Text>You currently are not in any groups! Make sure to join any open ones.</Text>
        </View>
      )
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
