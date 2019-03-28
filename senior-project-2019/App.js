import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Root } from "native-base";
import { AppLoading, Asset, Font, Icon } from "expo";
import StudentNavigator from "./navigation/StudentNavigator";
import TeacherNavigator from "./navigation/TeacherNavigator";
import AppLoginNavigator from "./navigation/AppLoginNavigator";
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, 
      isAuthenticationReady: false,
      isAuthenticated: false,
      userLevel: 1
    };

    // Initialize firebase...
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
    if (user) {
        const ref = firebase.database().ref('users/' + user.uid);
        ref.on("value", snapshot => {
        let items = snapshot.val();
        this.setState({
          userLevel: items.userLevel
        });
      });
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }
  
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    if (!this.state.isAuthenticated) {
      return (
        <Root>
          <AppLoginNavigator />
        </Root>
      );
    } else if (this.state.userLevel == 2) {
      return (
        <Root>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <TeacherNavigator />
          </View>
        </Root>
      );
    } else {
      return (
        <Root>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <StudentNavigator />
          </View>
        </Root>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#fff"
  }
});
