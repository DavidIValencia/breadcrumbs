var React = require('react-native')
var MapPage = require('./MapPage')
var TripSummary = require('./TripSummary')

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
    flexDirection: 'column',
    justifyContent: 'center',
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


  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
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

  buttonText: {
    fontSize: 18,
    color: 'orange',
    alignSelf: 'center'
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

});

var tripCrumbs = []

class TripPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      error: false,
      title: '',
      note: '',
      tag: '',
    }
  }

  goToMap(){
    console.log(this.props.pingList);
    this.setState({
      isLoading: true
    });
    this.props.navigator.push({
      title: "Map View",
      component: MapPage,
      passProps: {crumbs: tripCrumbs,
        pingList: this.props.pingList,
      }
    });
  }

  saveTrip(){
    this.setState({
      isLoading: true
    });
    this.props.navigator.push({
      title: "Trip Summary",
      component: TripSummary,
      passProps: {
        pingList: this.props.pingList,
        crumbs: tripCrumbs,
        pings: this.props.pings,
        username: this.props.username
      }
    });
  }

  saveCrumb(event) {
      navigator.geolocation.getCurrentPosition((position) => {
      tripCrumbs.push({
        title: this.state.title,
        note: this.state.note,
        tag: this.state.tag,
        pos: position
      });
      this.setState({
        title: '',
        note: '',
        tag: ''
      });
    })
  };

  render(){
    return (
      <Image source={require('../Images/nordic-lake.gif')} style={styles.backgroundImage}>

        <TouchableHighlight
          style={styles.button}
          onPress={this.goToMap.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}>View Path on Map</Text>
        </TouchableHighlight>

       
        <TextInput
          value={this.state.title}
          onChangeText={ (text)=> this.setState({title: text}) } 
          style={styles.input}
          placeholder="Add Title"
          placeholderTextColor="white"
          secureTextEntry={true}>
        </TextInput>

        <Text>Add Note</Text>

        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChangeText={ (text)=> this.setState({note: text}) } />

        <Text>Add Tags</Text>

        <TextInput
          style={styles.searchInput}
          value={this.state.tag}
          onChangeText={ (text)=> this.setState({tag: text}) } />

          <TouchableHighlight
            style={styles.button}
            onPress={this.saveCrumb.bind(this)}
            underlayColor="green">

            <Text style={styles.buttonText}>Save Breadcrumb</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={this.saveTrip.bind(this)}
            underlayColor="red">
            <Text style={styles.buttonText}> End Trip </Text>
          </TouchableHighlight>
      </Image>
    )
  }
}


module.exports = TripPage;