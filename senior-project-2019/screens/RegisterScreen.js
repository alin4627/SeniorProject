import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert
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
import * as firebase from "firebase";

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };
  }

  onSignupPress = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert(
        "Password:" +
          this.state.password +
          " does not match password confirmation: " +
          this.state.passwordConfirm
      );
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        res => {
          res.user.updateProfile({
            displayName: this.state.firstName + " " + this.state.lastName,
            photoURL: "https://i.stack.imgur.com/l60Hf.png"
          });
          firebase
            .database()
            .ref("users/" + res.user.uid)
            .set({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              userLevel: 1
            });
        },
        error => {
          Alert.alert(error.message);
        }
      );
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Title style={{ color: "black" }}>Register</Title>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input
                value={this.state.firstName}
                onChangeText={text => {
                  this.setState({ firstName: text });
                }}
                autoCorrect={false}
              />
            </Item>
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input
                value={this.state.lastName}
                onChangeText={text => {
                  this.setState({ lastName: text });
                }}
                autoCorrect={false}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                onChangeText={text => {
                  this.setState({ email: text });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                value={this.state.password}
                onChangeText={text => {
                  this.setState({ password: text });
                }}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password Confirmation</Label>
              <Input
                value={this.state.passwordConfirm}
                onChangeText={text => {
                  this.setState({ passwordConfirm: text });
                }}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <View style={{ marginTop: 15 }}>
              <Button
                light
                style={{ padding: "10%", alignSelf: "center" }}
                onPress={this.onSignupPress}
              >
                <Text> Register </Text>
              </Button>
            </View>
            <View style={{ marginTop: 10 }}>
              <Button
                transparent
                light
                onPress={() => this.props.navigation.goBack()}
                style={{ padding: "10%", alignSelf: "center" }}
              >
                <Text> Go back </Text>
              </Button>
            </View>
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
