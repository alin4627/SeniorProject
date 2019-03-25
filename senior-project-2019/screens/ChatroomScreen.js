import React from "react";
import {
  StyleSheet,
  Platform ,
  KeyboardAvoidingView
} from "react-native";
import {
  Header,
  Button,
  Left,
  Body,
  Title,
  Right,
  Icon
} from "native-base";
import PropTypes from 'prop-types';
import SlackMessage from '../components/SlackMessage';
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
    const ref = firebase.database().ref('Courses/' + category + '/' + course_title + '/Groups/' + group_title + '/messages/').orderByChild('createdAt');
    ref.on("value", snapshot => {
        if (snapshot.exists()) {
          let newState = []
          snapshot.forEach(function(child){
            let items = child.val();
            newState.push(items)
            // var objectKeys = Object.keys(items);
            // console.log(objectKeys)
            // for (i = 0; i < objectKeys.length; i++) {
            //     newState.push(items[objectKeys[i]])
            // }
          });
          newState.reverse()
          this.setState({
            messages: newState
          });
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    })
}

  onSend(messages = []) {
    const { navigation } = this.props;
    const course_title = navigation.getParam('course_title', 'Unavailable');
    const category = navigation.getParam('category', 'Unavailable');
    const group_title = navigation.getParam('group_title', 'Unavailable');
    

    for (i = 0; i < messages.length; i++) {
      console.log(messages[i])
      firebase.database().ref('Courses/' + category + '/' + course_title + '/Groups/' + group_title + '/messages/' + messages[i]._id).set({
        _id: messages[i]._id,
        createdAt: messages[i].createdAt.toISOString(),
        text: messages[i].text,
        user: messages[i].user
      })
    }
  }

  renderMessage(props) {
    const { currentMessage: { text: currText } } = props;

    let messageTextStyle;

    // // Make "pure emoji" messages much bigger than plain text.
    // if (currText) {
    //   messageTextStyle = {
    //     fontSize: 15,
    //     // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
    //     lineHeight: Platform.OS === 'android' ? 34 : 30,
    //   };
    // }

    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }

  render() {
    var user = firebase.auth().currentUser;
    var s = "";
    if (user){ s = user.displayName }
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
            _id: firebase.auth().currentUser.uid,
            name: user.displayName,
            avatar: user.photoURL
          }}
          renderMessage={this.renderMessage}
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
