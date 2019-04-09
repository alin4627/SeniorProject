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

class InvitedGroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course_title: "",
      category: "",
      items: [],
      status: ""
    };
  }

  joinGroup(group_title) {
    firebase
      .database()
      .ref(
        "Courses/" +
          this.state.category +
          "/" +
          this.state.course_title +
          "/Groups/" +
          group_title +
          "/users/" +
          firebase.auth().currentUser.uid
      )
      .set({
        userName: firebase.auth().currentUser.displayName,
        userLevel: 1
      });
    const ref = firebase
      .database()
      .ref(
        "Courses/" +
          this.state.category +
          "/" +
          this.state.course_title +
          "/Groups/" +
          group_title +
          "/invited/" +
          firebase.auth().currentUser.uid
      );
    ref.remove();
    this.props.navigation.navigate("GroupTabs");
  }

  confirmationAccept(group_title) {
    Alert.alert(
      "Confirmation",
      "You are about to accept the invite to join this group.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed!")
        },
        {
          text: "Accept",
          onPress: () => this.joinGroup(group_title)
        }
      ],
      { cancelable: false }
    );
  }

  confirmationReject(group_title) {
    Alert.alert(
      "Confirmation",
      "You are about to reject the invite to join this group.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed!")
        },
        {
          text: "Reject",
          onPress: () => this.rejectGroup(group_title)
        }
      ],
      { cancelable: false }
    );
  }

  rejectGroup(group_title) {
    const ref = firebase
      .database()
      .ref(
        "Courses/" +
          this.state.category +
          "/" +
          this.state.course_title +
          "/Groups/" +
          group_title +
          "/invited/" +
          firebase.auth().currentUser.uid
      );
    ref.remove();
    this.props.navigation.navigate("GroupTabs");
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
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body>
            <Title>Invited Groups</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={{ backgroundColor: "#F8F8F8" }}>
          <View>{this.createCard()}</View>
        </Content>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
    const { navigation } = this.props;
    const items = navigation.getParam("items", "Unavailable");
    const status = navigation.getParam("status", "Unavailable");
    const category = navigation.getParam("category", "Unavailable");
    const course_title = navigation.getParam("course_title", "Unavailable");
    this.setState({
      items: items,
      status: status,
      category: category,
      course_title: course_title
    });
  }

  createCard = () => {
    let card = [];
    console.log(this.state.course_title);
    if (this.state.items.length > 0) {
      for (let i = 0; i < this.state.items.length; i++) {
        if (this.state.status == "invite") {
          card.push(
            <Card key={this.state.items[i].group_title}>
              <CardItem>
                <Body>
                  <Text style={styles.cardHeader}>
                    {this.state.items[i].group_title}
                  </Text>
                  <Text style={styles.cardItem}>
                    # of members: {this.state.items[i].users_length}
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer bordered style={styles.center}>
                <View style={styles.item}>
                  <Button
                    bordered
                    success
                    style={styles.button}
                    onPress={() =>
                      this.confirmationAccept(this.state.items[i].group_title)
                    }
                  >
                    <Text>ACCEPT</Text>
                  </Button>
                </View>
                <View style={styles.item}>
                  <Button
                    bordered
                    danger
                    style={styles.button}
                    onPress={() =>
                      this.confirmationReject(this.state.items[i].group_title)
                    }
                  >
                    <Text>REJECT</Text>
                  </Button>
                </View>
              </CardItem>
            </Card>
          );
        }
      }
    }

    return card;
  };
}

export default InvitedGroupList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    padding: 10
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
    paddingLeft: 15,
    paddingRight: 15
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  }
});
