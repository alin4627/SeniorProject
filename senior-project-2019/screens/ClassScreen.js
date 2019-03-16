import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import {
  Header,
  H1,
  Button,
  Left,
  Body,
  Title,
  Right,
  Content,
  Text,
  Icon
} from "native-base";
class ClassScreen extends React.Component {
  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <Header iosBarStyle={"light-content"} style={{ backgroundColor: "#333333" }}>
          <Left>
            <Button transparent dark onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-back"
                style={{ padding: 10, color: "white" }}
              />
            </Button>
          </Left>
          <Body><Title style={{color: "white" }}>Course Number</Title></Body>
          <Right>
            <Button transparent dark>
              <Icon ios='md-more' android="md-more" style={{ color: "white" }} />
            </Button>
          </Right>
        </Header>
        <Content padder contentContainerStyle={{ justifyContent: 'center', flex: 1 }} style={{backgroundColor:"#F8F8F8"}}>
            <View style={styles.center}>
                <H1 style={styles.textHeaders}>Course Number</H1>
                <H1 style={styles.textHeaders}>Course Name</H1>
                <H1 style={styles.textHeaders}>Professor's Name</H1>
                <Text style={styles.textHeaders}>View past students</Text>
                <View style={styles.textHeaders}>
                    <Button style={{alignSelf: "center" }}>
                        <Text>Request Access</Text>
                    </Button>
                </View>
            </View>
        </Content>
      </View>
    );
  }
}

export default ClassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: "center", 
  },
  textHeaders: {
      padding: 20
  }
});
