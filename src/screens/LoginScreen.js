import React, { Component } from "react";
import { View, ActivityIndicator, Platform, StatusBar } from "react-native";
import * as firebase from "firebase";
import {
  Content,
  Container,
  Form,
  Input,
  Header,
  Left,
  Body,
  Right,
  Title,
  Item,
  Label,
  Button,
  Text,
  Icon
} from "native-base";

firebase.initializeApp({
  apiKey: "AIzaSyAWgREVG8Z1QJ1wwKJXJxejAJiKpQ8OM3I",
  authDomain: "pricecheap-890a4.firebaseapp.com",
  databaseURL: "https://pricecheap-890a4.firebaseio.com",
  projectId: "pricecheap-890a4",
  storageBucket: "pricecheap-890a4.appspot.com",
  messagingSenderId: "1096692687554"
});

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "", loading: false };
  }

  onLoginPress() {
    this.setState({ error: "", loading: true });
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: "", loading: false });
        this.props.navigation.navigate("Home");
      })
      .catch(err => {
        alert(err);
        this.setState({ error: err.toString(), loading: false });
      });
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }
    return (
      <View>
        <Button
          transparent
          onPress={() => this.props.navigation.navigate("Forgot")}
        >
          <Text note>Forgot your Password?</Text>
        </Button>
        <Button transparent onPress={this.onLoginPress.bind(this)}>
          <Text>Login</Text>
        </Button>
        <Button
          transparent
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          <Text>Sign Up</Text>
        </Button>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header
          style={{
            //backgroundColor:'green',
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
          }}
        >
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>BlockRazor</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                onChangeText={email => this.setState({ email: email })}
              />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                value={this.setState.password}
                onChangeText={password => this.setState({ password: password })}
              />
            </Item>
          </Form>
          {this.renderButtonOrLoading()}
        </Content>
      </Container>
    );
  }
}
