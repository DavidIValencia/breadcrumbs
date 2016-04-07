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
  CameraRoll,
  AlertIOS,
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    // marginTop: 65,
    // flexDirection: 'column',
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
    // marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
  },
  searchInput: {
    height: 50,
    padding: 4,
    // marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    opacity: 1,
    marginRight: 25,
    marginLeft: 25,
  },

  button: {
    opacity: 0.7,
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#FF3366',
    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 8,
    // marginBottom: 10,
    // marginTop: 10,
    // marginRight: 50,
    // marginLeft: 50,
    // alignSelf: 'stretch',
    // justifyContent: 'center',
  },

  input: {
    height: 50,
    width: 300,
    // marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    // borderRadius: 8,
    marginBottom: 10,
    // marginTop: 10,
    // marginRight: 50,
    // marginLeft: 50,
    color: 'white',
    backgroundColor: 'black',
    opacity: 0.7,
  },

  note: {
    height: 100,
    width: 300,
    // marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    // borderRadius: 8,
    // marginBottom: 10,
    marginTop: 10,
    // marginRight: 50,
    // marginLeft: 50,
    color: 'white',
    backgroundColor: 'black',
    opacity: 0.7,
  },

  topBlock: {
    marginTop: 150,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row'
  },

  middleBlock: {
    flex: 4,
    flexDirection: 'column',
    marginTop: 30
  },

  bottomBlock: {
    flex: 1,
    marginTop: 130,
    flexDirection: 'row'
  },

  finish: {
    flex: 8,
    flexDirection: 'row',
    marginTop: 110,
  },

  leftCol: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 16
  },
  rightCol: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 18
  },
  breadButtonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center',
  opacity: 1,
  marginRight: 78,
  marginLeft: 78,
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
      lastPosition: this.props.lastPosition
    }
  }

  addPhotos(){
    debugger
    CameraRoll.getPhotos(
    {first: 1},
    (data) => {
      this.state.image = data;
    },
    (error) => {
      console.warn(error);
    });
  }

  goToMap(){
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
        username: this.props.username,
        watchID: this.props.watchID,
        lastPosition: this.state.lastPosition
      }
    });
  }

  saveCrumb(event) {
      tripCrumbs.push({
        title: this.state.title,
        note: this.state.note,
        tag: this.state.tag,
        pos: this.props.pingList[this.props.pingList.length - 1]
      });
      this.setState({
        title: '',
        note: '',
        tag: ''
      });
    };

  render(){
    return (
      <Image source={require('../Images/nordic-lake.gif')} style={styles.backgroundImage}>

      <View style={styles.topBlock}>
        <View style={styles.leftCol}>

          <TouchableHighlight
            style={styles.button}
            onPress={this.goToMap.bind(this)}
            underlayColor='#88D4F5'>
              <Text style={styles.buttonText}>View Map</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.rightCol}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.addPhotos.bind(this)}
            underlayColor="green">
              <Text style={styles.buttonText}>Add Photo</Text>
          </TouchableHighlight>
        </View>

      </View>
      <View style={styles.middleBlock}>
        <TextInput
          value={this.state.title}
          onChangeText={ (text)=> this.setState({title: text}) } 
          style={styles.input}
          placeholder="Add Title"
          placeholderTextColor="white"
          secureTextEntry={false}>
        </TextInput>

        <TextInput
          value={this.state.note}
          onChangeText={ (text)=> this.setState({note: text}) } 
          style={styles.note}
          multiline={true}
          placeholder="Add Note"
          placeholderTextColor="white"
          secureTextEntry={false}>
        </TextInput>
      </View>


        <View style={styles.bottomBlock}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.saveCrumb.bind(this)}
            underlayColor="green">
              <Text style={styles.breadButtonText}>Save Breadcrumb</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.finish}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.saveTrip.bind(this)}
            underlayColor="red">
            <Text style={styles.buttonText}> Finish Trip </Text>
          </TouchableHighlight>
        </View>
      </Image>
    )
  }
}


module.exports = TripPage;






