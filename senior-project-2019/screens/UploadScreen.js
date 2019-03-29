import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header, Left, Body, Title, Right, Button, Icon, Content } from "native-base";
import * as firebase from 'firebase';

class UploadScreen extends React.Component {
  constructor(props) {
    super(props);
    var storageRef = firebase.storage().ref();
    this.state = {
      items: []
    };
  }

/*class Upload(toString: String, toString1: String){
    var name : String = " "
    var url : String = " "

    companion object {
        fun getName(upload: Upload): String {
            return upload.name
        }
        fun getUrl(upload: Upload): String{
            return upload.url
        }
    }
    fun Upload(name: String, url: String){
        this.name = name
        this.url = url
    }
} */
/*<Button transparent dark>
  <Icon
    name="Upload"
    style={{ padding: 8, color: "white" }}
    onPress={() => var uploadTask = storageRef.child( ).put(file); }
  />
</Button>
<Button transparent dark>
  <Icon
    name="Cancel Upload"
    style={{ padding: 8, color: "white" }}
    onPress={() => var uploadTask.cancel() }
  />
</Button>
<Button transparent dark>
  <Icon
    name="Pause Upload"
    style={{ padding: 8, color: "white" }}
    onPress={() => var uploadTask.pause() }
  />
</Button>
<Button transparent dark>
  <Icon
    name="Resume Upload"
    style={{ padding: 8, color: "white" }}
    onPress={() => var uploadTask.resume() }
  />
</Button> */

} 