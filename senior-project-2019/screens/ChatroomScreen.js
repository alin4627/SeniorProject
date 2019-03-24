import React from "react";
import {
  StyleSheet,
  Platform ,
  SafeAreaView,
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
  Footer,
  FooterTab,
  Icon
} from "native-base";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat';
import * as firebase from "firebase";
class ChatroomScreen extends React.Component {
  static navigationOptions = {
    tabBarVisible: false
  };
  state = {
    messages: []
  };

  componentDidMount() {
    const { navigation } = this.props;
    const course_title = navigation.getParam('course_title', 'Unavailable');
    const category = navigation.getParam('category', 'Unavailable');
    const group_title = navigation.getParam('group_title', 'Unavailable');
    const ref = firebase.database().ref('Courses/' + category + '/' + course_title + '/Groups/' + group_title + '/messages/');
    ref.on("value", snapshot => {
        if (snapshot.exists()) {
            let items = snapshot.val();
            let newState = [];
            console.log(items)
            var objectKeys = Object.keys(items);
            // for (i = 0; i < objectKeys.length; i++) {
            //     console.log(Object.keys(items[objectKeys[i]].users).length)
            //     let data = {
            //         title: objectKeys[i],
            //         users_length: Object.keys(items[objectKeys[i]].users).length
            //     };
            //     newState.push(data)
            // }
            // this.setState({
            //     items: newState
            // });
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    })
}

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    var user = firebase.auth().currentUser;
    var s = "";
    if (user){ s = user.email }
    else { s = "Not logged In"}
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Header style={{ backgroundColor: "#fff" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ padding: 10 }}
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body><Title>Chatroom</Title></Body>
          <Right>
            <Button transparent dark>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
          <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </KeyboardAvoidingView>
    );
  }
}

export default ChatroomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20
  }
});
