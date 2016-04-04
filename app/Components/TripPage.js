var React = require('react-native')
var MapPage = require('./MapPage')
var TripSummary = require('./TripSummary')

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput,
  AlertIOS
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
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
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'orange',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

var tripCrumbs = []

class TripPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      crumbs: {},
      isLoading: false,
      error: false
    }
  }

  goToMap(){
    this.setState({
      isLoading: true
    });
    this.props.navigator.push({
      title: "Map View",
      component: MapPage,
      passProps: {trip: tripCrumbs}
    });
  }

  saveTrip(){
    this.setState({
      isLoading: true
    });
    this.props.navigator.push({
      title: "Trip Summary",
      component: TripSummary,
      passProps: {pings: this.props.pings}
    });
  }

  saveCrumb() {
      navigator.geolocation.getCurrentPosition((position) => {
      tripCrumbs.push({
        title: this.state.title,
        note: this.state.note,
        tag: this.state.tag,
        pos: position
      });
    })
  };

  render(){
    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.goToMap.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}>View Path on Map</Text>
        </TouchableHighlight>
        <Text>Add Title</Text>
        <TextInput
          style={styles.searchInput}
          onChangeText={ (text)=> this.setState({title: text}) } />
        <Text>Add Note</Text>
        <TextInput
          style={styles.searchInput}
          onChangeText={ (text)=> this.setState({note: text}) } />
        <Text>Add Tags</Text>
        <TextInput
          style={styles.searchInput}
          onChangeText={ (text)=> this.setState({tag: text}) } />
          <TouchableHighlight
            style={styles.button}
            onPress={this.saveCrumb.bind(this)}
            underlayColor="green">
              <Text style={styles.title}>Save Breadcrumb</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={this.saveTrip.bind(this)}
            underlayColor="red">
              <Text style={styles.title}> End Trip </Text>
          </TouchableHighlight>
      </View>
    )
  }
}


module.exports = TripPage;