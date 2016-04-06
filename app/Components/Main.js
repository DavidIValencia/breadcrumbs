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
container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },
  bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: windowSize.width,
      height: windowSize.height
  },
  header: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .5,
      backgroundColor: 'transparent'
  },
  mark: {
      width: 150,
      height: 150
  },
  signin: {
      backgroundColor: '#FF3366',
      padding: 20,
      alignItems: 'center'
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15
},
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
  // position: 'absolute',
  // left: 61,
  // top: 12,
  // right: 0,
  // height: 20,
  // fontSize: 14
},
inputPassword: {
  marginLeft: 15,
  width: 20,
  height: 21
},
  inputUsername: {
    marginLeft: 15,
    width: 20,
    height: 20
  },
  inputContainer: {
      padding: 10,
      borderWidth: 1,
      borderBottomColor: '#CCC',
      borderColor: 'transparent'
  },

  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    flex: .25
  },
  forgotContainer: {
    alignItems: 'flex-end',
    padding: 15,
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  }
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: Image.resizeMode.contain,
    width: null,
    height: null,
    resizeMode: 'stretch',
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
      password: ''
    }
  }

  handleSubmit(){
    api.checkUser(this.state.username)
    .then((res) => {
      if(res.info.password !== this.state.password){
        AlertIOS.alert(
          'Incorrect Password'
        )
      } else {
        this.props.navigator.push({
        title: `Welcome ${this.state.username}`,
        component: Home,
        passProps: {username: this.state.username}
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
          onChangeText={ (text)=> this.setState({username: text}) }
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