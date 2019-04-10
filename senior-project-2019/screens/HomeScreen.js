import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import {
  
  Header,
  ListItem,
  List,
  Button,
  Left,
  Body,
  Title,
  Right,
  Content,
  Icon
} from "native-base";
import * as firebase from "firebase";
class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      request:[],
    };  
  }
  
  componentDidMount() {
    const ref = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid);
    ref.on("value", snapshot => {
      let items = snapshot.val();
      this.setState({ userLevel: items.userLevel }, function () {this.generateState()});
    })
   
  }
 
  generateState(){
    const ref1 = firebase
    .database()
    .ref("TeacherReq/pending/"); //ref to all teacher request
    ref1.once("value", function(snapshot) {
      let newState = [];
      snapshot.forEach(function(child) {
        let data = {};
        data.id = child.key;
        data.Reasons = child.val().Reasons;
        data.displayName = child.val().displayName;
        data.expertise = child.val().expertise;
        newState.push(data);
      });
      this.setState({ request: newState });
    }.bind(this));
   
  }


  generateContent = () => {

    if(this.state.userLevel == 0 ){ //user is a admin
      if (this.state.request.length > 0) {
        
        let list = [];
        let listitems = [];
        for (let i = 0; i < this.state.request.length; i++) {

            listitems.push(
              <ListItem key={this.state.request[i].id}>
                <Left>
                  <Text style={styles.listText}>
                    { this.state.request[i].displayName}
                  </Text>
                </Left>
                <Right>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.button}>
                      <Button
                        transparent
                        onPress={() =>
                          Alert.alert(
                            "Confirmation",
                            "You are about to accept this student into the course",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed!")
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  alert('okay')
                              }
                            ],
                            { cancelable: false }
                          )
                        }
                      >
                        <Icon
                          name="checkmark"
                          style={{ color: "green", fontSize: 30 }}
                        />
                      </Button>
                    </View>
                    <View style={styles.button}>
                      <Button
                        transparent
                        onPress={() =>
                          Alert.alert(
                            "Confirmation",
                            "You are about to decline the request of this student",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed!")
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                 alert('declined')
                              }
                            ],
                            { cancelable: false }
                          )
                        }
                      >
                        <Icon
                          name="close"
                          style={{ color: "red", fontSize: 30 }}
                        />
                      </Button>
                    </View>
                  </View>
                </Right>
              </ListItem>
            );
          }
          list.push(<List key={"Request"}>{listitems}</List>);
          return list;
        }
      
      }
    }
  

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header
          iosBarStyle={"light-content"}
          style={{ backgroundColor: "#333333" }}
        >
          <Left />
          <Body>
            <Title style={{ color: "white" }}>Home</Title>
          </Body>
          <Right>
            <Button transparent dark>
              <Icon
                ios="md-more"
                android="md-more"
                style={{ color: "white" }}
              />
            </Button>
          </Right>
        </Header>
        <Content padder style={{ backgroundColor: "#F8F8F8" }}>
        {this.generateContent()}
        </Content> 
      </KeyboardAvoidingView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: 35,
    margin: 10,
    marginBottom: 0,
    width: 300,
    fontSize: 16
  }
});
