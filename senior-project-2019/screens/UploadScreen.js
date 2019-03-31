import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header, Left, Body, Title, Right, Button, Icon, Content } from "native-base";
import * as firebase from 'firebase';

class UploadScreen extends React.Component {
  /*constructor(props) {
    super(props);
    const storageRef = firebase.storage().ref();
    const name = (+new Date()) + '-' + file.name;
    const metadata = { contentType: file.type}
    const uploadTask = ref.child(name).put(file, metadata);
    this.state = {
      items: []
    };
  }*/
    

onClick()
{
  var uploadFile = document.getElementById('uploadFile');
  fileButton.addEventListener('change', function(j)
  {
  var file = j.target.files[0];
  var storageRef = firebase.storage().ref('img/'+file.name);
  var task = storageRef.put(file);
  })
}

}
<div class="mainDiv" align="right">
		<h1 align="left">Firebase File Upload Test </h1>
		<input type="file" id="uploadFile" onclick = 'onClick()' value="upload"/>
</div>
/*<Button transparent dark>
  <Icon
    name="Upload"
    style={{ padding: 8, color: "white" }}
    onPress={() => uploadTask
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => console.log(url))        .catch((error) => {
            switch (error.code){
                case 'storage/unothorized':
                break;
                case 'storage/canceled':
                break;
                case 'storage/unknown':
                break;
            }
        }) }
  /> 
</Button>
<Button transparent dark>
  <Icon
    name="Cancel Upload"
    style={{ padding: 8, color: "white" }}
    onPress={() => uploadTask.cancel() }
  />
</Button>
<Button transparent dark>
  <Icon
    name="Pause Upload"
    style={{ padding: 8, color: "white" }}
    onPress={() => uploadTask.pause() }
  />
</Button>
<Button transparent dark>
  <Icon
    name="Resume Upload"
    style={{ padding: 8, color: "white" }}
    onPress={() => uploadTask.resume() }
  />
</Button> */

