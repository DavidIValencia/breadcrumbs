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
  View,
  Image
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
       <Image source={require('../Images/India.gif')} style={styles.backgroundImage}>

        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} placeholder="Email"
          placeholderTextColor="white">
        </TextInput>

        <TextInput
          onChangeText={ (text)=> this.setState({name: text}) }
          style={styles.input} placeholder="Name"
          placeholderTextColor="white">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}>
        </TextInput>

        <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Submit
          </Text>
        </TouchableHighlight>
      </Image>
    )
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
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 50,
    marginLeft: 50,
    color: 'white',
    backgroundColor: 'black',
    opacity: 0.45,

  },
  button: {
    opacity: 0.45,
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 50,
    marginLeft: 50,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 18,
    color: 'orange',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },

    backgroundImage: {
    flex: 1,
    // resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    // resizeMode: Image.resizeMode.contain,
    width: null,
    height: null,
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