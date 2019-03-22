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
  Toast,
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
      .then(() => { 
        Toast.show({
          text: 'You succesfully logged in',
        });
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
          style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F8F8F8" }}
        >
          <Title style={{color:"black"}}>Login</Title>
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
            <View style={{marginTop:15}}>
            <Button onPress={this.onLoginPress} style = {{padding: '10%', alignSelf: 'center', color: '#7e7b7b'}}>
              <Text style={{color:'white'}}> Login </Text>
            </Button>
            </View>
            <View style={{marginTop:10}}>
            <Button transparent light onPress={this.onCreateAccountPress} style = {{padding: '10%', alignSelf: 'center'}}>
              <Text> Sign Up </Text>
            </Button>
            </View>
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
