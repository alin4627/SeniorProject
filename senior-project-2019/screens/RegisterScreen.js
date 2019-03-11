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
  Icon,
  Content
} from "native-base";
class RegisterScreen extends React.Component {
  state = {
    text: ""
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Title>Register</Title>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
            <Button light>
              <Text> Register </Text>
            </Button>
          </Form>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default RegisterScreen;

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
