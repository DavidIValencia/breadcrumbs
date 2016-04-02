var React = require('react-native')
var MapView = require('./MapView')
var TripView = require('./TripView')


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

class TripPage extends React.Component{
    goToMap(){
      this.props.navigator.push({
        title: "MapView",
        component: MapView
      });
    }

  handleSubmit(){
    this.setState({
      isLoading: true
    });
    this.props.navigator.push({
      title: "Trip Summary",
      component: TripSummary
    });
  }

  render(){
    return (
      <TouchableHighlight
          onPress={this.goToMap.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}>View Path on Map</Text>
      </TouchableHighlight>
      <View style={styles.mainContainer}>
      <Text>Add Photo</Text>
      <TextInput
        style={styles.searchInput} />
      <Text>Add Note</Text>
      <TextInput
        style={styles.searchInput} />
      <Text>Add Tags</Text>
      <TextInput
        style={styles.searchInput} />
        <TouchableHighlight
          style={styles.button}
          onPress={() => AlertIOS.alert(
              'Trip Saved!'
            )
          }
          underlayColor="green">
            <Text style={styles.title}>Save Breadcrumb</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="red">
            <Text style={styles.title}> End Trip </Text>
        </TouchableHighlight>
      </View>
    )
  }
}


module.exports = TripPage;