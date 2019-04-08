import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import {
  Header,
  Left,
  Body,
  Title,
  Right,
  Button,
  Toast,
  Content
} from "native-base";
import * as firebase from "firebase";

class SettingsScreen extends React.Component {
  signOutUser = async () => {
    await firebase
      .auth()
      .signOut()
      .then(
        () => {
          Toast.show({
            text: "You succesfully logged out"
          });
          this.props.navigation.navigate("Login");
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isPending:false
    };
  }

  componentDidMount() {
    const ref = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid);
    ref.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      this.setState({userLevel: items.userLevel})
      newState.push({
        id: firebase.auth().currentUser.uid,
        firstName: items.firstName,
        lastName: items.lastName,
      });
      this.setState({
        items: newState
      });
    });
    const ref1 = firebase
            .database()
            .ref("TeacherReq/pending/");
        ref1.on("value", snapshot => {
            if (snapshot.exists()) {
            let items = snapshot.val();
            var objectKeys = Object.keys(items);
            console.log(objectKeys);
            for (i = 0; i < objectKeys.length; i++) {
                if (objectKeys[i] == firebase.auth().currentUser.uid) {
                this.setState({
                    isPending: true
                });
                }
            }
            }
        });
  }

  accountType= () => { 
    let content = [];
    if(this.state.userLevel == 1){
    content.push(<Title>Student Account</Title>);
    if (this.state.isPending == true) {
    content.push( 
                 <Button
                  light
                  disabled
                   key="disabledrequest"
                  onPress={() => this.props.navigation.navigate("BeTeacherReq")}
                  style={{ padding: "10%", alignSelf: "center" }}
                  >
                  <Text> awaiting approval from admin </Text>
                  </Button> );
    }
    else{
      content.push( 
                   <Button
                    light
                    key="request"
                    onPress={() => this.props.navigation.navigate("BeTeacherReq")}
                    style={{ padding: "10%", alignSelf: "center" }}
                    >
                    <Text> Request Teacher Priveledges </Text>
                    </Button> );
    }
    return content;
    }
    else if(this.state.userLevel == 2){
      content.push(<Title>Teacher Account</Title>);
      return content;
    }
    else{
      content.push(<Title>Admin Account</Title>);
      return content;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          iosBarStyle={"light-content"}
          style={{ backgroundColor: "#333333" }}
        >
          <Left />
          <Body>
            <Title style={{ color: "white" }}>Profile</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {this.state.items.map(item => {
              return (
                <View key={item.id}>
                  <Title>{item.firstName}</Title>
                  <Title>{item.lastName}</Title>
                </View>
              );
            })}
            {this.accountType()}
            <Button
              light
              onPress={this.signOutUser}
              style={{ padding: "10%", alignSelf: "center" }}
            >
              <Text> Sign Out </Text>
            </Button>
            
          </View>
        </Content>
      </View>
    );
  }
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
