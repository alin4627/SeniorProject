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
  Form,
  Item,
  Input,
  Label,
  Footer,
  FooterTab,
  Icon,
  Content
} from "native-base";
class LoginScreen extends React.Component {
  state = {
    text: ""
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Title>Login</Title>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
            <Button light>
              <Text> Login </Text>
            </Button>
          </Form>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    width: "90%"
  }
});
