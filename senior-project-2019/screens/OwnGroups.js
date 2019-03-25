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
  Card,
  CardItem,
  Icon,
  Content
} from "native-base";
import * as firebase from 'firebase';

class OwnGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
      }

    render() {
        return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Header iosBarStyle={"light-content"} style={{ backgroundColor: "#333333" }}>
            <Left>
                <Button transparent dark>
                <Icon
                    name="arrow-back"
                    style={{ padding: 10, color: "white"}}
                    onPress={() => this.props.navigation.navigate("Classes")}
                />
                </Button>
            </Left>
            <Body><Title style={{color:"white"}}>My Groups</Title></Body>
            <Right>
                <Button transparent dark>
                <Icon name="add" style={{color:"white"}}/>
                </Button>
            </Right>
            </Header>
            <Content padder style={{backgroundColor:"#F8F8F8"}}>
            <View>
                {this.createCard()}
            </View>
            </Content>
        </KeyboardAvoidingView>
        );
    }

    componentDidMount() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'Unavailable');
        const course_id = navigation.getParam('course_id', 'Unavailable');
        const category = navigation.getParam('category', 'Unavailable');
        const ref = firebase.database().ref('Courses/' + category + '/' + title + '/Groups');
        ref.on("value", snapshot => {
            if (snapshot.exists()) {
                let items = snapshot.val();
                let newState = [];
                var objectKeys = Object.keys(items);
                for (i = 0; i < objectKeys.length; i++) {
                    let data = {
                        course_title: title,
                        group_title: objectKeys[i],
                        users_length: Object.keys(items[objectKeys[i]].users).length,
                        category: category
                    };
                    newState.push(data)
                }
                this.setState({
                    items: newState
                });
            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        })
    }

    createCard = () => {
        let card = []
        for (let i = 0; i < this.state.items.length; i++) {
             card.push(
                <Card key={this.state.items[i].group_title}>
                    <CardItem header bordered>
                    <Text>{this.state.items[i].group_title}</Text>
                    </CardItem>
                    <CardItem button bordered onPress={() => this.props.navigation.navigate('Chat', { course_title: this.state.items[i].course_title, group_title: this.state.items[i].group_title, category: this.state.items[i].category})}>
                    <Body>
                        <Text># of members: {this.state.items[i].users_length}</Text>
                    </Body>
                    </CardItem>
                </Card>
              )
        }
        return card 
    }
}

export default OwnGroups;

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });