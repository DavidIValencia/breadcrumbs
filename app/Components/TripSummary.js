// resume trip (back)
// Trip name text field
// Description text area
// Tags
// Sare
// Delete

var React = require('react-native')
var api = require('../Utils/api')

var {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput,
  AlertIOS,
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0,0)'
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    // resizeMode: Image.resizeMode.contain,
    width: null,
    height: null,
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 25,
    marginRight: 25
  },

  button: {
    opacity: 0.7,
    height: 45,
    // flexDirection: 'column',
    backgroundColor: '#FF3366',
    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 8,
    // marginBottom: 10,
    // marginTop: 10,
    // marginRight: 50,
    // marginLeft: 50,
    // alignSelf: 'stretch',
    justifyContent: 'center',
  },

  input: {
    height: 50,
    width: 300,
    // marginTop: 10,
    padding: 4,
    fontSize: 18,
    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 8,
    // marginBottom: 10,
    marginTop: 10,
    // marginLeft: 50,
    color: 'white',
    backgroundColor: 'black',
    opacity: 0.7,
  },
  description: {
    height: 100,
    width: 300,
    // marginTop: 10,
    padding: 4,
    fontSize: 18,
    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 8,
    // marginBottom: 10,
    marginTop: 20,
    // marginRight: 50,
    // marginLeft: 50,
    color: 'white',
    backgroundColor: 'black',
    opacity: 0.7,
    // justifyContent: 'flex-start'
    textAlignVertical: 'top'
  },

  topBlock: {
    flexDirection: 'column',
    marginTop: 80,
    flex: 5
  },

  bottomBlock: {
    flexDirection: 'row',
    flex: 1
  },

  rightCol: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 30
  },

  leftCol: {
    flexDirection: 'column',
    flex: 5
  }

});

class TripSummary extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      error: false,
      crumbs: this.props.crumbs,
      pingList: this.props.pingList,
      name: '',
      description: '',
      tags: '',
      lastPosition: this.props.lastPosition
    }
  }

  saveTrip(){
   var trip = {}
   trip.name = this.state.name
   trip.description = this.state.description
   trip.tags = this.state.tags
   trip.timestamp = this.props.pingList[this.props.pingList.length - 1].timestamp
   trip.crumbs = this.props.crumbs
   trip.pingList = this.props.pingList
    this.setState({
      isLoading: true
    });
    api.addTrip(this.props.username, trip)
      .then((data) => {
        this.props.crumbs.length = 0
      });
    navigator.geolocation.clearWatch(this.props.watchID);
    navigator.geolocation.stopObserving();
    this.props.navigator.popN(2);
  }

  render(){
    return (
      <Image source={require('../Images/campfire.gif')} style={styles.backgroundImage}>
        
      <View style={styles.topBlock}>
        <TextInput
          value={this.props.name}
          onChangeText={ (text)=> this.setState({name: text}) }
          style={styles.input}
          placeholder="Trip Name"
          placeholderTextColor="white">
        </TextInput>

        <TextInput
          value={this.props.description}
          onChangeText={ (text)=> this.setState({description: text}) }
          style={styles.description}
          placeholder="Description"
          placeholderTextColor="white"
          multiline={true}>
        </TextInput>

        <TextInput
          value={this.props.tags}
          onChangeText={ (text)=> this.setState({tags: text}) }
          style={styles.input}
          placeholder="Add Tags"
          placeholderTextColor="white">
        </TextInput>
      </View>
      <View style={styles.bottomBlock}>
        <View style={styles.leftCol}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.saveTrip.bind(this)}
            underlayColor='#88D4F5'>
              <Text style={styles.buttonText}>Save the Trip</Text>
          </TouchableHighlight>
          </View>
        <View style={styles.rightCol}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => AlertIOS.alert('Are You Sure?')}
            underlayColor="red">

          <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
      </Image>
    )
  }
}

module.exports = TripSummary;





















