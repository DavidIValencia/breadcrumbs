var React = require('react-native')
var Home = require('./Home')
var Register = require('./Register')
var api = require('../Utils/api')

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AlertIOS,
  ActivityIndicatorIOS,
  TextInput
} = React;

var styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
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

  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  image: {
    height: 250,
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'green',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
      <Image source={require('../Images/animation.gif')} style={styles.backgroundImage}>

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