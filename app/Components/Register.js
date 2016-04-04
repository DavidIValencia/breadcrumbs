var React = require('react-native')
var api = require('../Utils/api')

var {
  Component,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicatorIOS,
  AlertIOS,
  Text,
  View
} = React;

class Register extends React.Component {
  constructor(){
    super();

    this.state = {
      email: "",
      name: "",
      password: "",
    }
  }

  onRegisterPressed() {
    api.checkUser(this.state.name)
    .then((res) => {
      if(res !== null){
        AlertIOS.alert(
          'That username has already been taken'
        )
      } else {
        api.addUser(this.state.name, this.state.email, this.state.password).then(this.props.navigator.pop())
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Join us now!
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({name: text}) }
          style={styles.input} placeholder="Name">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

module.exports = Register;