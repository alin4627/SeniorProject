import React from "react";
import {
  StyleSheet,
  Clipboard,
  Platform,
  styles,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import {
  Header,
  Button,
  Left,
  ActionSheet,
  Body,
  Title,
  Right,
  Icon
} from "native-base";
import PropTypes from "prop-types";
import SlackMessage from "../components/SlackMessage";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from "firebase";

var BUTTONS = ["Copy Text ", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

class PrivateChat extends React.Component{
  render() {
    return (
      <GiftedChat 
      />
    );
  }
}

export default PrivateChat;