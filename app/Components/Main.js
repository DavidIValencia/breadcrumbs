var React = require('react-native')
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
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
      height: 150,
      opacity: 0
  },
  signin: {
      backgroundColor: '#FF3366',
      padding: 20,
      alignItems: 'center',
      opacity: .7
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15
  },
  inputs: {
      marginTop: 10,
      marginBottom: 10,
      flex: .25
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
  input: {
      position: 'absolute',
      left: 61,
      top: 12,
      right: 0,
      height: 20,
      fontSize: 14
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
  },

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

      <View style={styles.container}>
            <Image style={styles.bg} source={require('../Images/paris.gif')} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                    <TextInput
                      onChangeText={ (text)=> this.setState({username: text}) }
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Username"
                        placeholderTextColor="#FFF"
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                    <TextInput
                        onChangeText={ (text)=> this.setState({password: text}) }
                        password={true}
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Pasword"
                        placeholderTextColor="#FFF"
                        value={this.state.password}
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>Forgot Password</Text>
                </View>
            </View>
            <TouchableHighlight
              style={styles.signin}
              onPress={this.handleSubmit.bind(this)}>
              <Text style={styles.whiteFont}>Sign In</Text>
        
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.signup}
              onPress={this.registerLink.bind(this)}>
              <Text style={styles.greyFont}>Don't have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
            </TouchableHighlight>
        </View>
    );
  }
};

module.exports = Main;