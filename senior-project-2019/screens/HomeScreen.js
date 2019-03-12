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
  Footer,
  FooterTab,
  Icon
} from "native-base";
import * as firebase from "firebase";
class HomeScreen extends React.Component {
  state = {
    text: ""
  };

  render() {
    var user = firebase.auth().currentUser;
    var s = "";
    if (user){ s = user.email }
    else { s = "Not logged In"}
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header style={{ backgroundColor: "#fff" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="menu"
                style={{ padding: 10 }}
                onPress={() => this.props.navigation.openDrawer()}
              />
              <Title>Home</Title>
            </Button>
          </Left>
          <Body />
          <Right>
            <Button transparent dark>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>HELLO {s}</Text>
        </View>
        <Footer style={{ backgroundColor: "#fff" }}>
          <FooterTab>
            <ScrollView scrollEnabled={false}>
              <TextInput
                placeholder="Message channel"
                value={this.state.text}
                style={styles.input}
                onChangeText={text => this.setState({ text })}
                autoCorrect={false}
              />
            </ScrollView>
          </FooterTab>
        </Footer>
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
