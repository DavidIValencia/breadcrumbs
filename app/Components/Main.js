var React = require('react-native')
var Home = require('./Home')
var Register = require('./Register')
var api = require('../Utils/api')

var {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  ActivityIndicatorIOS,
  TextInput
} = React;

var styles = StyleSheet.create({
  button: {
    opacity: 0.5,
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
  mainContainer: {
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
    opacity: 0.5,

  },

  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
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

  textInput: {
    height: 50,
    padding: 20,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    color: 'white',

  },
  image: {
    height: 250,
  },
  buttonText: {
    fontSize: 18,
    color: 'orange',
    alignSelf: 'center'
  },
});

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      passoword: ''
    }
  }

  handleSubmit(){
    api.checkUser(this.state.name)
    .then((res) => {
      if(res.info.password !== this.state.password){
        AlertIOS.alert(
          'Incorrect Password'
        )
      } else {
        this.props.navigator.push({
        title: `Welcome ${this.state.name}`,
        component: Home,
        passProps: {username: this.state.name}
        })
      }
    });
  }

  registerLink(){
    this.setState({
      isLoading: true
    });
    this.props.navigator.push({
      title: "Register",
      component: Register
    });
  }

  render(){
    return (
      <Image source={require('../Images/big-bin-gif.gif')} style={styles.backgroundImage}>

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

      <TouchableHighlight
        style={styles.button}
        onPress={this.handleSubmit.bind(this)}
        underlayColor="green">
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={this.registerLink.bind(this)}
        underlayColor="green">
          <Text style={styles.buttonText}>Register</Text>
      </TouchableHighlight>
      </Image>
      )
  }
}

module.exports = Main;