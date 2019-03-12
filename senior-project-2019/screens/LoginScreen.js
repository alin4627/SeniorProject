import React from "react";
import * as firebase from "firebase";
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
  Footer,
  FooterTab,
  Icon,
  Content
} from "native-base";
class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
}
  constructor(props) {
    super(props);
    this.state = { 
        email: "",
        password: "",
    };
}

onLoginPress = () => {
  firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => { Alert.alert("you succesfully logged in");
        this.props.navigation.navigate('Home');  }, 
        (error) => { Alert.alert(error.message); });
      
}

onCreateAccountPress = () => {
  this.props.navigation.navigate('Register'); 
}
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
              <Input 
              onChangeText = {email => this.setState({email})}
              value = {this.state.email}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
              secureTextEntry
              onChangeText = {password => this.setState({password})}
              value = {this.state.password}
              />
            </Item>
            <Button light onPress={this.onLoginPress}>
              <Text> Login </Text>
            </Button>
            <Button light onPress={this.onCreateAccountPress}>
              <Text> Sign Up </Text>
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
