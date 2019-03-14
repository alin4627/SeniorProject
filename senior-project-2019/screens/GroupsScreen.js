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
  Footer,
  FooterTab,
  Icon,
  Content
} from "native-base";
class GroupsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    text: ""
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header style={{ backgroundColor: "#fff" }}>
          <Left>
            <Button transparent dark>
              <Icon
                name="arrow-back"
                style={{ padding: 10 }}
                onPress={() => this.props.navigation.goBack()}
              />
              <Title>Groups</Title>
            </Button>
          </Left>
          <Body />
          <Right>
            <Button transparent dark>
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Group 1</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text># of members: 15</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Study Buddies</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text># of members: 6</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer style={{ backgroundColor: "#fff" }}>
          <FooterTab>
            <Button>
              <Text>Your groups</Text>
            </Button>
            <Button>
              <Text>Open groups</Text>
            </Button>
          </FooterTab>
        </Footer>
      </KeyboardAvoidingView>
    );
  }
}

export default GroupsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
