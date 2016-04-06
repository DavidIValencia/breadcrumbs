var React = require('react-native')
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
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
      username: "",
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
        api.addUser(this.state.name, this.state.password).then(this.props.navigator.pop())
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={require('../Images/India.gif')} />
        <View style={styles.header}>
            <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
        </View>
        <View style={styles.inputs}><View style={styles.inputContainer}>
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
                        placeholder="Password"
                        placeholderTextColor="#FFF"
                        value={this.state.password}
                    />
                </View>

            </View>
            <TouchableHighlight
              style={styles.signin}
              onPress={this.onRegisterPressed.bind(this)}>
              <Text style={styles.whiteFont}>Sign Up</Text>

            </TouchableHighlight>
            <TouchableHighlight
              style={styles.signup}>
              <Text style={styles.greyFont}>Don't have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
            </TouchableHighlight>
        </View>
    )
  }
}

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
      borderColor: '#FFF',
      borderWidth: 1,
      // backgroundColor: '#FF3366',
      // opacity: .7,
      padding: 20,
      alignItems: 'center',
      marginRight: 60,
      marginLeft: 60,
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15,
    opacity: 0,

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
    color: '#FFF',
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

module.exports = Register;
