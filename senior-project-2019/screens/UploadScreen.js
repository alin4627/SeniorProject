import React from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  CameraRoll,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ListItem,
  List,
  Header,
  Item,
  Label,
  Input,
  Button,
  Left,
  Body,
  Right,
  Content,
  Text,
  Icon
} from "native-base";
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';

export default class UploadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_title: "",
      course_title: "",
      category: "",
      image: null,
      uploading: false,
      picId: '',
      groupfiles:[],
      isGroupMod:false,
    };
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    const { navigation } = this.props;
    const group_title = navigation.getParam("group_title", "Unavailable");
    const course_title = navigation.getParam("course_title", "Unavailable");
    const category = navigation.getParam("category", "Unavailable");
    this.setState({
      group_title: group_title,
      course_title: course_title,
      category: category
    });
    
    const ref = firebase.database().ref("Courses/" +
    this.state.category +
    "/" +
    this.state.course_title +
    "/Groups/" +
    this.state.group_title + "/images/")
    ref.once(
      "value",
      function(snapshot) {
        let newState = [];
        snapshot.forEach(function(child) {
          let data = {};
          data.id = child.key;
          data.DownloadURL = child.val().DownloadURL;
          data.createdBy = child.val().createdBy;
          newState.push(data);
        });
        this.setState({ groupfiles: newState });
      }.bind(this)
    );
   
  }

  saveImage(DownloadURL){
    console.log('pressed save')
    CameraRoll.saveToCameraRoll(DownloadURL);
    alert('The photo has been added to Camera Roll')
  }

  deleteImage(imageID){
    firebase.database().ref("Courses/" +
    this.state.category +
    "/" +
    this.state.course_title +
    "/Groups/" +
    this.state.group_title + "/images/" + imageID).remove()

        firebase
         .storage()
          .ref("Courses/" +
            this.state.category +
            "/" +
            this.state.course_title +
            "/Groups/" +
            this.state.group_title + "/images/" + imageID).delete()
      
            alert('The image has been deleted')
  }

  generateGroupFiles = () => {
    isGroupMod = false;
    const refCheckGroupMod = firebase
    .database()
    .ref(
      "Courses/" +
        this.state.category +
        "/" +
        this.state.course_title +
        "/Groups/" +
        this.state.group_title +
        "/users/" +
        firebase.auth().currentUser.uid
    ).child('userLevel');
    refCheckGroupMod.on("value", function(snapshot) {
        if (snapshot.val() == 2) { isGroupMod= true}
    })
  

    if (this.state.groupfiles.length > 0) {
      
      let list = [];
      let listitems = [];
      listitems.push(
        <ListItem key="header">
          <Text style={styles.categoryHeader}>Group Files</Text>
        </ListItem>
      );
      if (isGroupMod){
        for (let i = 0; i < this.state.groupfiles.length; i++) {
        listitems.push(
          <ListItem key={this.state.groupfiles[i].id}>
          <Left>
              <Text>{this.state.groupfiles[i].id} {'submitted by'} {this.state.groupfiles[i].createdBy} {"\n"} 
              <Image source={{ uri: this.state.groupfiles[i].DownloadURL }} style={{ width: 250, height: 250 }} />
              </Text>
          </Left>
          <Right><Button primary onPress ={() => this.saveImage(this.state.groupfiles[i].DownloadURL)}>
              <Text>Save</Text>
            </Button>
            <Button danger onPress ={() => this.deleteImage(this.state.groupfiles[i].id)}>
              <Text>Delete</Text>
            </Button></Right>
          </ListItem>)
          
        }
        list.push(<List key={"groupFiles"}>{listitems}</List>);
        return list;
      }
      else{
          for (let i = 0; i < this.state.groupfiles.length; i++) {
          listitems.push(
            <ListItem key={this.state.groupfiles[i].id}>
            <Left>
                <Text>{this.state.groupfiles[i].id} {'submitted by'} {this.state.groupfiles[i].createdBy} {"\n"} 
                <Image source={{ uri: this.state.groupfiles[i].DownloadURL }} style={{ width: 250, height: 250 }} />
                </Text>
            </Left>
            <Right><Button primary onPress ={() => this.saveImage(this.state.groupfiles[i].DownloadURL)}>
                <Text>Save</Text>
              </Button>
              </Right>
            </ListItem>)
          }
        list.push(<List key={"groupFiles"}>{listitems}</List>);
        return list;
      }
    }
    else {
          let list = [];
          let listitems = [];
          listitems.push(
            <ListItem key="groupFiles">
              <Text style={styles.listText}>Group Files</Text>
            </ListItem>
          );
          listitems.push(
            <ListItem key="no-requests">
              <Text style={styles.listText}>No group files</Text>
            </ListItem>
          );
          list.push(<List key={"Request"}>{listitems}</List>);
          return list;
        }
    }
    
  

  render() {
    let { image } = this.state;

    return (
      <View behavior="padding" style={styles.container}>
        <Header transparent style={{ backgroundColor: "#F8F8F8" }}>
          <Left>
            <Button
              transparent
              dark
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" style={{ padding: 5 }} />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content padder style={{ backgroundColor: "#F8F8F8" }}>
        {this.generateGroupFiles()}
          <View>
            {image ? null : (
              <Text>
                Upload a Image
              </Text>
            )}
            
            <Item floatingLabel style={styles.item}>
                    <Label>Fill in Picture Name</Label>
                    <Input
                      onChangeText={picId => this.setState({ picId })}
                      value={this.state.picId}
                    />
            </Item>
            <Button
                light
                onPress={this._pickImage}
                style={{ padding: "10%" }}
              >
                <Text> Pick an image from camera roll  </Text>
            </Button>

            <Button
                light
                onPress={this._takePhoto}
                style={{ padding: "10%"}}
              >
                <Text> Take a Photo </Text>
            </Button>

            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}

            <StatusBar barStyle="default" />
            </View>
      </Content>
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      
            <View>
              <View>
                <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
              </View>

              <Text
                onPress={this._copyToClipboard}
                onLongPress={this._share}
                style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                {image}
              </Text>
            </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    this._handleImagePicked(pickerResult);
  };
  

  _handleImagePicked = async pickerResult => {
    if(this.state.picId == ""){
      alert('Please fill in a Name for the picture')
      return
    }
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const ref1 = firebase
         .storage()
          .ref("Courses/" +
            this.state.category +
            "/" +
            this.state.course_title +
            "/Groups/" +
            this.state.group_title + "/images/" + this.state.picId)
        uploadUrl = await uploadImageAsync(pickerResult.uri , ref1);
        this.setState({ image: uploadUrl });
        firebase.database().ref("Courses/" +
        this.state.category +
        "/" +
        this.state.course_title +
        "/Groups/" +
        this.state.group_title + "/images/" + this.state.picId).set({
          createdBy: firebase.auth().currentUser.displayName,
          DownloadURL:uploadUrl,
        });;
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri,ref) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  })
  
  ref.child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  classHeader: {
    padding: 5
  },
  classLabel: {
    fontSize: 15,
    color: "#A8A8A8"
  },
  classNameHeader: {
    fontSize: 30,
    fontWeight: "bold"
  },
  classIDHeader: {
    fontSize: 25,
    fontWeight: "bold"
  },
  center: {
    alignItems: "center"
  },
  categoryHeader: {
    fontWeight: "bold"
  }
});

/** import * as firebase from "firebase";
import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';


export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    const storageRef = firebase.storage().ref();
    const upload = storageRef.child("/images").put({uri:image});
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}*/