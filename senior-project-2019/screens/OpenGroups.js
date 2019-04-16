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

class OpenGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course_title: "",
      category: "",
      items: [],
      modalVisible: false,
      selected: "open",
      groupName: ""
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  setGroupName() {
    this.setState({
      groupName: ""
    });
  }

  createGroup = () => {
    if (this.state.groupName != "" && this.state.groupName.length > 1) {
      const { navigation } = this.props;
      const title = navigation.getParam("title", "Unavailable");
      const category = navigation.getParam("category", "Unavailable");
      let userData = {};
      userData[firebase.auth().currentUser.uid] = {
        userName: firebase.auth().currentUser.displayName,
        userLevel: 2
      };
      console.log(userData);
      firebase
        .database()
        .ref(
          "Courses/" +
            category +
            "/" +
            title +
            "/Groups/" +
            this.state.groupName
        )
        .set({
          privacy: this.state.selected,
          users: userData
        });
      this.fetchData();
      this.setGroupName();
      this.setModalVisible(false);
    } else {
      Alert.alert("Invalid group name. Please enter a different group name.");
    }
  };

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
    this.props.navigation.navigate("GroupOptionScreen", {
      course_title: this.state.course_title,
      group_title: group_title,
      category: this.state.category
    });
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
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body>
            <Title>Open Groups</Title>
          </Body>
          <Right>
            <Button
              transparent
              dark
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Icon name="add" />
            </Button>
          </Right>
        </Header> */}
        <Content padder style={{ backgroundColor: "#F8F8F8" }}>
          <View>
            {this.createCard()}
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
            >
              <Header transparent style={{ backgroundColor: "#F8F8F8" }}>
                <Left>
                  <Button transparent dark>
                    <Icon
                      name="arrow-back"
                      style={{ padding: 10 }}
                      onPress={() => {
                        this.setModalVisible(false);
                      }}
                    />
                  </Button>
                </Left>
              </Header>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F8F8F8"
                }}
              >
                <Title style={{ color: "black" }}>Create a Group</Title>
                <Form style={styles.form}>
                  <Item floatingLabel style={styles.item}>
                    <Label>Name of Group</Label>
                    <Input
                      onChangeText={groupName => this.setState({ groupName })}
                      value={this.state.groupName}
                    />
                  </Item>
                  <Item picker style={styles.item}>
                    <Label>Group Privacy</Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      <Picker.Item label="Public" value="open" />
                      <Picker.Item label="Private" value="private" />
                    </Picker>
                  </Item>
                  <View style={{ marginTop: 15 }}>
                    <Button
                      onPress={() => this.createGroup()}
                      style={{
                        padding: "10%",
                        alignSelf: "center",
                        color: "#7e7b7b"
                      }}
                    >
                      <Text style={{ color: "white" }}> Create Group </Text>
                    </Button>
                  </View>
                </Form>
              </View>
            </Modal>
          </View>
        </Content>
      </KeyboardAvoidingView>
    );
  }

  fetchData() {
    // const { navigation } = this.props;
    // const title = navigation.getParam("title", "Unavailable");
    // const course_id = navigation.getParam("course_id", "Unavailable");
    // const category = navigation.getParam("category", "Unavailable");
    const title = this.props.title;
    const course_id = this.props.course_id;
    const category = this.props.category;
    this.setState({
      course_title: title,
      category: category
    });
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
    if (this.state.items.length > 0) {
      for (let i = 0; i < this.state.items.length; i++) {
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
            <CardItem
              footer
              bordered
              button
              onPress={() =>
                Alert.alert(
                  "Confirmation",
                  "You are about to join this group.",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed!")
                    },
                    {
                      text: "OK",
                      onPress: () =>
                        this.joinGroup(this.state.items[i].group_title)
                    }
                  ],
                  { cancelable: false }
                )
              }
            >
              <Text style={styles.cardItem}>Join</Text>
            </CardItem>
          </Card>
        );
      }
    } else {
      card.push(
        <View key="nogroupstext">
          <Text>No open groups currently</Text>
        </View>
      );
    }

    return card;
  };
}

export default OpenGroups;

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
