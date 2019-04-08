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

class ClassCreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      modalVisible: false,
      major: "",
      courseName: "",
      courseId: "",

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

  componentDidMount() {
    const ref = firebase.database().ref("Courses/");
    ref.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      var objectKeys = Object.keys(items);
      for (i = 0; i < objectKeys.length; i++) {
        let data = {};
        data.id = objectKeys[i];
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

  createPicks = () => {
    let list = [];
    list.push(
        <Picker.Item label='New Major' value={"New Major"} />    
    )
    for (let i = 0; i < this.state.items.length; i++) {
      list.push(
        <Picker.Item label={this.state.items[i].id} value={this.state.items[i].id} />    
      );
    }
    return list;
  }


    clearState(){
        this.state.major="" ;
        this.state.courseName="" ;
        this.state.courseId = "";
        this.setModalVisible(false);
    }

  createCourse = () => {
    if (this.state.major!="" && this.state.courseName !=""  && this.state.courseId != "") {
        firebase
          .database()
          .ref(
            "Courses/" +
              this.state.major +
              "/" +
              this.state.courseName
          )
          .set({ course_id: this.state.courseId , course_title: this.state.courseName ,
            professor: firebase.auth().currentUser.displayName
          });// checks if all info is filled out before creating the course and information
        firebase
          .database()
          .ref(
            "Courses/" +
              this.state.major +
              "/" +
              this.state.courseName+
              "/" +
              "/Groups/Default Group/users/" +
              firebase.auth().currentUser.uid
              )
           .set({
              userName: firebase.auth().currentUser.displayName,
              userLevel: 2
            })//adds creator to default group with user level 2 

        firebase
            .database()
            .ref(
              "users/" +
                firebase.auth().currentUser.uid +
                "/classSubscriptions/" +
                this.state.courseName
            )
            .set({
              category: this.state.major,
              course_title: this.state.courseName,
              course_id: this.state.courseId
            });// puts course in User info allowing connection

        this.clearState();
        this.props.navigation.navigate("Classes")
      } else {
        Alert.alert("Info missing, Please fill in all information");
      }
    
  };

  checkMajor = () => {
      if(this.state.major == "New Major"){
        this.setModalVisible(true);
      }
      else{this.createCourse()}
  }

  onValueChange(value) {
    this.setState({
      major: value
    });
  }

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
            <Title style={{ color: "white" }}>Create Course</Title>
          </Body>
          <Right/>
        </Header>
        <Content padder style={{ backgroundColor: "#F8F8F8" }}>
        <Form style={styles.form}>
                  <Item floatingLabel style={styles.item}>
                    <Label>Name of Course</Label>
                    <Input
                      onChangeText={courseName => this.setState({ courseName })}
                      value={this.state.courseName}
                    />
                  </Item>
                  <Item floatingLabel style={styles.item}>
                    <Label>Course Id</Label>
                    <Input
                      onChangeText={courseId => this.setState({ courseId })}
                      value={this.state.courseId}
                    />
                  </Item>
                  <Item picker style={styles.item}>
                    <Label>Major</Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      selectedValue={this.state.major}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      {this.createPicks()}
                    </Picker>
                  </Item>

                  <Button
                      onPress={() => this.checkMajor()}
                      style={{
                        padding: "10%",
                        alignSelf: "center",
                        color: "#7e7b7b"
                      }}
                    >
                      <Text style={{ color: "white" }}> Create Course </Text>
                </Button>
        </Form>
   
        <View>
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
                <Title style={{ color: "black" }}>Create a Major</Title>
                <Form style={styles.form}>
                  <Item floatingLabel style={styles.item}>
                    <label>Name of Major</label>
                    <Input
                      onChangeText={major => this.setState({ major })}
                    />
                  </Item>
                  <Button
                      onPress={() => this.createCourse()}
                      style={{
                        padding: "10%",
                        alignSelf: "center",
                        color: "#7e7b7b"
                      }}
                    >
                      <Text style={{ color: "white" }}> Create Major </Text>
                </Button>
        </Form>
              </View>
            </Modal>
          </View>
        </Content>
      </KeyboardAvoidingView>
    );
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

export default ClassCreateScreen;

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