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
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
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
      tags: ''
    }
  }

  saveTrip(){
   var trip = {}
   trip.name = this.state.name
   trip.description = this.state.description
   trip.tags = this.state.tags
   trip.timestamp = this.props.crumbs[this.props.crumbs.length - 1].pos.timestamp
   trip.crumbs = this.props.crumbs
   trip.pingList = this.props.pingList
   debugger
    this.setState({
      isLoading: true
    });
    api.addTrip(this.props.username, trip)
      .then((data) => {
        this.props.crumbs.length = 0
      });
    clearInterval(this.props.pings);
    this.props.navigator.popN(2);
  }


  render(){
    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.saveTrip.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}>Save the Trip</Text>
        </TouchableHighlight>
        <Text>Name Trip</Text>
        <TextInput
          style={styles.searchInput}
          value={this.props.name}
          onChangeText={ (text)=> this.setState({name: text}) }>
        </TextInput>
        <Text>Description</Text>
        <TextInput
          style={styles.searchInput}
          value={this.props.description}
          onChangeText={ (text)=> this.setState({description: text}) }>
          </TextInput>
        <Text>Add Tags</Text>
        <TextInput
          style={styles.searchInput}
          value={this.props.tags}
          onChangeText={ (text)=> this.setState({tags: text}) }>
          </TextInput>
          <TouchableHighlight
            style={styles.button}
            onPress={() => AlertIOS.alert(
                'Are You Sure?'
              )
            }
            underlayColor="green">
              <Text style={styles.title}>Delete This Shit</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => AlertIOS.alert(
                'Sharing is caring'
              )
            }
            underlayColor="red">
              <Text style={styles.title}> Share Trip </Text>
          </TouchableHighlight>
      </View>
    )
  }
}

module.exports = TripSummary;