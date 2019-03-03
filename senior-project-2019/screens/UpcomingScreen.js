import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import {
  Header,
  Button,
  Left,
  Body,
  Title,
  Content,
  Card,
  CardItem,
  Right,
  Footer,
  FooterTab,
  Icon
} from 'native-base';
class UpcomingScreen extends React.Component {
  state = {
    text: '',
  };

  render() {
    return (
        <View style={styles.container}>
        <Header style={{backgroundColor: '#fff'}}>
          <Left>
            <Button transparent dark>
              <Icon name='menu' style={{padding:10}} onPress={() => this.props.navigation.openDrawer()}/>
              <Title>Upcoming</Title>
            </Button>
          </Left>
          <Body />
          <Right>
            <Button transparent dark>
              <Icon name='more' />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Test 1</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  When: 3/6/2019
                </Text>
                <Text>
                  Time: 3:00pm
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Test 2</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  When: 3/27/2019
                </Text>
                <Text>
                  Time: 3:00pm
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer style={{backgroundColor: '#fff'}}>
            <FooterTab>
            <Button>
                <Text>Tests</Text>
            </Button>
            <Button>
                <Text>Assignments</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

export default UpcomingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 35,
    margin: 10,
    marginBottom: 0,
    width: 300,
    fontSize: 16,
  }
});
