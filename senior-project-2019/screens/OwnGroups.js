import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import {
  Header,
  Button,
  Left,
  Body,
  Title,
  Right,
  Card,
  CardItem,
  Icon,
  Content
} from "native-base";
import * as firebase from 'firebase';

class OwnGroups extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header iosBarStyle={"light-content"} style={{ backgroundColor: "#333333" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ padding: 10, color: "white"}}
                onPress={() => this.props.navigation.navigate("Classes")}
              />
            </Button>
          </Left>
          <Body><Title style={{color:"white"}}>My Groups</Title></Body>
          <Right>
            <Button transparent dark>
              <Icon name="add" style={{color:"white"}}/>
            </Button>
          </Right>
        </Header>
        <Content padder style={{backgroundColor:"#F8F8F8"}}>
        <View>
          <Card>
            <CardItem header bordered>
              <Text>Group 1</Text>
            </CardItem>
            <CardItem button bordered onPress={() => this.props.navigation.navigate("Chat")}>
              <Body>
                <Text># of members: 15</Text>
              </Body>
            </CardItem>
          </Card>
          <Button transparent light onPress={() => console.log(category)} style = {{padding: '10%', alignSelf: 'center'}}>
              <Text> Test </Text>
            </Button>
          </View>
        </Content>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'Unavailable');
    const course_id = navigation.getParam('course_id', 'Unavailable');
    const category = navigation.getParam('category', 'Unavailable');
    console.log(category)
    const ref = firebase.database().ref('Courses/' + category + '/' + title + '/Groups');
    ref.on("value", snapshot => {
      if (snapshot.exists()) {
        let items = snapshot.val();
        let newState = [];
        console.log(items)
        var objectKeys = Object.keys(items);
        // for (i = 0; i < objectKeys.length; i++) {
        //   let data = {};
        //   data[objectKeys[i]] = {
        //         id: items[objectKeys[i]].course_id,
        //         title: items[objectKeys[i]].course_title,
        //         category: items[objectKeys[i]].category
        //   }
        //   newState.push(data)
        // }
        // this.setState({
        //   items: newState
        // });
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
  }
}

export default OwnGroups;

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });