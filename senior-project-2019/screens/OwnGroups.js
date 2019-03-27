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
      items: [],
      modalVisible: false,
      selected: "key0",
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
      firebase
        .database()
        .ref(
          "Courses/" +
            category +
            "/" +
            title +
            "/Groups/" +
            this.state.groupName +
            "/users/" +
            firebase.auth().currentUser.uid
        )
        .set({
          userName: firebase.auth().currentUser.displayName,
          userLevel: 0
        });
      this.fetchData();
      this.setGroupName();
      this.setModalVisible(false);
    } else {
      Alert.alert("Invalid group name. Please enter a different group name.");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header
          iosBarStyle={"light-content"}
          style={{ backgroundColor: "#333333" }}
        >
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ padding: 10, color: "white" }}
                onPress={() => this.props.navigation.navigate("Classes")}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>My Groups</Title>
          </Body>
          <Right>
            <Button
              transparent
              dark
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Icon name="add" style={{ color: "white" }} />
            </Button>
          </Right>
        </Header>
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
                      <Picker.Item label="Public" value="key0" />
                      <Picker.Item label="Private" value="key1" />
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
    const { navigation } = this.props;
    const title = navigation.getParam("title", "Unavailable");
    const course_id = navigation.getParam("course_id", "Unavailable");
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
          <CardItem header bordered>
            <Text>{this.state.items[i].group_title}</Text>
          </CardItem>
          <CardItem
            button
            bordered
            onPress={() =>
              this.props.navigation.navigate("Chat", {
                course_title: this.state.items[i].course_title,
                group_title: this.state.items[i].group_title,
                category: this.state.items[i].category
              })
            }
          >
            <Body>
              <Text># of members: {this.state.items[i].users_length}</Text>
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
  item: {
    padding: 15
  }
});
